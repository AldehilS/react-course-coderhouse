import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export default function CartContextProvider({ children }) {
  const baseURL = import.meta.env.BASE_URL;

  const [cart, setCart] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

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

  return (
    <>
      <CartContext.Provider value={{cart, setCart, cartProducts}}>
        {children}
      </CartContext.Provider>
    </>
  );
}