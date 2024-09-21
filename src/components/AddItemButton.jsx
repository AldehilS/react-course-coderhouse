import { useContext } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CartContext } from "./CartContext";

export default function AddItemButton({ productQuantity, productId }) {
  const { cart, setCart } = useContext(CartContext);

  function handleAddToCart() {
    console.log(`Added ${productQuantity} of product ${productId} to cart`);
    const newCart = { ...cart };
    newCart[productId] = newCart[productId]
      ? newCart[productId] + productQuantity
      : productQuantity;

    setCart(newCart);
  }

  return (
    <>
      <button
        className="btn btn-warning w-25 align-self-center my-4"
        onClick={handleAddToCart}
      >
        <MdOutlineShoppingCart /> Buy
      </button>
    </>
  );
}
