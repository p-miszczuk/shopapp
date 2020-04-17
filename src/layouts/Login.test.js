import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";
import "../setupTests";

describe("Login", () => {
  it("Should render a form section", () => {
    const component = shallow(<Login />);
    const wrapper = component.find(`[data-test="test"]`);
    expect(wrapper.length).toBe(0);
  });
});
