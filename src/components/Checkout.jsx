import { Fragment, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";
import CustomerInfoForm from "./CustomerInfoForm";
import PaymentForm from "./PaymentForm";
import Swal from "sweetalert2";
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Checkout() {
  const navigate = useNavigate();
  const [customerFormWasValidated, setCustomerFormWasValidated] =
    useState(false);
  const [paymentFormWasValidated, setPaymentFormWasValidated] = useState(false);
  const [customerFormValues, setCustomerFormValues] = useState({});
  const [paymentFormValues, setPaymentFormValues] = useState({});

  const { subtotal, cartProducts, cart, deleteCartItem, setCart } =
    useContext(CartContext);

  useEffect(() => {
    if (cartProducts.length === 0) {
      navigate("/");
    }
  }, [cartProducts]);

  /**
   * This useEffect will be triggered when both forms are validated.
   * It will validate the availability of the products in the cart.
   * It will  register the order and show a success message after.
   * If the user clicks on "Go to home", it will redirect to the home page.
   */
  useEffect(() => {
    async function checkProductsAvailability() {
      try {
        let allProductAvailable = true;

        for (const product of cartProducts) {
          const productDoc = await getDoc(doc(db, "products", product.id));

          if (productDoc.data().stock < cart[product.id]) {
            await Swal.fire({
              title: "Product not available",
              text: `We only have ${productDoc.data().stock} units of ${
                product.name
              }. You selected ${
                cart[product.id]
              }. Please adjust the quantity or remove the product to proceed.`,
              icon: "error",
              showConfirmButton: true,
              confirmButtonText: "Remove item",
              showCancelButton: true,
            })
              .then((result) => {
                if (result.isConfirmed) {
                  deleteCartItem(product.id);
                }
              })
              .catch((error) => {
                console.error(
                  "Error displaying alert or removing product",
                  error
                );
              });
            setPaymentFormWasValidated(false);
            allProductAvailable = false;
          }
        }

        if (allProductAvailable) {
          const docData = {
            customerInfo: customerFormValues,
            paymentInfo: {
              cardNumber: paymentFormValues["card-number"].slice(-4),
            },
            products: cartProducts.map((product) => {
              return {
                id: product.id,
                name: product.name,
                quantity: cart[product.id],
                price: product.price,
              };
            }),
            subtotal: subtotal,
            shipment: 0,
            total: subtotal + subtotal * 0.16,
            timestamp: Timestamp.now(),
          };
          try {
            const orderDocRef = await addDoc(collection(db, "orders"), docData);
            const orderDoc = await getDoc(orderDocRef);
            await Swal.fire({
              title: "Order created succesfully",
              text: `Your order has been created succesfully with id: ${orderDoc.id}`,
              icon: "success",
              confirmButtonText: "Go home",
              allowEscapeKey: false,
              allowOutsideClick: false,
            })
              .then((result) => {
                if (result.isConfirmed) {
                  setCart({});
                  navigate("/");
                }
              })
              .catch((error) => {
                console.error(
                  "Error displaying alert or deleting cart items",
                  error
                );
              });
          } catch (error) {
            console.error("Error creating order", error);
            throw `Error creating order: ${error}`;
          }
        }
      } catch (error) {
        console.error("Error checking products availability", error);
      }
    }

    if (customerFormWasValidated && paymentFormWasValidated) {
      checkProductsAvailability();
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
