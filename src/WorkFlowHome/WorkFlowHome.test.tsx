import React from "react";
import { shallow } from "enzyme";
import WorkFlowHome from "./WorkFlowHome";

describe("<WorkFlowHome />", () => {
  test("renders", () => {
    const wrapper = shallow(<WorkFlowHome />);
    expect(wrapper).toMatchSnapshot();
  });
});
