import ItemQuantitySelector from "./ItemQuantitySelector";

export default function ItemDetail({ product, baseURL }) {
  return (
    <>
      <main className="flex-grow-1 d-flex flex-column align-items-center">
        <h1 className="h1 text-white mt-3">{product.name}</h1>
        <div className="container row pt-3">
          <div className="col-12 col-md-6" style={{ aspectRatio: "1/1" }}>
            <img
              src={`${baseURL}products/${product.image}`}
              className="img-fluid object-fit-contain h-100 rounded-4"
              alt={product.name}
              style={{ backgroundColor: "rgb(190, 187, 187)" }}
            />
          </div>
          <div className="d-flex flex-column col-12 col-md-6">
            {/** TODO: Implement a description component to encapsulate the description and price*/}
            <h2 className="h2 text-white text-start mt-3 mt-md-0">
              Description:
            </h2>
            <p className="lead text-white text-start">{product.description}</p>
            <h2 className="h2 text-white text-start">Price:</h2>
            <p className="lead text-white text-start">${product.price}</p>
            <ItemQuantitySelector />
            {/** TODO: Implement an add to cart button component */}
          </div>
        </div>
      </main>
    </>
  );
}
