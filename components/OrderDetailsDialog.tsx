import { OrderResponse} from "@/app/(client)/types/ProductType";
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import PriceFormatter from "./PriceFormatter";

interface Props {
  order: OrderResponse[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog: FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null;
  console.log(order.products[0].product.Images[0].filePath,"ordesrsff");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Order Details - {order?.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-1">
          <p>
            <strong>Customer:</strong> {order?.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order?.email}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order?.createdAt &&
              new Date(order?.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize text-green-600 font-medium">
              {order?.status}
            </span>
          </p>
          <p>
            <strong>Invoice Number:</strong> {order?.invoice?.number}
          </p>
          {order?.invoice && (
            <Button variant="outline" className="mt-2">
              {order?.invoice?.hostedInvoiceUrl && (
                <Link href={order?.invoice?.hostedInvoiceUrl} target="blank">
                  Download Invoice
                </Link>
              )}
            </Button>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.products?.map((product , index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {product?.product?.Images && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product?.product?.Images[0].filePath}`}
                      alt="productImage"
                      width={50}
                      height={50}
                      className="border rounded-sm w-14 h-14 object-contain"
                    />
                  )}
                  {product?.product && (
                    <p className=" line-clamp-1">{product?.product?.name}</p>
                  )}
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                {product?.price && product?.quantity && (
                  <TableCell>
                    <PriceFormatter
                      className="text-black font-medium"
                      amount={product?.price * product?.quantity}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            {order?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Subtotal</strong>
                <PriceFormatter
                  amount={
                    (order?.totalPrice as number) +
                    (order?.amountDiscount as number)
                  }
                />
              </div>
            )}
            {order?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Discount</strong>
                <PriceFormatter amount={order?.amountDiscount} />
              </div>
            )}

            <div className="w-full flex items-center justify-between">
              <strong>Total:</strong>
              <PriceFormatter
                amount={order?.totalPrice}
                className="text-black font-bold"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;