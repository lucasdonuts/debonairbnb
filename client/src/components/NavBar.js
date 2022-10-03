import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCurrentUser } from "../reducers/userSlice";

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" }).then(() => {
      dispatch(clearCurrentUser());
      navigate("/");
    });
  };

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
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <button
                    className="button account-button is-dark"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu4"
                  >
                    <span className="has-text-white">
                      {`${currentUser.first_name} ${currentUser.last_name}`}
                    </span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                  <div className="dropdown-content p-0">
                    <div className="dropdown-item">
                      <NavLink className="is-size-6" to="/account" end>
                        Account
                      </NavLink>
                    </div>
                    <hr className="dropdown-divider m-0" />
                    <div className="dropdown-item" onClick={handleLogout}>
                      <NavLink className="is-size-6">
                        Log Out
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="nav level-item has-text-centered has-text-white">
              <NavLink className="navbar-item" to="/account" end>
                Account
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
