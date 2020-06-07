import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

import { removeUser } from "../_services/workflow.service";

type Props = {
  history: any;
};

const Header = (props: Props) => {
  const onLogout = () => {
    removeUser();
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

export default withRouter(Header);
