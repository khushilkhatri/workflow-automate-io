import React from "react";
import { Row, Col } from "react-bootstrap";

type Props = {
  leftProps: any;
  rightProps: any;
};

const ToolsMenu = (props: Props) => {
  return (
    <>
      <Row className="py-3 px-4 border-bottom boder">
        <Col md={6} lg={6} sm={12}>
          {props.leftProps}
        </Col>
        <Col md={6} lg={6} sm={12}>
          {props.rightProps}
        </Col>
      </Row>
    </>
  );
};

export default ToolsMenu;
