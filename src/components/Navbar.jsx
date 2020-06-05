import React, { useContext } from "react";

import { withRouter } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const Navbar = ({ history }) => {
  const { setCurrentPage, currentPage, userLoggedIn, logoutUser } = useContext(
    UserContext
  );
  return (
    <nav
      className="navbar is-black"
      role="navigation"
      aria-label="main navigation"
      style={{ marginBottom: "50px" }}
    >
      <div className="navbar-brand">
        <a className="navbar-item">
          <h2 class="title is-3 has-text-danger logo-font">RF ASEAN Gaming</h2>
        </a>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          {currentPage === "dashboard" ? (
            <a class="navbar-item">Welcome, {userLoggedIn.username}</a>
          ) : null}
          <div className="navbar-item">
            <div className="buttons">
              {currentPage === "loginPage" ? (
                <a
                  className="button is-primary "
                  onClick={() => {
                    history.push("/register");
                    setCurrentPage("registerPage");
                  }}
                >
                  <strong>Sign up</strong>
                </a>
              ) : currentPage === "dashboard" ? null : null}
              {currentPage === "registerPage" ? (
                <a
                  className="button is-info"
                  onClick={() => {
                    history.push("/");
                    setCurrentPage("loginPage");
                  }}
                >
                  Log in
                </a>
              ) : currentPage === "dashboard" ? null : null}
              {currentPage === "loginPage" ||
              currentPage === "registerPage" ? null : currentPage ===
                "dashboard" ? (
                <a
                  className="button is-danger is-small"
                  onClick={() => {
                    history.push("/");
                    setCurrentPage("loginPage");
                    logoutUser();
                  }}
                >
                  LOGOUT
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
