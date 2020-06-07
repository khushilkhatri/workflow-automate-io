import React, { useState } from "react";
import { Col, Card, Form, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

type Props = {
  index: number;
  data: any;
  isCompleted: boolean;
  deleteWorkflow: any;
  onStateChange: any;
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
              onClick={(event: any) => props.deleteWorkflow(event, props.index)}
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
                onClick={(event: any) =>
                  props.onStateChange(event, props.isCompleted, props.index)
                }
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

export default WorkflowCard;
