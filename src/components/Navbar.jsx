import { useState } from "react";
import NavButtonComponent from "./NavButtonComponent";
import CartWidget from "./CartWidget";
import Logo from "../assets/logo.png";
import "../styles/Navbar.css";
import { NavOption } from "../NavOption";

export default function Navbar() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [dropdownActive, setDropdownActive] = useState(false);
  const navOptions = [
    new NavOption("Products", ["T-Shirts", "Hoodies", "Mugs"]),
    new NavOption("About us"),
    new NavOption("Contact"),
  ]; // Array of nav options to be displayed

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
              onClick={() => setDropdownActive(false)}
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
                  <li
                    key={`NavButton${index}`}
                    className={`nav-item ${
                      option.options.length > 0 ? "dropdown" : ""
                    } d-flex flex-column align-items-center d-md-block`}
                  >
                    <NavButtonComponent
                      className={`${
                        index === activeButtonIndex ? "active " : ""
                      } ${option.options.length > 0 ? "dropdown-toggle" : ""}`}
                      text={option.name}
                      onClick={() => {
                        handleButtonClick(index);
                        option.options.length > 0
                          ? setDropdownActive(!dropdownActive)
                          : setDropdownActive(false);
                      }}
                    />
                    {option.options.length > 0 ? (
                      <ul
                        className={`dropdown-menu ${
                          dropdownActive ? "show" : ""
                        }`}
                      >
                        {option.options.map((subOption, subIndex) => {
                          return (
                            <li
                              key={`SubNavButton${subIndex}`}
                              className="nav-item px-2 px-md-0"
                            >
                              <NavButtonComponent
                                className="dropdown-item"
                                text={subOption}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <></>
                    )}
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
