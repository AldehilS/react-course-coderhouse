import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import ItemDetailContainer from "./components/itemDetailContainer";
import CartContextProvider from "./components/CartContext";
import Checkout from "./components/Checkout";
import Brief from "./components/Brief";

function App() {
  const baseURL = import.meta.env.BASE_URL;
  return (
    <>
      <BrowserRouter basename={baseURL}>
        <CartContextProvider>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ItemListContainer greeting="Welcome to AldehilS Merch" />
              }
            />
            <Route
              exact
              path="/category/:id"
              element={
                <ItemListContainer greeting="Welcome to AldehilS Merch" />
              }
            />
            <Route exact path="/item/:id" element={<ItemDetailContainer />} />
            <Route exact path="/about" element={<About />} />
            {/** TODO: Implement ContactContainer */}
            <Route
              exact
              path="/contact"
              element={
                <main className="flex-grow-1">
                  <h1 className="h1 mt-5 text-white">Contact Container</h1>
                </main>
              }
            />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/cart" element={<Brief />} />
          </Routes>
        </CartContextProvider>
        <Footer name="Aldehil Sánchez" />
      </BrowserRouter>
    </>
  );
}

export default App;
