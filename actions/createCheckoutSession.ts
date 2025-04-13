"use server";
import stripe from "@/lib/stripe";
// import { CartItems } from "@/app/(client)/store";
import Stripe from "stripe";
import { Product } from "@/app/(client)/types/ProductType";
export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
}
interface CartItems {
  product: Product;
  quantity: number;
}

export async function createCheckoutSession(
  items: CartItems[],
  metadata: Metadata
) {
  try {
    const customers = await stripe.customers.list({
      email: metadata?.customerEmail,
      limit: 1,
    });
    const customerId = customers.data.length > 0 ? customers.data[0].id : "";
      const sessionPayload: Stripe.Checkout.SessionCreateParams = {
        metadata: {
          orderNumber: metadata?.orderNumber,
          customerName: metadata?.customerName,
          customerEmail: metadata?.customerEmail,
          clerkUserId: metadata?.clerkUserId,
        },
        mode: "payment",
        allow_promotion_codes: true,
        payment_method_types: ["card"],
        invoice_creation: {
          enabled: true,
        },
        success_url: `https://apni-dukan-eta.vercel.app/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
        cancel_url: `https://apni-dukan-eta.vercel.app/cart`,
        line_items: items.map((item) => ({
          price_data: {
            currency: "USD",
            unit_amount: Math.round(item.product.ProductPrice! * 100),
            product_data: {
              name: item.product.name || "Unnamed Product",
              description: item.product.Description,
              metadata: { id: item.product.ProductId },
              // images:
              //   item.product.Images && item.product.Images.length > 0
              //     ? [`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.product.Images[0].filePath}`]
              //     : undefined,
            },
          },
          quantity: item.quantity,
        })),
      };
    
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }
    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}