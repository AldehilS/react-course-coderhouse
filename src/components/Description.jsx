export default function Description({ description, price, stock }) {
  return (
    <>
      <h2 className="h2 text-white text-start mt-3 mt-md-0">Description:</h2>
      <p className="lead text-white text-start">{description}</p>
      <h2 className="h2 text-white text-start">Price:</h2>
      <p className="lead text-white text-start">${price}</p>
      <h2 className="h2 text-white text-start">Available stock:</h2>
      <p className="lead text-white text-start">{stock}</p>
    </>
  );
}
