import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const baseURL = import.meta.env.BASE_URL;
  const [product, setProduct] = useState({});
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    async function getProduct() {
      try{
        const product = await getDoc(doc(db, "products", id));
        setProduct({ id: product.id, ...product.data() });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    getProduct();
  }, [id]);

  return (
    <>
      <ItemDetail
        product={product}
        baseURL={baseURL}
        productQuantity={productQuantity}
        setProductQuantity={setProductQuantity}
      />
    </>
  );
}
