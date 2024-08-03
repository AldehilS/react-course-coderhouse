import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="Welcome to AldehilS Merch" />
      <Footer name="Aldehil Sánchez" />
    </>
  );
}

export default App;
