import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { getCategory } from "@/app/(client)/serverApi/utility";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;
  const categories = await getCategory();
console.log(categories,"categories")
  return (
    <Container className="py-10">
      <Title className="text-xl">
        Products by Category 
        {/* <span className="font-bold text-green-600 capitalize tracking-wide">
          {name && name}
        </span> */}
      </Title>
      <CategoryProducts categories={categories} categoryName={name} />
    </Container>
  );
};

export default CategoryPage;