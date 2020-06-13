import React, { Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../Header";
import ToolsMenu from "../ToolsMenu";
import NodeCard from "../NodeCard";
import Page404 from "../Page404";
import { saveData } from "../redux/actions";
import { getData } from "../_services/workflow.service";

type State = {
  search: string;
  data: any;
};

type Props = {
  match: any;
  data: any;
  saveData: any;
};

class NodesPage extends Component<Props, State> {
  state: State = {
    search: "",
    data: getData()[this.props.match.params.id]
  };

  saveData = () => {
    const { data } = this.state;
    for (let i = 0; i < data.nodes.length; i++) {
      if (data.nodes[i].title === "" || data.nodes[i].desc === "") {
        return window.alert("Field Validation Error.");
      }
    }
    if (data.title === "") {
      return window.alert("Field Validation Error.");
    }
    this.props.saveData({ index: this.props.match.params.id, data });
    console.log(data);
    window.alert("Workflow Saved");
  };

  onChange = (event: any) => {
    const { data } = this.state;
    data.title = event.target.value;
    this.setState({
      data
    });
  };

  shuffleNodes = () => {
    const { data } = this.state;
    let isCompleted = false;
    if (data.nodes.length) {
      let result = data.nodes.find(
        (node: any) => ["pending", "in-progress"].indexOf(node.state) !== -1
      );
      isCompleted = !result;
    }
    if (!isCompleted) {
      return window.alert(
        "Nodes are not in complete state shuffle not possible."
      );
    }
    data.nodes = this.shuffle(data.nodes);
    this.setState({
      data
    });
  };

  shuffle = (array: Array<any>) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  deleteNode = () => {
    const { data } = this.state;
    if (data.nodes.length === 0) {
      return window.alert("No Nodes Available");
    }
    if (window.confirm("Are you sure?")) {
      data.nodes.pop();
      this.setState({
        data
      });
    }
  };

  addNode = () => {
    const { data } = this.state;
    data.nodes.push({
      title: "New Task",
      desc: "Add your description",
      state: "pending"
    });
    if (data.state === "completed") {
      data.state = "pending";
      window.alert(
        "Your current work flow state is Completed adding new node changed it to Pending"
      );
    }
    this.setState({
      data
    });
  };

  onNodeChange = (event: any, index: number) => {
    const { data } = this.state;
    data.nodes[index][event.target.name] = event.target.value;
    this.setState({
      data
    });
  };

  stateChange = (index: number, state: string) => {
    const { data } = this.state;
    console.log(
      state,
      data.state === "completed" && index === data.nodes.length - 1
    );
    if (state === "completed") {
      if (data.state === "completed" && index === data.nodes.length - 1) {
        data.state = "pending";
        window.alert(
          "Making node pending will change workflow state to pending."
        );
      }
      if (
        (data.nodes[index + 1] &&
          data.nodes[index + 1]["state"] !== "completed") ||
        !data.nodes[index + 1]
      ) {
        state = "pending";
      }
      data.nodes[index]["state"] = state;
    } else if (index === 0 || data.nodes[index - 1]["state"] === "completed") {
      switch (state) {
        case "in-progress":
          state = "completed";
          break;
        case "pending":
          state = "in-progress";
          break;
        default:
          break;
      }
      data.nodes[index]["state"] = state;
    } else if (state === "in-progress") {
      return window.alert(
        "Node state only can change if previous node state is completed"
      );
    }
    this.setState({
      data
    });
  };

  render() {
    const { data } = this.state;
    if (!data) {
      return <Page404 />;
    }
    return (
      <>
        <Header />
        <ToolsMenu
          leftProps={
            <Row>
              <Col md={6} lg={6} sm={12}>
                <Form.Group>
                  <Form.Control
                    name="search"
                    value={data.title}
                    onChange={this.onChange}
                    isInvalid={data.title === ""}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Workflow name required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} lg={6} sm={12}>
                <p>
                  Notes: Click on save to store current workflow and node data.
                </p>
              </Col>
            </Row>
          }
          rightProps={
            <div className="pull-right">
              <Button
                variant="primary"
                className="ml-2"
                onClick={this.shuffleNodes}
              >
                Shuffle
              </Button>
              <Button
                variant="danger"
                className="ml-2"
                onClick={this.deleteNode}
              >
                Delete
              </Button>
              <Button variant="success" className="ml-2" onClick={this.addNode}>
                Add
              </Button>
              <Button variant="info" className="ml-2" onClick={this.saveData}>
                Save
              </Button>
            </div>
          }
        />
        <div style={{ overflow: "auto" }}>
          <Row className="px-3" style={{ width: "max-content" }}>
            {data.nodes.map((d: any, index: number) => (
              <NodeCard
                key={index}
                data={{ ...d }}
                stateChange={this.stateChange}
                index={index}
                onChange={this.onNodeChange}
              ></NodeCard>
            ))}
          </Row>
        </div>
      </>
    );
  }
}

const dispatchStateToProps = (dispatch: any) => {
  return {
    saveData: (filter: string) => dispatch(saveData(filter))
  };
};

export default connect(null, dispatchStateToProps)(withRouter(NodesPage));
