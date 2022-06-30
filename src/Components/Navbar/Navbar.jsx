import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const currencyRedux = useSelector((state) => state.currency.value);

  return (
    <nav className="navigaion-wrapper">
      <ul>
        <li>
          <NavLink
            // className={({ isActive }) => (isActive ? "active-link" : "link")}
            className={({ isActive }) =>
              isActive ? "active-navigation" : "navigation"
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-navigation" : "navigation"
            }
            to={"/details"}
          >
            Details
          </NavLink>
        </li>
      </ul>
      <div className="currency-symbol-nav">
        Currency symbol: {currencyRedux ? currencyRedux : ""}
      </div>
    </nav>
  );
};

export default Navbar;
