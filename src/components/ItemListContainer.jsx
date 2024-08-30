import { useParams } from "react-router-dom";

export default function ItemListContainer({ greeting }) {
  const {id} = useParams();

  return (
    <>
      <div className="container mt-5">
        <h1 className="h1">{greeting}</h1>
        {id ? <h2 className="h2">Category: {id}</h2> : <h2 className="h2">Showing all products</h2>}
      </div>
    </>
  );
}
