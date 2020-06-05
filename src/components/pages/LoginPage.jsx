import React, { useContext } from "react";
import LoginForm from "../forms/LoginForm";
import Navbar from "../Navbar";
import { UserContext } from "../../context/UserContext";

const LoginPage = ({ history }) => {
  const { currentPage } = useContext(UserContext);
  return (
    <React.Fragment>
      <Navbar />
      <div class="container login-page-container">
        <LoginForm />
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
