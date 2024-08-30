import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter basename="/react-course-coderhouse/">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ItemListContainer greeting="Welcome to AldehilS Merch" />} />
          {/** TODO: Implement ItemListContainer to load by category */}
          <Route exact path="/category/:id" element={<ItemListContainer greeting="Welcome to AldehilS Merch" />} />
          {/** TODO: Implement ItemDetailContainer */}
          <Route exact path="/item/:id" element={<h1 className="h1 mt-5">Item Detail Container</h1>} />
          {/** TODO: Implement AboutContainer */}
          <Route exact path="/about" element={<h1 className="h1 mt-5">About Container</h1>} />
          {/** TODO: Implement ContactContainer */}
          <Route exact path="/contact" element={<h1 className="h1 mt-5">Contact Container</h1>} />
        </Routes>
        <Footer name="Aldehil Sánchez" />
      </BrowserRouter>
    </>
  );
}

export default App;
