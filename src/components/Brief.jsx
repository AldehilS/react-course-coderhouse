import { useContext } from "react";
import { CartContext } from "./CartContext";
import CartItem from "./CartItem";

export default function Brief() {
  const { cart, setCart } = useContext(CartContext);

  function deleteCartItem(id) {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
  }

  return (
    <>
      <main className="flex-grow-1" data-bs-theme="dark">
        <h1 className="h1 mt-3 text-white">Your Cart</h1>
        <div className="row">
          {Object.keys(cart).length === 0 ? (
            <h2 className="h2">Your cart is empty</h2>
          ) : (
            <ul className="list-group col-12 col-md-8 px-4">
              {Object.entries(cart).map(([id, quantity]) => {
                return (
                  <li key={id} className="list-group-item my-2 rounded-3">
                    <CartItem id={id} quantity={quantity} onDelete={deleteCartItem} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
