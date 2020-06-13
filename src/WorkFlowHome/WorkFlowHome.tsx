import React, { Component } from "react";
import {
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Form
} from "react-bootstrap";
import { connect } from "react-redux";

import { addFilter, searchFilter, addWorkflow } from "../redux/actions";
import Header from "../Header";
import ToolsMenu from "../ToolsMenu";
import WorkflowModal from "../WorkflowModal";
import WorkflowCard from "../WorkflowCard";

type State = {
  showModal: boolean;
};

type Props = {
  addFilter: any;
  filter: string;
  search: string;
  searchFilter: any;
  data: Array<any>;
  addWorkflow: any;
};

class WorkFlowHome extends Component<Props, State> {
  state: State = {
    showModal: false
  };

  createWorkspace = () => {
    this.setState({
      showModal: true
    });
  };

  storeWorkflow = (workflowName: any) => {
    const newWorkflow = {
      id: new Date().getTime(),
      title: workflowName.workflowName,
      state: "pending",
      nodes: []
    };
    this.props.addWorkflow(newWorkflow);
    this.setState({ showModal: false });
  };

  onHide = () => {
    this.setState({
      showModal: false
    });
  };

  onChange = (event: any) => {
    this.props.searchFilter(event.target.value);
  };

  changeFilter = (filter: string) => {
    this.props.addFilter(filter);
  };

  render() {
    const { search, filter, data } = this.props;
    const { showModal } = this.state;
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
                key={index}
                index={index}
                data={{ ...d }}
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

const mapStateToProps = ({ workflow }: any) => ({
  filter: workflow.filter,
  search: workflow.search,
  data: workflow.data
});

const dispatchStateToProps = (dispatch: any) => {
  return {
    addFilter: (filter: string) => dispatch(addFilter(filter)),
    searchFilter: (search: string) => dispatch(searchFilter(search)),
    addWorkflow: (workflow: any) => dispatch(addWorkflow(workflow))
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(WorkFlowHome);
