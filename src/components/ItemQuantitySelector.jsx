export default function ItemQuantitySelector({
  productQuantity,
  setProductQuantity,
  maxQuantity,
}) {
  function handleDecrement() {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
    }
  }

  function handleIncrement() {
    if (productQuantity < maxQuantity) {
      setProductQuantity(productQuantity + 1);
    }
  }

  return (
    <>
      <div
        className="d-flex align-self-center justify-content-between align-items-center w-50 w-md-25 rounded-2"
        style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
      >
        <button
          className={`btn btn-primary w-25 ${
            productQuantity <= 1 ? "disabled" : ""
          }`}
          style={{ minWidth: "40px" }}
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="mx-3">{productQuantity}</span>
        <button
          className={`btn btn-primary w-25 ${productQuantity >= maxQuantity ? "disabled" : ""}`}
          style={{ minWidth: "40px" }}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </>
  );
}
