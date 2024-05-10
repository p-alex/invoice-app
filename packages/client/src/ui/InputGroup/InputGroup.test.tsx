import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InputGroup from "./InputGroup";

describe("InputGroup.tsx", () => {
  it("should display label tag and set htmlFor attribute correctly", () => {
    render(<InputGroup label={"label"} id="test" />);

    const input = screen.getByLabelText("label");

    expect(input).toBeInTheDocument();
  });

  it("should display an error message correctly if the error prop is a string", () => {
    render(<InputGroup label={"label"} id="test" error="error message" />);

    const errorMessage = screen.getByRole("paragraph");

    expect(errorMessage).toBeInTheDocument();

    expect(errorMessage).toHaveTextContent("error message");
  });

  it("should not display an error message if error prop is not a string", () => {
    render(<InputGroup label={"label"} id="test" />);

    const errorMessage = screen.queryByRole("paragraph");

    expect(errorMessage).not.toBeInTheDocument();
  });
});
