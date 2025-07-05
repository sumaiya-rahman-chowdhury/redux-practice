import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/static";

function page() {
  return (
    <div>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product}></ProductCard>;
      })}
    </div>
  );
}

export default page;
