import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutButton } from "./auth";

const NavBar = () => {
  return (
    <nav className="navbar has-background-dark is-mobile">
      <div className="columns is-centered">
        <div className="column is-11 pb-0">
          <div className="level has-background-dark mb-0">
            <div className="level-item has-text-centered">
              <NavLink to="/" className="navbar-item logo" end>
                <h1 className="is-brand-font is-size-1">DebonairBnB</h1>
              </NavLink>
            </div>
          </div>
          <div className="level has-background-dark">
            <div className="nav level-item has-text-centered has-text-white">
              <NavLink className="navbar-item" to="/shop" end>
                Shop
              </NavLink>
            </div>
            <div className="nav level-item has-text-centered has-text-white">
              <NavLink className="navbar-item" to="/home" end>
                Your Rentals
              </NavLink>
            </div>
            <div className="nav level-item has-text-centered has-text-white">
              <NavLink className="navbar-item" to="/account" end>
                Account
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
