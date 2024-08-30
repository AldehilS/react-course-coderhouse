import { useState } from "react";
import NavButtonComponent from "./NavButtonComponent";
import CartWidget from "./CartWidget";
import Logo from "../assets/logo.png";
import "../styles/Navbar.css";
import { NavOption } from "../NavOption";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [dropdownActive, setDropdownActive] = useState(false);
  const navOptions = [
    new NavOption("Products", "", [
      new NavOption("All", "/"),
      new NavOption("T-Shirts", "/category/t-shirts"),
      new NavOption("Hoodies", "/category/hoodies"),
      new NavOption("Mugs", "/category/mugs"),
    ]),
    new NavOption("About us", "/about"),
    new NavOption("Contact", "/contact"),
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
        className="navbar navbar-expand-md bg-dark justify-content-center pb-3 sticky-md-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid row">
          <Link to={"/"} className="navbar-brand col-12 col-md-auto"
            onClick={() => {
              handleButtonClick(0);
              setDropdownActive(false);
            }}
          >
            <img src={Logo} alt="Aldehil's logo" />
            AldehilS Merch
          </Link>
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
                      onClick={
                        option.options.length > 0
                          ? () => setDropdownActive(!dropdownActive)
                          : () => {
                              handleButtonClick(index);
                              setDropdownActive(false);
                            }
                      }
                      route={option.route}
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
                                text={subOption.name}
                                route={subOption.route}
                                onClick={() => {
                                  setDropdownActive(false);
                                  handleButtonClick(0);
                                }}
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
