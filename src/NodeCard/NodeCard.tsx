import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

type Props = {
  data: any;
  stateChange: any;
  index: number;
  onChange: any;
};

const NodeCard = (props: Props) => {
  let state: string = "secondary";
  switch (props.data.state) {
    case "in-progress":
      state = "primary";
      break;
    case "completed":
      state = "success";
      break;
    default:
      break;
  }
  return (
    <div
      className="my-4 pull-left ml-4 d-inline-block shadow"
      style={{ width: "300px" }}
    >
      <Card>
        <Button
          className="float-button"
          variant={state}
          onClick={() => props.stateChange(props.index, props.data.state)}
        >
          <FaCheck />
        </Button>
        <Card.Body>
          <Form.Group>
            <Form.Control
              name="title"
              value={props.data.title}
              isInvalid={props.data.title === ""}
              onChange={event => props.onChange(event, props.index)}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Node title required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="desc"
              rows={18}
              value={props.data.desc}
              isInvalid={props.data.desc === ""}
              onChange={event => props.onChange(event, props.index)}
            />
            <Form.Control.Feedback type="invalid">
              Node description required.
            </Form.Control.Feedback>
          </Form.Group>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NodeCard;
