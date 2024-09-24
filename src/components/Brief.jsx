import { useContext } from "react";
import { CartContext } from "./CartContext";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { Link } from "react-router-dom";

export default function Brief() {
  const { cart, setCart, cartProducts } = useContext(CartContext);

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
          {cartProducts.length === 0 ? (
            <h2 className="h2 text-white">Your cart is empty</h2>
          ) : (
            <>
              <ul className="list-group col-12 col-md-8 px-4">
                {cartProducts.map((product) => {
                  return (
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
                  );
                })}
              </ul>
              <div className="col-12 col-md-4 p-4">
                <OrderSummary
                  title="Order Summary"
                  subtotal={cartProducts.reduce((acc, { id, price }) => {
                    return acc + price * cart[id];
                  }, 0)}
                >
                  <Link
                    to="/checkout"
                    className="btn btn-warning"
                  >
                    Proceed to checkout
                  </Link>
                </OrderSummary>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
