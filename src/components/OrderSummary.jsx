export default function OrderSummary({ title, subtotal, children }) {
  const taxPercentage = 0.16;

  return (
    <>
      <div className="container-fluid rounded-3 p-3 bg-dark text-white">
        <h2 className="h2">{title}</h2>
        <hr />
        <p className="text-start">Subtotal: ${subtotal.toFixed(2)}USD</p>
        <p className="text-start">Shipping: Free</p>
        <p className="text-start">
          Taxes ({taxPercentage * 100}%): $
          {(subtotal * taxPercentage).toFixed(2)}USD
        </p>
        <hr />
        <p className="text-start">
          Total: ${(subtotal + subtotal * taxPercentage).toFixed(2)}USD
        </p>
        {children}
      </div>
    </>
  );
}
