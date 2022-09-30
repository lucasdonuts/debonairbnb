import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutButton } from "./auth";

// const NavBar = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   // <p className="level-item is-size-4 mr-4">DebonairBnB</p>
//   //     {currentUser && (
//   //       <NavLink to="/shop" className="level-item" end>
//   //         <p className="is-size-5">Shop</p>
//   //       </NavLink>
//   //     )}

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <div
//           className="navbar-burger"
//           data-target="navbarExampleTransparentExample"
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>

//       <div className="navbar-menu">
//         <div className="navbar-start">
//           <a className="navbar-item" href="https://bulma.io/">
//             Home
//           </a>
//           <div className="navbar-item has-dropdown is-hoverable">
//             <a
//               className="navbar-link"
//               href="https://bulma.io/documentation/overview/start/"
//             >
//               Docs
//             </a>
//             <div className="navbar-dropdown is-boxed">
//               <a
//                 className="navbar-item"
//                 href="https://bulma.io/documentation/overview/start/"
//               >
//                 Overview
//               </a>
//               <a
//                 className="navbar-item"
//                 href="https://bulma.io/documentation/overview/modifiers/"
//               >
//                 Modifiers
//               </a>
//               <a
//                 className="navbar-item"
//                 href="https://bulma.io/documentation/columns/basics/"
//               >
//                 Columns
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="navbar-end">
//           <div className="navbar-item">
//             <div className="field is-grouped">
//               <p className="control">
//                 <a
//                   className="bd-tw-button button"
//                   data-social-network="Twitter"
//                   data-social-action="tweet"
//                   data-social-target="https://bulma.io"
//                   target="_blank"
//                   href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms"
//                 >
//                   <span className="icon">
//                     <i className="fab fa-twitter"></i>
//                   </span>
//                   <span>Tweet</span>
//                 </a>
//               </p>
//               <p className="control">
//                 <a
//                   className="button is-primary"
//                   href="https://github.com/jgthms/bulma/releases/download/0.9.4/bulma-0.9.4.zip"
//                 >
//                   <span className="icon">
//                     <i className="fas fa-download"></i>
//                   </span>
//                   <span>Download</span>
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//     // <nav className="navbar is-transparent">
//     //   <div className="navbar-brand">
//     //     <a className="navbar-item" href="https://bulma.io">
//     //       <img
//     //         src="https://bulma.io/images/bulma-logo.png"
//     //         alt="Bulma: a modern CSS framework based on Flexbox"
//     //         width="112"
//     //         height="28"
//     //       />
//     //     </a>
//     //     <a className="navbar-item" href="https://bulma.io/">
//     //       Home
//     //     </a>
//     //     <div
//     //       onMouseOver={ () => setDropdownVisible(true) }
//     //       onMouseOut={ () => setDropdownVisible(false) }
//     //       className="navbar-item has-dropdown is-hoverable"
//     //     >
//     //       <a
//     //         className="navbar-link"
//     //       >
//     //         Account
//     //       </a>
//     //       <div
//     //         className="navbar-dropdown is-boxed"
//     //         // style={ dropdownVisible ? { display: 'block' } : { display: 'none' }}
//     //       >
//     //         <a
//     //           className="navbar-item"
//     //           href="https://bulma.io/documentation/overview/start/"
//     //         >
//     //           Overview
//     //         </a>
//     //         <a
//     //           className="navbar-item"
//     //           href="https://bulma.io/documentation/overview/modifiers/"
//     //         >
//     //           Modifiers
//     //         </a>
//     //         <a
//     //           className="navbar-item"
//     //           href="https://bulma.io/documentation/columns/basics/"
//     //         >
//     //           Columns
//     //         </a>

//     //       </div>
//     //     </div>
//     //   </div>
//     // </nav>
//   );
// };

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const userLinks = (
    <>
      <NavLink className="navbar-item" to="/shop" end>
        <p className="is-size-4">Shop</p>
      </NavLink>
      <NavLink className="navbar-item" to="/home" end>
        <p className="is-size-4">Your Rentals</p>
      </NavLink>
      <NavLink className="navbar-item" to="/account" end>
        <p className="is-size-4">Account{/* Profile Icon or something */}</p>
      </NavLink>
    </>
  );

  return (
    <nav
      className="navbar is-base-background columns is-centered m-0"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand column is-11 is-8-fullhd p-0">
        <div className="navbar-menu is-active is-flex is-shadowless is-justify-content-space-around">
          <div className="navbar-start is-flex">
            <NavLink to="/" className="navbar-item" end>
              <h1 className="is-brand-font is-accent-color is-size-1">
                DebonairBnB
              </h1>
            </NavLink>
            {currentUser && userLinks}
          </div>
          <div className="navbar-end">
            {currentUser && (
              <div className="navbar-item">
                <LogoutButton />
              </div>
            )}
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
      <NavLink className="navbar-item" to="/shop" end>
        <p className="is-size-4">Shop</p>
      </NavLink>
      <NavLink className="navbar-item" to="/home" end>
        <p className="is-size-4">Your Rentals</p>
      </NavLink>
      <NavLink className="navbar-item" to="/account" end>
        <p className="is-size-4">Account{/* Profile Icon or something */}</p>
      </NavLink>
    </>
  );

  return (
    <nav
      className="navbar is-base-background columns is-centered m-0"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand column is-11 is-8-fullhd p-0">
        <div className="navbar-menu is-active is-flex is-justify-content-space-between">
          <div className="navbar-start is-flex">
            <NavLink to="/" className="navbar-item" end>
              <h1 className="is-brand-font is-accent-color is-size-1">
                DebonairBnB
              </h1>
            </NavLink>
            {currentUser && userLinks}
          </div>
          <div className="navbar-end">
            {currentUser && (
              <div className="navbar-item">
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
