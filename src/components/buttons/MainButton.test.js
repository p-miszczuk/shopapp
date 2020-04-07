import React from "react";
import { shallow } from "enzyme";
import MainButton from "./MainButton";
import "../../setupTests";

describe("MainButton", () => {
  it("component includes text prop", () => {
    const comp = shallow(<MainButton text />);
    expect(comp);
  });
});
