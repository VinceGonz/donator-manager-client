import React from "react";
import Navbar from "../Navbar";

import RegisterForm from "../forms/RegisterForm";

const RegisterPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container register-page-container">
        <RegisterForm />
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
