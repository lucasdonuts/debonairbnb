import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutButton } from "./auth";

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className="navbar is-dark columns is-centered">
      <div className="column is-9">
        <div className="level">
          <div className="level-left">
            <p className="level-item is-size-4 mr-4">DebonairBnB</p>
            {
              currentUser &&
              <NavLink to="/shop" className="level-item" end>
                <p className="is-size-5">Shop</p>
              </NavLink>
            }
          </div>

          <div className="level-right">
            <p className="level-item">
              <a className="button is-success">New</a>
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

export const OldNav = () => {
  const { currentUser } = useSelector((state) => state.user);

  const userLinks = (
    <>
      <div className="navbar-item">
        <NavLink to="/shop" end>
          <p className="is-size-4">Shop</p>
        </NavLink>
      </div>
      <div className="navbar-item">
        <NavLink to="/home" end>
          {" "}
          {/* Your rentals */}
          <p className="is-size-4">Your Rentals</p>
        </NavLink>
      </div>
      <div className="navbar-item">
        <NavLink to="/account" end>
          {" "}
          {/* Your Account Link/ Maybe dropdown */}
          <p className="is-size-4">Account{/* Profile Icon or something */}</p>
        </NavLink>
      </div>
      <div className="navbar-item">
        <LogoutButton />
      </div>
    </>
  );

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-menu has-background-grey-darker is-active">
          <div className="is-flex navbar-start">
            <div className="navbar-item">
              <NavLink to="/" end>
                <p className="is-size-4">DebonairBnB</p>
              </NavLink>
            </div>
            {currentUser && userLinks}
          </div>
        </div>
      </div>
    </nav>
  );
};
