import { Product } from "@/app/(client)/types/ProductType";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCardButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group text-sm rounded-lg overflow-hidden">
      <div className=" bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative">
        {product?.Images && (
          <Link href={`product/${product?.ProductId}`}>
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product?.Images[0].filePath}`}
              width={500}
              height={500}
              alt="productImage"
              className={`w-full h-72 object-contain overflow-hidden hoverEffect ${product?.Stock !== 0 && "group-hover:scale-105"}`}
            ></img>
          </Link>
        )}
        {product?.Stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-darkColor/50 flex items-center justify-center">
            <p className="text-xl text-white font-semibold text-center">
              Out of Stock
            </p>
          </div>
        )}
      </div>
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none">
        <h2 className="font-semibold line-clamp-1">{product?.name}</h2>
        <p>{product?.productInto}</p>
        <PriceView
          className="text-lg"
          price={product?.ProductPrice}
          discount={product?.DiscountPrice}
        />
       
          <AddToCartButton product={product} />
       
      </div>
    </div>
  );
};

export default ProductCard;