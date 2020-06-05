import React, { useContext, useState } from "react";

import { UserContext } from "../../context/UserContext";

import { withRouter } from "react-router-dom";

const LoginForm = ({ history }) => {
  // const [message, setMessage] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const {
    authorizeUser,
    setCurrentPage,
    flashMessage,
    setFlashMessage
  } = useContext(UserContext);

  const formValidation = () => {
    const errors = {};

    if (username === "") {
      errors.username = "*Username is required!";
    }

    if (password === "") {
      errors.password = "*Password is required!";
    }

    setFormErrors(errors);
    return errors;
  };

  return (
    <div className="box login-page-main">
      <div className="container">
        {flashMessage.msg ? (
          <div class={`notification is-danger`}>
            <span class="icon is-medium">
              <i class="fas fa-check"></i>
            </span>
            <strong>{flashMessage.msg}</strong>
          </div>
        ) : null}
        {/* {message ? <h1 className="has-text-danger">{message}</h1> : null} */}
        <div className="column">
          <h2 class="title is-2 has-text-link has-text-centered is-family-monospace">
            RF Asean Login
          </h2>
          <div className="field">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <p className="control has-icons-left has-icons-right">
              <input
                className={`input ${
                  formErrors.username ? "is-danger" : null
                } is-info`}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <span className="icon is-small is-left">
                <strong>
                  <i className="fas fa-user-secret"></i>
                </strong>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
              {formErrors.username ? (
                <span className="has-text-danger">{formErrors.username}</span>
              ) : null}
            </p>
          </div>
          <div className="field">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <p className="control has-icons-left">
              <input
                className={`input ${
                  formErrors.password ? "is-danger" : null
                } is-info`}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span className="icon is-small is-left">
                <strong>
                  <i className="fas fa-lock"></i>
                </strong>
              </span>
              {formErrors.password ? (
                <span className="has-text-danger">{formErrors.password}</span>
              ) : null}
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                className="button is-success"
                onClick={async () => {
                  if (!Object.keys(formValidation()).length) {
                    const result = await authorizeUser({ username, password });
                    if (result) {
                      history.push("/dashboard");
                      setCurrentPage("dashboard");
                    } else {
                      setFlashMessage({
                        type: "danger",
                        msg: "Error! Invalid Username or Password"
                      });
                    }
                  } else {
                    setFlashMessage({
                      type: "danger",
                      msg: "Errors Found!"
                    });
                  }
                  setTimeout(function() {
                    setFlashMessage({
                      type: "",
                      msg: ""
                    });
                    setFormErrors({});
                  }, 10000);
                }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginForm);
