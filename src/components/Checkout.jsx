import { Fragment, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";
import CustomerInfoForm from "./CustomerInfoForm";
import PaymentForm from "./PaymentForm";
import Swal from "sweetalert2";

export default function Checkout() {
  const baseURL = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const [customerFormWasValidated, setCustomerFormWasValidated] =
    useState(false);
  const [paymentFormWasValidated, setPaymentFormWasValidated] = useState(false);
  const [customerFormValues, setCustomerFormValues] = useState({});
  const [paymentFormValues, setPaymentFormValues] = useState({});

  const { subtotal, cartProducts, cart, deleteCartItem } =
    useContext(CartContext);

  useEffect(() => {
    if (cartProducts.length === 0) {
      navigate(`${baseURL}`);
    }
  }, [cartProducts]);

  /**
   * This effect will be triggered when both forms are validated.
   * It will  register the order and show a success message.
   * If the user clicks on "Go to home", it will redirect to the home page.
   */
  useEffect(() => {
    if (customerFormWasValidated && paymentFormWasValidated) {
      Swal.fire({
        title: "Order placed successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Go to home",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`${baseURL}`);
        } else {
          setPaymentFormWasValidated(false);
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [paymentFormWasValidated, customerFormWasValidated]);

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
                <Fragment key={`checkout-fragment-${product.id}`}>
                  <li
                    key={`checkout-cartProduct-${product.id}`}
                    className="list-group-item my-2 rounded-3"
                  >
                    <CartItem
                      product={product}
                      quantity={cart[product.id]}
                      onDelete={deleteCartItem}
                    />
                  </li>
                  <hr className="text-light" />
                </Fragment>
              );
            })}
            <h3 className="h3 text-white text-end">Subtotal: ${subtotal}</h3>
          </ul>
        </div>
        <div className="container col-12 col-md-6 col-lg-4 p-3">
          <CustomerInfoForm
            setFormValues={setCustomerFormValues}
            setFormWasValidated={setCustomerFormWasValidated}
            formWasValidated={customerFormWasValidated}
          />
        </div>
        <div className="container col-12 col-md-6 col-lg-4 p-3">
          <OrderSummary title="3. Pay" subtotal={subtotal}>
            <PaymentForm
              customerFormWasValidated={customerFormWasValidated}
              setPaymentFormValues={setPaymentFormValues}
              setPaymentFormWasValidated={setPaymentFormWasValidated}
            />
            {customerFormWasValidated || (
              <p className="text-warning">
                You need to save your information to proceed with the payment
              </p>
            )}
          </OrderSummary>
        </div>
      </main>
    </>
  );
}
