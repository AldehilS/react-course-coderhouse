import { MdOutlineShoppingCart } from "react-icons/md";
export default function AddItemButton({ productQuantity, productId }) {
  function handleAddToCart() {
    console.log(`Added ${productQuantity} of product ${productId} to cart`);
  }

  return (
    <button
      className="btn btn-warning w-25 align-self-center my-4"
      onClick={handleAddToCart}
    >
      <MdOutlineShoppingCart /> Buy
    </button>
  );
}
