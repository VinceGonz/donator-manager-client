import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import Dashboard from "./components/pages/Dashboard";
import PageNotFound from "./components/pages/PageNotFound";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact />
        <PublicRoute path="/register" component={RegisterPage} exact />
        <ProtectedRoute path="/dashboard" component={Dashboard} exact />
        <Route component={PageNotFound} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
