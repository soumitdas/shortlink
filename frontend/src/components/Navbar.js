import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../hooks/useRouter";

const Navbar = () => {
  const auth = useAuth();
  const router = useRouter();

  let navbarMenu;
  function toggleNavbar(e) {
    navbarMenu.classList.toggle("is-active");
    e.target.classList.toggle("is-active");
  }
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <span className="is-size-4 has-text-weight-semibold">
              shortlink
            </span>
          </Link>

          <a
            onClick={toggleNavbar}
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu" ref={(el) => (navbarMenu = el)}>
          {auth.user && (
            <div className="navbar-start">
              {/* <NavLink
                to="/dashboard"
                className="navbar-item"
                activeClassName="is-active"
              >
                Dashboard
              </NavLink> */}
              <NavLink
                to="/links"
                className="navbar-item"
                activeClassName="is-active"
              >
                My Links
              </NavLink>
              <NavLink
                to="/profile"
                className="navbar-item"
                activeClassName="is-active"
              >
                Profile
              </NavLink>
            </div>
          )}
          <div className="navbar-end">
            {auth.user && (
              <div className="navbar-item">Welcome {auth.user.name}</div>
            )}
            <div className="navbar-item">
              {auth.user ? (
                <button
                  onClick={() => auth.signout()}
                  className="button is-primary"
                >
                  Sign out
                </button>
              ) : (
                <div className="buttons">
                  <Link
                    to={{
                      pathname: "/signup",
                      state: { from: router.location },
                    }}
                    className="button is-primary is-outlined"
                  >
                    Sign up
                  </Link>
                  <Link
                    to={{
                      pathname: "/signin",
                      state: { from: router.location },
                    }}
                    className="button is-primary"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
