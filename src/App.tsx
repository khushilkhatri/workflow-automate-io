import React from "react";
import { Route, Redirect, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";

import "./App.scss";
import LoginPage from "./LoginPage";
import WorkflowHome from "./WorkFlowHome";
import NodesPage from "./NodesPage";

const history = createBrowserHistory();

type Props = {
  user: any;
};

function App(props: Props) {
  return (
    <React.StrictMode>
      <Router history={history}>
        <Switch>
          <PublicRoute path={"/login"} exact={true} user={props.user}>
            <LoginPage />
          </PublicRoute>
          <PrivateRoute path={"/"} exact={true} user={props.user}>
            <WorkflowHome />
          </PrivateRoute>
          <PrivateRoute path={"/nodes/:id"} exact={true} user={props.user}>
            <NodesPage />
          </PrivateRoute>
          <Redirect from={"*"} to="/login"></Redirect>
          {/* <Route component={Error404} /> */}
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

function PublicRoute({ children, user, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={() =>
        user ? (
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

function PrivateRoute({ children, user, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={() =>
        user ? (
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

const mapStateToProps = ({ user }: any) => {
  return {
    user
  };
};

// const dispatchStateToProps = (dispatch: any) => {
//   return {
//     addFilter: (filter: string) => dispatch(addFilter(filter)),
//   };
// };

export default connect(mapStateToProps)(App);
