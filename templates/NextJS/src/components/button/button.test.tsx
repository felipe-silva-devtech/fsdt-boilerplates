import React from "react";
import { render } from "@testing-library/react";
import { Button } from ".";

describe("Button", () => {
  it("render component", () => {
    const { container } = render(<Button>Button</Button>);

    expect(container).toMatchSnapshot();
  });
});
