import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Checkbox from "./Checkbox";

describe("Checkbox.tsx", () => {
  it("should display label correctly", () => {
    render(<Checkbox id="id" label="checkbox" checked={false} onChange={() => {}} />);

    const checkbox = screen.getByLabelText("checkbox");

    expect(checkbox).toBeInTheDocument();
  });

  it("should call 'onChange' correctly", async () => {
    const onChangeFn = jest.fn();

    render(<Checkbox id="id" label="checkbox" checked={false} onChange={onChangeFn} />);

    const checkbox = screen.getByLabelText("checkbox");

    await user.click(checkbox);

    expect(onChangeFn).toHaveBeenCalledTimes(1);

    expect(onChangeFn).toHaveBeenCalledWith(true);

    await user.click(checkbox);

    expect(onChangeFn).toHaveBeenCalledWith(false);
  });

  it("should set 'aria-checked' correctly", async () => {
    render(<Checkbox id="id" label="checkbox" checked={false} onChange={() => {}} />);

    const checkbox = screen.getByLabelText("checkbox");

    await user.click(checkbox);

    const ariaChecked = checkbox.getAttribute("aria-checked");

    expect(ariaChecked).toBe("true");
  });

  it("should set 'aria-label' correctly", async () => {
    render(<Checkbox id="id" label="checkbox" checked={false} onChange={() => {}} />);

    const checkbox = screen.getByLabelText("checkbox");

    expect(checkbox.getAttribute("aria-label")).toBe("Check checkbox");

    await user.click(checkbox);

    expect(checkbox.getAttribute("aria-label")).toBe("Uncheck checkbox");
  });
});
