import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const baseURL = import.meta.env.BASE_URL;
  const [product, setProduct] = useState({});
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    fetch(`${baseURL}products.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const productFiltered = data.find(
          (product) => product.id.toString() === id
        );
        setProduct(productFiltered);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
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
