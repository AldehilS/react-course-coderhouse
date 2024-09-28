import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ItemListContainer({ greeting }) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const baseURL = import.meta.env.BASE_URL;

  useEffect(() => {
    async function getProducts() {
      try {
        let q = query(collection(db, "products"));

        if (id) {
          q = query(collection(db, "products"), where("category", "==", id));
        }

        const productsCollection = await getDocs(q);

        let newProducts = [];
        productsCollection.forEach((doc) => {
          newProducts.push({ id: doc.id, ...doc.data() });
        });

        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getProducts();
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
