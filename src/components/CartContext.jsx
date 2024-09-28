import { doc, getDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";

export const CartContext = createContext({});

export default function CartContextProvider({ children }) {

  const [cart, setCart] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  function deleteCartItem(id) {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
  }

  async function getCartProduct(id) {
    try {
      const product = await getDoc(doc(db, "products", id));
      return { id: product.id, ...product.data() };
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  useEffect(() => {
    const products = Object.entries(cart).map(([id, _]) => {
      return getCartProduct(id);
    })

    Promise.all(products).then((products) => {
      setCartProducts(products);
    }).catch((error) => {
      console.error(error);
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
