import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  Button,
  Form,
  InputGroup,
  Alert
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { withRouter } from "react-router-dom";

import { storeUser } from "../_services/workflow.service";

type Props = {
  history: any;
};

const LoginPage = (props: Props) => {
  const { handleSubmit, errors, control } = useForm();
  const [showError, changeErrorState] = useState(false);
  const onLogin = (data: any) => {
    if (
      data.email === "khushilkhatri@gmail.com" &&
      data.password === "1234567890"
    ) {
      storeUser(data);
      changeErrorState(false);
      props.history.push("/");
    } else {
      changeErrorState(true);
    }
  };

  return (
    <>
      <Container className="vh-100">
        <Row className="position-relative box-center">
          <Col md={6} lg={6} sm={12} className="mx-auto vertical">
            <Card className="shadow-lg">
              <Card.Body>
                <Row>
                  <Container className="text-center">
                    <strong>Login</strong>
                  </Container>
                  <form noValidate className="w-100">
                    <Col md={12} lg={12} xs={12}>
                      <Controller
                        as={
                          <Form.Group>
                            <InputGroup className="input-group-custom w-100 my-4">
                              <InputGroup.Prepend>
                                <InputGroup.Text className={"input-prepend"}>
                                  <FaEnvelope />
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                placeholder="Email"
                                isInvalid={errors.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email && errors.email.message}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        }
                        rules={{
                          required: {
                            value: true,
                            message: "Email field is required."
                          },
                          pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Email format is invalid."
                          }
                        }}
                        control={control}
                        name="email"
                        defaultValue=""
                      ></Controller>
                    </Col>
                    <Col md={12} lg={12} xs={12}>
                      <Controller
                        as={
                          <InputGroup className="input-group-custom w-100 my-4">
                            <InputGroup.Prepend>
                              <InputGroup.Text className="input-prepend">
                                <FaKey />
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              isInvalid={errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password && errors.password.message}
                            </Form.Control.Feedback>
                          </InputGroup>
                        }
                        rules={{
                          required: {
                            value: true,
                            message: "Password field is required."
                          }
                        }}
                        control={control}
                        name="password"
                        defaultValue=""
                      ></Controller>
                    </Col>
                    <Col md={12} lg={12} xs={12}>
                      <Form.Check type="checkbox" label="Remember me" />
                    </Col>
                    <Col md={12} lg={12} xs={12}>
                      <Button
                        className="w-100 my-4"
                        onClick={handleSubmit(onLogin)}
                      >
                        Login
                      </Button>
                    </Col>
                  </form>
                  {showError && (
                    <Col md={12} lg={12} xs={12}>
                      <Alert variant="danger">
                        Email or Password is invalid.
                      </Alert>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(LoginPage);
