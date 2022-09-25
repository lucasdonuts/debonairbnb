import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const userLinks = (
    <>
      <div className="navbar-item">
        <NavLink to="/home" end>
          <p className="is-size-4">Shop</p>
        </NavLink>
      </div>
      <div className="navbar-item">
        <NavLink to="" end>
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

export default NavBar;

// $navbar-breakpoint
// {/* <nav
// className="navbar is-dark"
// role="navigation"
// aria-label="main navigation"
// >
// <div className="navbar-brand">
//   <NavLink className="navbar-item" to="/">
//     {/* Add logo here */}
//     {/* <img
//       src="https://bulma.io/images/bulma-logo.png"
//       alt="Home"
//       width="112"
//       height="28"
//     /> */}
//     <p className="is-size-4">DebonairBnB</p>
//   </NavLink>

//   {/* <a
//     role="button"
//     className="navbar-burger"
//     aria-label="menu"
//     aria-expanded="false"
//     data-target="navbarBasicExample"
//   >
//     <span aria-hidden="true"></span>
//     <span aria-hidden="true"></span>
//     <span aria-hidden="true"></span>
//   </a> */}
// </div>

// <div id="navbarBasicExample" className="navbar-menu is-active">
//   <div className="navbar-start">
//     <a className="navbar-item">Home</a>

//     <a className="navbar-item">Documentation</a>

//     <div className="navbar-item has-dropdown is-hoverable">
//       <a className="navbar-link">More</a>

//       <div className="navbar-dropdown">
//         <a className="navbar-item">About</a>
//         <a className="navbar-item">Jobs</a>
//         <a className="navbar-item">Contact</a>
//         <hr className="navbar-divider" />
//         <a className="navbar-item">Report an issue</a>
//       </div>
//     </div>
//   </div>

//   <div className="navbar-end">
//     <div className="navbar-item">
//       <div className="buttons">
//         <a className="button is-primary">
//           <strong>Sign up</strong>
//         </a>
//         <a className="button is-light">Log in</a>
//       </div>
//     </div>
//   </div>
// </div>
// </nav>

//  */}
