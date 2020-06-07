import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

type Props = {
  onSubmit: any;
  onHide: any;
  show: boolean;
};

const WorkflowModal = (props: Props) => {
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = (data: any) => {
    props.onSubmit(data);
  };
  return (
    <Modal show={props.show} onHide={() => props.onHide()}>
      <Modal.Header>
        <Modal.Title>Add Workflow</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Workflow Name</Form.Label>
          <Controller
            as={
              <Form.Control
                name="workflowName"
                isInvalid={errors.workflowName}
              ></Form.Control>
            }
            name="workflowName"
            rules={{
              required: {
                value: true,
                message: "Workflow name is required."
              }
            }}
            control={control}
            defaultValue=""
          />
          <Form.Control.Feedback type="invalid">
            {errors.workflowName && errors.workflowName.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onHide()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkflowModal;
