import { useState } from "react";
import NavButtonComponent from "./NavButtonComponent";
import CartWidget from "./CartWidget";
import Logo from "../assets/logo.png";
import "../styles/Navbar.css";

export default function Navbar() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const navOptions = ["Products", "About us", "Contact"]; // Array of nav options to be displayed

  /**
   * Handle button click event, set to active the clicked button.
   * @param {number} buttonIndex
   */
  function handleButtonClick(buttonIndex) {
    setActiveButtonIndex(buttonIndex);
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-md bg-dark justify-content-center pb-3"
        data-bs-theme="dark"
      >
        <div className="container-fluid row">
          <a className="navbar-brand col-12 col-md-auto" href="./">
            <img src={Logo} alt="Aldehil's logo" />
            AldehilS Merch
          </a>
          <div className="col-12 col-md-auto d-flex flex-row justify-content-end">
            <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <CartWidget className="d-block d-md-none text-light" />{" "}
            {/* CartWidget for mobile */}
          </div>
          <div
            className="collapse navbar-collapse mt-2 col-md-auto justify-content-md-end"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              {/* Generation of navButtons using array */}
              {navOptions.map((option, index) => {
                return (
                  <li key={index} className="nav-item">
                    <NavButtonComponent
                      className={index === activeButtonIndex ? "active" : ""}
                      text={option}
                      onClick={() => handleButtonClick(index)}
                    />
                  </li>
                );
              })}
              <li className="nav-item">
                {/* CartWidget for desktop */}
                <CartWidget
                  className={
                    "d-none d-md-block " +
                    (activeButtonIndex === 3 ? "active" : "")
                  }
                  onClick={() => handleButtonClick(3)}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
