import React, { useState } from "react";
import { Col, Card, Form, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { connect } from "react-redux";

import { onStateChange, deleteWorkflow } from "../redux/actions";

type Props = {
  index: number;
  data: any;
  isCompleted: boolean;
  onStateChange: any;
  deleteWorkflow: any;
};

const WorkflowCard = (props: Props) => {
  const [showDelete, changeDelete] = useState(false);
  return (
    <Col md={3} lg={3} sm={12} className="mt-4">
      <Link
        to={"/nodes/" + props.index}
        className="text-decoration-none text-dark"
      >
        <Card
          onMouseOver={() => changeDelete(true)}
          onMouseLeave={() => changeDelete(false)}
        >
          {showDelete && (
            <Button
              className="float-button"
              variant="danger"
              style={{ zIndex: 10 }}
              onClick={(event: any) => {
                event.preventDefault();
                props.deleteWorkflow(props.index);
              }}
              onMouseLeave={() => changeDelete(false)}
            >
              <FaTrash />
            </Button>
          )}
          <Card.Body>
            <Form.Label className="border title-border">
              {props.data.title}
            </Form.Label>
            <div className="pt-3">
              <h5 className="d-inline">
                {props.data.state === "completed" ? "Completed" : "Pending"}
              </h5>
              <Button
                className="pull-right rounded-circle"
                variant={
                  props.data.state === "completed" ? "success" : "secondary"
                }
                onClick={(event: any) => {
                  event.preventDefault();
                  if (!props.isCompleted) {
                    return window.alert(
                      "Nodes may not completed or nodes not available."
                    );
                  }
                  props.onStateChange(props.index);
                }}
              >
                <FaCheck />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    onStateChange: (index: any) => dispatch(onStateChange(index)),
    deleteWorkflow: (index: any) => dispatch(deleteWorkflow(index))
  };
};

export default connect(null, dispatchStateToProps)(WorkflowCard);
