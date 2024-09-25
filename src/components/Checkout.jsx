import { useContext } from "react";
import { CartContext } from "./CartContext";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";
import "../styles/Checkout.css";

export default function Checkout() {
  const { subtotal, cartProducts, cart } = useContext(CartContext);

  return (
    <>
      <main className="flex-grow-1 row checkout-main g-0 px-2" data-bs-theme="dark">
        <h1 className="h1 mt-3 text-white col-12">Checkout</h1>
        <ul className="list-group bg-dark col-12 col-md-6 col-lg-4 p-3 rounded-3">
          <h2 className="h2 text-white">1. Review your order summary.</h2>
          {cartProducts.map((product) => {
            return (
              <>
                <li key={product.id} className="list-group-item my-2 rounded-3">
                  <CartItem product={product} quantity={cart[product.id]} />
                </li>
                <hr className="text-light" />
              </>
            );
          })}
          <h3 className="h3 text-white text-end">Subtotal: ${subtotal}</h3>
        </ul>
        <div className="container col-12 col-md-6 col-lg-4">
          
        </div>
        <div className="container col-12 col-md-6 col-lg-4">
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
