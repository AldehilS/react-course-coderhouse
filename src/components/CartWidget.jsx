import { MdOutlineShoppingCart } from "react-icons/md";
import { IconContext } from "react-icons";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { Link } from "react-router-dom";

export default function CartWidget({ className, onClick }) {
  const { cart } = useContext(CartContext);
  const numItems = Object.keys(cart).length;

  return (
    <>
      <IconContext.Provider value={{ size: "2em" }}>
        <Link
          to={"/cart"}
          className={"btn nav-link position-relative m-3 " + className}
          onClick={onClick}
          aria-label="Shopping Cart"
        >
          <MdOutlineShoppingCart />
          <span className="badge position-absolute top-0 start-100 translate-middle rounded-pill bg-danger">
            {numItems}
          </span>
        </Link>
      </IconContext.Provider>
    </>
  );
}
