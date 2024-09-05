import { Link } from "react-router-dom";
import "../styles/Item.css";

export default function Item({ product, baseURL }) {

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 p-md-4">
      <Link to={`/item/${product.id}`}>
        <div
          className="card h-100 rounded-3 p-2">
          <img
            src={`${baseURL}products/${product.image}`}
            className="card-img-top h-75 object-fit-contain rounded-3"
            alt={product.name}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text small text-body-secondary">
              ${product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
