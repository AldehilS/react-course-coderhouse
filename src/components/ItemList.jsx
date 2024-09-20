import Item from "./Item";

export default function ItemList({ products, baseURL }) {
  return (
    <>
      <div className="container-fluid row mt-5">
        {products.map((product) => (
          <Item
            key={`product${product.id}`}
            product={product}
            baseURL={baseURL}
          />
        ))}
      </div>
    </>
  );
}
