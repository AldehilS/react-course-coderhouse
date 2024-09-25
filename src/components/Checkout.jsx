import { useContext } from "react";
import { CartContext } from "./CartContext";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";
import "../styles/Checkout.css";

export default function Checkout() {
  const { subtotal, cartProducts, cart, deleteCartItem } =
    useContext(CartContext);

  return (
    <>
      <main
        className="flex-grow-1 row g-0 px-2 checkout-main"
        data-bs-theme="dark"
      >
        <h1 className="h1 mt-3 text-white col-12">Checkout</h1>
        <div className="col-12 col-md-6 col-lg-4 p-3 rounded-3">
          <ul className="list-group bg-dark p-3 checkout-cart">
            <h2 className="h2 text-white">1. Review your order summary.</h2>
            {cartProducts.map((product) => {
              return (
                <>
                  <li
                    key={product.id}
                    className="list-group-item my-2 rounded-3"
                  >
                    <CartItem
                      product={product}
                      quantity={cart[product.id]}
                      onDelete={deleteCartItem}
                    />
                  </li>
                  <hr className="text-light" />
                </>
              );
            })}
            <h3 className="h3 text-white text-end">Subtotal: ${subtotal}</h3>
          </ul>
        </div>
        <div className="container col-12 col-md-6 col-lg-4"></div>
        <div className="container col-12 col-md-6 col-lg-4 p-3">
          <OrderSummary title="3. Pay" subtotal={subtotal}>
            <button className="btn btn-warning w-50" type="button">
              Pay
            </button>
          </OrderSummary>
        </div>
      </main>
    </>
  );
}
