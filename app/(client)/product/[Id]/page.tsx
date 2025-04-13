
import AddToCartButton from "@/components/AddToCardButton";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import {
  BoxIcon,
  FileQuestion,
  Heart,
  ListOrderedIcon,
  Share,
} from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { Product } from "@/app/(client)/types/ProductType";
import { getProductById } from "@/app/(client)/serverApi/utility";
const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ Id: number }>;
}) => {
  const { Id } = await params;
  const product = await getProductById(Id);
//   const [product,setProduct] = useState<Product>()
//    const [loading, setLoading] = useState(false);
//    useEffect(() => {
//      const fetchData = async () => {
//        setLoading(true);
//        console.log("inside fetch")
//        try {
//          const response = await fetch(
//            `/api/fetchProductById`,
//            {
//              method: "POST",
//              headers: {
//                "Content-Type": "application/json",
//              },
//              body: JSON.stringify({
//                Id:Id
//              })
//            }
//          );
//          if (response.ok) {
//            const data = await response.json();
//            console.log(data, 'data------------hitesh----------------')
//            setProduct(data.data);
//          } 
//        } catch (error) {
//          console.log("Product fetching Error", error);
//        } finally {
//          setLoading(false);
//        }
//      };
//      fetchData();
//    }, [Id]);
  if (!product) {
    return notFound();
  }

  return (
    <Container className="py-10 flex flex-col md:flex-row gap-10">
      {product.Images && <ImageView images={product?.Images} />}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {product?.name}
          </h2>
          <PriceView
            price={product?.ProductPrice}
            discount={product?.DiscountPrice}
            className="text-lg font-bold"
          />
        </div>
        {product?.Stock && (
          <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
            In Stock
          </p>
        )}
        <p className="text-sm text-gray-600 tracking-wide">
          {product?.Description}
        </p>
        <div className="flex items-center gap-2.5 lg:gap-5">
          <AddToCartButton
            product={product}
            className="bg-darkColor/80 text-white hover:bg-darkColor hoverEffect"
          />
          <button className="border-2 border-darkColor/30 text-darkColor/60 px-2.5 py-1.5 rounded-md hover:text-darkColor hover:border-darkColor hoverEffect">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <ProductCharacteristics product={product} />
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <BoxIcon className="w-5 h-5" />
            <p>Compare color</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FileQuestion className="w-5 h-5" />
            <p>Ask a question</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <ListOrderedIcon className="w-5 h-5" />
            <p>Delivery & Return</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <Share className="w-5 h-5" />
            <p>Share</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEffect">
            <p className="text-base font-semibold text-darkColor">
              Free Shipping
            </p>
            <p className="text-sm text-gray-500">
              Free shipping over order $120
            </p>
          </div>
          <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEffect">
            <p className="text-base font-semibold text-darkColor">
              Flexible Payment
            </p>
            <p className="text-sm text-gray-500">
              Pay with Multiple Credit Cards
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;