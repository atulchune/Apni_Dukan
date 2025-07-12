"use client";
// import {
//   internalGroqTypeReferenceTo,
//   SanityImageCrop,
//   SanityImageHotspot,
// } from "@/sanity.types";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
// import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Images } from "@/app/(client)/types/ProductType";
interface Props {
  images:Images[]
}
const ImageView = ({ images = [] }: Props) => {
  const [active, setActive] = useState(images[0]);
  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?.fileId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden"
        >
          <img
            // src={urlFor(active).url()}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${active.filePath}`}
            alt="productImage"
            width={700}
            height={700}
            className="w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md"
          ></img>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-28">
        {images?.map((image) => (
          <button
            onClick={() => setActive(image)}
            key={image?.fileId}
            className={`border rounded-md overflow-hidden ${active?.fileId === image?.fileId ? "ring-1 ring-darkColor" : ""}`}
          >
            <img
            //   src={urlFor(image).url()}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.filePath}`}
              alt="productImage"
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            ></img>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;