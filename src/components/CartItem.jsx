import { MdDelete } from "react-icons/md";
import "../styles/CartItem.css";

export default function CartItem({ product, quantity, onDelete }) {
  const baseURL = import.meta.env.BASE_URL;

  return (
    <>
      <button
        className="btn btn-secondary position-absolute top-0 end-0 p-1 mt-2 me-2"
        onClick={() => onDelete(id)}
      >
        <MdDelete className="delete-icon" />
      </button>
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center cartitem">
        <img
          src={`${baseURL}products/${product.image}`}
          alt={product.description}
          className="bg-secondary rounded-3"
        />
        <div>
          <h2 className="h2">{product.name}</h2>
          <p>Quantity: {quantity}</p>
          <p>Unit price: ${product.price}</p>
        </div>
        <h3 className="h3">Total: ${product.price * quantity}</h3>
      </div>
    </>
  );
}
