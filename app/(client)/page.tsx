import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return ( 
    <h1>
      <Container className="py-10">
        <HomeBanner />
        <ProductGrid />
      </Container>
    </h1>
  );
}
