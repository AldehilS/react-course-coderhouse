import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";

export default function ItemListContainer({ greeting }) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const baseURL = import.meta.env.BASE_URL;

  useEffect(() => {
    fetch(`${baseURL}products.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

  return (
    <>
      <main className="px-5 d-flex flex-column flex-grow-1 align-items-center">
        <h1 className="h1 mt-5">{greeting}</h1>
        {id ? (
          <h2 className="h2">Category: {id}</h2>
        ) : (
          <h2 className="h2">Showing all products</h2>
        )}
        <div className="container-fluid row mt-5">
          {products.map((product) => (
            <Item
              key={`product${product.id}`}
              product={product}
              baseURL={baseURL}
            />
          ))}
        </div>
      </main>
    </>
  );
}
