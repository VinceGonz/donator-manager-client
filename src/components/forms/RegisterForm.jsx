import React, { useState, useContext } from "react";

import FlashMessage from "../FlashMessage";

import { UserContext } from "../../context/UserContext";

const RegisterForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState({ type: "", msg: "" });

  const { createUser, flashMessage, setFlashMessage } = useContext(UserContext);

  const clearFields = () => {
    setFname("");
    setLname("");
    setUsername("");
    setPassword("");
  };

  const formValidation = () => {
    const errors = {};
    if (fname === "") {
      errors.fname = "*Firstname is required!";
    }

    if (lname === "") {
      errors.lname = "*Lastname is required!";
    }

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
    <div className="box register-page-main">
      {flashMessage.msg ? (
        <FlashMessage type={flashMessage.type} msg={flashMessage.msg} />
      ) : null}
      <div className="column">
        <h2 class="title is-2 has-text-link has-text-centered is-family-monospace">
          RF Asean Sign Up
        </h2>
        <div class="field">
          <label htmlFor="fname">
            <strong>Firstname</strong>
          </label>
          <p class="control has-icons-left has-icons-right">
            <input
              class={`input ${formErrors.fname ? "is-danger" : "is-info"}`}
              type="text"
              placeholder="Enter your fname"
              value={fname}
              onChange={e => setFname(e.target.value)}
            />
            <span class="icon is-small is-left">
              <strong>
                <i class="fas fa-dizzy"></i>
              </strong>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            {formErrors.fname ? (
              <span className="has-text-danger">*Firstname is Required!</span>
            ) : null}
          </p>
        </div>
        <div class="field">
          <label htmlFor="lname">
            <strong>Lastname</strong>
          </label>
          <p class="control has-icons-left has-icons-right">
            <input
              class={`input ${formErrors.lname ? "is-danger" : "is-info"}`}
              type="text"
              placeholder="Enter your lname"
              value={lname}
              onChange={e => setLname(e.target.value)}
            />
            <span class="icon is-small is-left">
              <strong>
                <i class="fas fa-address-book"></i>
              </strong>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            {formErrors.lname ? (
              <span className="has-text-danger">*Lastname is Required!</span>
            ) : null}
          </p>
        </div>
        <div class="field">
          <label htmlFor="username">
            <strong>Username</strong>
          </label>
          <p class="control has-icons-left has-icons-right">
            <input
              class={`input ${formErrors.username ? "is-danger" : "is-info"}`}
              type="email"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <span class="icon is-small is-left">
              <strong>
                <i class="fas fa-user"></i>
              </strong>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            {formErrors.username ? (
              <span className="has-text-danger">*Username is Required!</span>
            ) : null}
          </p>
        </div>
        <div class="field">
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <p class="control has-icons-left">
            <input
              class={`input ${formErrors.password ? "is-danger" : "is-info"}`}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span class="icon is-small is-left">
              <strong>
                <i class="fas fa-lock"></i>
              </strong>
            </span>
            {formErrors.password ? (
              <span className="has-text-danger">*Password is Required!</span>
            ) : null}
          </p>
        </div>
        <div class="field is-grouped">
          <p class="control">
            <button
              class="button is-info "
              onClick={() => {
                if (!Object.keys(formValidation()).length) {
                  setFlashMessage({
                    type: "primary",
                    msg: "Successfully Created An Account"
                  });
                  createUser({ fname, lname, username, password });

                  clearFields();
                } else {
                  setFlashMessage({
                    type: "danger",
                    msg: "Errors Found!"
                  });
                }
                setTimeout(function() {
                  setFlashMessage({ type: "", msg: "" });
                  setFormErrors({});
                }, 10000);
              }}
            >
              <span class="icon is-small">
                <i class="fas fa-save"></i>
              </span>
              <span>Submit</span>
            </button>
          </p>
          <p class="control">
            <button
              class="button is-danger"
              onClick={() => {
                clearFields();
              }}
            >
              <span class="icon is-small">
                <i class="fas fa-eraser"></i>
              </span>
              <span>Reset</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
