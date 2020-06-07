import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Form
} from "react-bootstrap";

import Header from "../Header";
import ToolsMenu from "../ToolsMenu";
import { getData, storeData } from "../_services/workflow.service";
import WorkflowModal from "../WorkflowModal";
import WorkflowCard from "../WorkflowCard";

type State = {
  showModal: boolean;
  data: Array<any>;
  filter: string;
  search: string;
};

type Props = {};

class WorkFlowHome extends Component<Props, State> {
  state: State = {
    showModal: false,
    data: getData(),
    filter: "All",
    search: ""
  };

  createWorkspace = () => {
    this.setState({
      showModal: true
    });
  };

  storeWorkflow = (workflowName: any) => {
    const { data } = this.state;
    const newWorkflow = {
      id: new Date().getTime(),
      title: workflowName.workflowName,
      state: "pending",
      nodes: []
    };
    data.push(newWorkflow);
    this.setState({ data, showModal: false });
    storeData(data);
  };

  onHide = () => {
    this.setState({
      showModal: false
    });
  };

  onChange = (event: any) => {
    this.setState({
      search: event.target.value
    });
  };

  changeFilter = (filter: string) => {
    this.setState({
      filter: filter
    });
  };

  deleteWorkflow = (event: any, index: number) => {
    event.preventDefault();
    const { data } = this.state;
    data.splice(index, 1);
    this.setState({ data });
    storeData(data);
  };

  onStateChange = (event: any, isCompleted: string, index: number) => {
    const { data } = this.state;
    event.preventDefault();
    if (!isCompleted) {
      return window.alert("Nodes may not completed or nodes not available.");
    }
    data[index].state =
      data[index].state === "completed" ? "pending" : "completed";
    this.setState({ data });
  };

  render() {
    const { showModal, data, filter, search } = this.state;
    return (
      <>
        <Header />
        <ToolsMenu
          leftProps={
            <Row>
              <Col md={8} lg={8} sm={12}>
                <Form.Control
                  name="search"
                  value={search}
                  onChange={this.onChange}
                ></Form.Control>
              </Col>
              <Col md={4} lg={4} sm={12}>
                <DropdownButton
                  title={"Filter: " + filter}
                  id="filter-dropdown"
                >
                  <Dropdown.Item onClick={() => this.changeFilter("All")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.changeFilter("Completed")}>
                    Completed
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.changeFilter("Pending")}>
                    Pending
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
          }
          rightProps={
            <Button
              variant="success"
              className="pull-right"
              onClick={this.createWorkspace}
            >
              + Create Workflow
            </Button>
          }
        />
        <Row className="px-3">
          {data.map((d: any, index: number) => {
            let isCompleted = false;
            if (d.nodes.length) {
              let result = d.nodes.find(
                (node: any) =>
                  ["pending", "in-progress"].indexOf(node.state) !== -1
              );
              isCompleted = !result;
            }
            if (
              (filter === "Completed" && d.state === "pending") ||
              (filter === "Pending" && d.state === "completed") ||
              !d.title.match(RegExp(search, "i"))
            ) {
              return null;
            }
            return (
              <WorkflowCard
                isCompleted={isCompleted}
                deleteWorkflow={this.deleteWorkflow}
                key={index}
                index={index}
                onStateChange={this.onStateChange}
                data={d}
              />
            );
          })}
        </Row>
        <WorkflowModal
          show={showModal}
          onHide={this.onHide}
          onSubmit={this.storeWorkflow}
        />
      </>
    );
  }
}

export default WorkFlowHome;
