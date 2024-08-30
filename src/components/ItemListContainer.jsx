import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ItemListContainer({ greeting }) {
  const {id} = useParams();
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
      <div className="container mt-5 mb-4">
        <h1 className="h1">{greeting}</h1>
        {id ? <h2 className="h2">Category: {id}</h2> : <h2 className="h2">Showing all products</h2>}
        <div className="row">
          {products.map((product) => {
            return (
              <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                <div className="card mb-3">
                  <img src={`${baseURL}/products/${product.image}`} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <small className="text-muted">${product.price}</small>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
