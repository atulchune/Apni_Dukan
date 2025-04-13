"use client";
import { Product,Category } from "@/app/(client)/types/ProductType";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "../components/NoProductAvailable";
interface Props {
  categories: Category[];
  categoryName: string;
}

const CategoryProducts = ({ categories, categoryName }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(categoryName);
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
       const response = await fetch(`/api/fetchProductByCategory`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    category:currentSlug
                  })
                }
              );
              if (response.ok) {
                const data = await response.json();
                console.log(data, 'data------7566575666------hitesh----------------')
                setProducts(data.data);
              }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentSlug]);
  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map((item) => (
          <Button
            key={item?.CategoryId}
            onClick={() => setCurrentSlug(item?.title as string)}
            className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${item?.title === currentSlug && "bg-darkColor text-white border-darkColor"}`}
          >
            {item?.title}
          </Button>
        ))}
      </div>
      <div className="w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="animate-spin" />
              <span className="text-lg font-semibold">
                Product is loading...
              </span>
            </div>
          </div>
        ) : (
          <>
            {products?.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                {products?.map((product: Product) => (
                  <AnimatePresence key={product?.ProductId}>
                    <motion.div
                      layout
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            ) : (
              <NoProductsAvailable
                selectedTab={currentSlug}
                className="mt-0 w-full"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;