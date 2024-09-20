import AddItemButton from "./AddItemButton";
import Description from "./Description";
import ItemQuantitySelector from "./ItemQuantitySelector";

export default function ItemDetail({
  product,
  baseURL,
  productQuantity,
  setProductQuantity,
}) {
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
            <Description
              description={product.description}
              price={product.price}
            />
            <ItemQuantitySelector
              productQuantity={productQuantity}
              setProductQuantity={setProductQuantity}
            />
            <AddItemButton
              productQuantity={productQuantity}
              productId={product.id}
            />
          </div>
        </div>
      </main>
    </>
  );
}
