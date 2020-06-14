import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { removeUser } from "../_services/workflow.service";
import { setUser } from "../redux/actions";

type Props = {
  history: any;
  setUser: any;
};

const Header = (props: Props) => {
  const onLogout = () => {
    removeUser();
    props.setUser(null);
    props.history.push("/login");
  };
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Link to="/">
          <Navbar.Brand color="light">Workflow</Navbar.Brand>
        </Link>
        <Button className="ml-auto" variant="outline-light" onClick={onLogout}>
          Logout
        </Button>
      </Navbar>
    </>
  );
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    setUser: (user: any) => dispatch(setUser(user))
  };
};

export default connect(null, dispatchStateToProps)(withRouter(Header));
