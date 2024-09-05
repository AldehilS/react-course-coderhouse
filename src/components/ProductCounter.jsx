import { useState } from "react";

export default function ProductCounter() {
  const [quantity, setQuantity] = useState(0);

  function handleDecrement() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  return (
    <div
      className="d-flex align-self-center justify-content-between align-items-center w-50 w-md-25 rounded-2"
      style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
    >
      <button
        className={`btn btn-primary w-25 ${quantity === 0 ? "disabled" : ""}`}
        w-25
        style={{ minWidth: "40px" }}
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="mx-3">{quantity}</span>
      <button
        className="btn btn-primary w-25"
        style={{ minWidth: "40px" }}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
