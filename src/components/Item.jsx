import { Link } from "react-router-dom";
import "../styles/Item.css";

export default function Item({ product, baseURL }) {

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 p-4">
      <Link to={`/item/${product.id}`}>
        <div
          className="card h-100 rounded-3">
          <img
            src={`${baseURL}products/${product.image}`}
            className="card-img-top h-75 object-fit-contain"
            alt={product.name}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">
              <small className="text-muted">${product.price}</small>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
