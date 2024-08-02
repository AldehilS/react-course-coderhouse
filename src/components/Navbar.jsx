import { useState } from "react";
import NavButtonComponent from "./NavButtonComponent";
import CartWidget from "./CartWidget";

export default function Navbar() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const navOptions = ["Products", "About us", "Contact"];

  /**
   * Handle button click event, set to active the clicked button.
   * @param {number} buttonIndex 
   */
  function handleButtonClick(buttonIndex) {
    setActiveButtonIndex(buttonIndex);
  }

  return (
    <>
      <nav className="navbar navbar-expand-md p-3 bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            AldehilS Merch
          </a>
          <div className="d-flex flex-row">
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
          <CartWidget className="d-block d-md-none text-light"/> {/* CartWidget for mobile */}
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
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
                  className={"d-none d-md-block " + (activeButtonIndex === 3 ? "active" : "")}
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
