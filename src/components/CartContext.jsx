import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export default function CartContextProvider({ children }) {
  const baseURL = import.meta.env.BASE_URL;

  const [cart, setCart] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  function deleteCartItem(id) {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
  }

  useEffect(() => {
    fetch(`${baseURL}products.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const products = [];
        data.forEach((product) => {
          cart[product.id] ? products.push(product) : null;
        });
        setCartProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [cart]);

  useEffect(() => {
    const subtotal = cartProducts.reduce((acc, { id, price }) => {
      return acc + price * cart[id];
    }, 0);

    setSubtotal(subtotal);
  }, [cartProducts]);

  return (
    <>
      <CartContext.Provider
        value={{ cart, setCart, cartProducts, subtotal, deleteCartItem }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
