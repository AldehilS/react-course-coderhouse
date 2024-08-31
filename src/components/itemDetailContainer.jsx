import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const baseURL = import.meta.env.BASE_URL;
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`${baseURL}products.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const productFiltered = data.find((product) => product.id.toString() === id);
        setProduct(productFiltered);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  return (
    <>
      <main className="flex-grow-1 d-flex flex-column align-items-center">
        <h1 className="h1 text-white pt-5">{product.name}</h1>
        <div className="container row mt-4">
          <div className="col-12 col-md-6" style={{aspectRatio: "1/1"}}>
            <img
              src={`${baseURL}products/${product.image}`}
              className="img-fluid object-fit-contain h-100 rounded-4"
              alt={product.name}
              style={{backgroundColor: "rgb(190, 187, 187)"}}
            />
          </div>
          <div className="col-12 col-md-6">
            <h2 className="h2 text-white text-start mt-3 mt-md-0">Description:</h2>
            <p className="lead text-white text-start">{product.description}</p>
            <h2 className="h2 text-white text-start">Price:</h2>
            <p className="lead text-white text-start">${product.price}</p>
            {/** TODO: Implement a component to add a number of products to the cart  */}
          </div>
        </div>
      </main>
    </>
  );
}
