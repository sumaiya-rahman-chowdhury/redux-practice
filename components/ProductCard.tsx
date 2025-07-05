"use client"
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

function ProductCard({
  product,
}: {
  product: { id: number; name: string; price: number; };
}) {
  const dispatch = useDispatch();
  const handleAddCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
