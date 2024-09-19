import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

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
        if (id) {
          const productsFiltered = data.filter(
            (product) => product.category === id
          );
          setProducts(productsFiltered);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

  return (
    <>
      <main className="px-2 px-md-5 d-flex flex-column flex-grow-1 align-items-center">
        <h1 className="h1 mt-5 text-white">{greeting}</h1>
        {id ? (
          <h2 className="h2 text-white">Category: {id}</h2>
        ) : (
          <h2 className="h2 text-white">Showing all products</h2>
        )}
        <ItemList products={products} baseURL={baseURL} />
      </main>
    </>
  );
}
