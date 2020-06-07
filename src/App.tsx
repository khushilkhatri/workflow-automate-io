import React from "react";
import { Route, Redirect, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.scss";
import { getUser } from "./_services/workflow.service";
import LoginPage from "./LoginPage";
import WorkflowHome from "./WorkFlowHome";
import NodesPage from "./NodesPage";

const history = createBrowserHistory();

function App() {
  return (
    <React.StrictMode>
      <Router history={history}>
        <Switch>
          <PublicRoute path={"/login"} exact={true}>
            <LoginPage />
          </PublicRoute>
          <PrivateRoute path={"/"} exact={true}>
            <WorkflowHome />
          </PrivateRoute>
          <PrivateRoute path={"/nodes/:id"} exact={true}>
            <NodesPage />
          </PrivateRoute>
          <Redirect from={"*"} to="/login"></Redirect>
          {/* <Route component={Error404} /> */}
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

function PublicRoute({ children, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={() =>
        getUser() ? (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

function PrivateRoute({ children, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={() =>
        getUser() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}

export default App;
