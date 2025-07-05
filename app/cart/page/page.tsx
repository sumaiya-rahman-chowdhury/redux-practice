"use client"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
console.log(cartItems)
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} - ${item.price} x {item.quantity}
          </p>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};
export default CartPage;
