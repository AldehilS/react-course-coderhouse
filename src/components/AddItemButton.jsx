import { useContext, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CartContext } from "./CartContext";
import { IoMdCheckmark } from "react-icons/io";

export default function AddItemButton({
  productQuantity,
  productId,
  setProductQuantity,
}) {
  const { cart, setCart } = useContext(CartContext);
  const [okButton, setOkButton] = useState(false);

  function handleAddToCart() {
    console.log(`Added ${productQuantity} of product ${productId} to cart`);
    const newCart = { ...cart };
    newCart[productId] = newCart[productId]
      ? newCart[productId] + productQuantity
      : productQuantity;

    setCart(newCart);
    setProductQuantity(1);

    setOkButton(true);

    setTimeout(() => {
      setOkButton(false);
    }, 500);
  }

  return (
    <>
      {okButton ? (
        <button
          className="btn btn-success w-25 align-self-center my-4"
          disabled
        >
          <IoMdCheckmark /> Added
        </button>
      ) : (
        <button
          className="btn btn-warning w-25 align-self-center my-4"
          onClick={handleAddToCart}
        >
          <MdOutlineShoppingCart /> Buy
        </button>
      )}
    </>
  );
}
