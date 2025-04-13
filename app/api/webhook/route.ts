import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      {
        error: "No Signature",
      },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json(
      {
        error: "Stripe webhook secret is not set",
      },
      { status: 400 }
    );
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      {
        error: `Webhook Error: ${error}`,
      },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      await sendOrderToBackend(session, invoice);
    } catch (error) {
      console.error("Error creating order in sanity:", error);
      return NextResponse.json(
        {
          error: `Error creating order: ${error}`,
        },
        { status: 400 }
      );
    }
  }
  return NextResponse.json({ received: true });
}

async function sendOrderToBackend(
    session: Stripe.Checkout.Session,
    invoice: Stripe.Invoice | null
  ) {
    const {
      id,
      amount_total,
      total_details,
      currency,
      metadata,
      payment_intent,
    } = session;
  
    const { orderNumber, customerName, customerEmail, clerkUserId } =
        metadata as unknown as Metadata;
      
  
    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
      expand: ["data.price.product"],
    });
  
    const products = lineItemsWithProduct.data.map((item) => ({
    //   productId: (item.price?.product as Stripe.Product)?.metadata?.id || "",
      productId : parseInt((item.price?.product as Stripe.Product)?.metadata?.id || "", 10),
      name: (item.price?.product as Stripe.Product)?.name || "",
      price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
      quantity: item?.quantity || 0,
    }));
  
    const payload = {
      orderNumber,
      stripeCheckoutSessionId: id,
      stripePaymentIntentId: payment_intent,
      stripeCustomerId: customerEmail,
      clerkUserId,
      customerName,
      email: customerEmail,
      currency,
    amountDiscount: total_details?.amount_discount
      ? total_details?.amount_discount / 100
      : 0,
    totalPrice: amount_total ? amount_total / 100 : 0,
      invoice: invoice
        ? {
            invoiceId: invoice.id,
            number: invoice.number,
            hostedInvoiceUrl: invoice.hosted_invoice_url,
          }
        : null,
      products,
      status: "Paid",
    };
  
    const res = await fetch(`https://apni-dukan-backend.onrender.com/api/createorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.BACKEND_API_SECRET}`,
      },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      throw new Error("Failed to store order in backend");
    }
  
    return await res.json();
  }
  