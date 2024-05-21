import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import DateGroup from "./DateGroup";

describe("DateGroup.tsx", () => {
  it("should toggle the calendar properly", async () => {
    render(<DateGroup label="label" id="id" onChange={() => {}} />);

    const calendarToggle = screen.getByTestId("dateGroupToggle");

    await user.click(calendarToggle);

    expect(screen.queryByTestId("calendarContainer")).toBeInTheDocument();

    await user.click(calendarToggle);

    expect(screen.queryByTestId("calendarContainer")).not.toBeInTheDocument();
  });

  it("should hide calendar if the user pressed 'esc' on the keyboard", async () => {
    render(<DateGroup label="label" id="id" onChange={() => {}} />);

    const calendarToggle = screen.getByTestId("dateGroupToggle");

    await user.click(calendarToggle);

    await user.keyboard("[Escape]");

    expect(screen.queryByTestId("calendarContainer")).not.toBeInTheDocument();
  });
});
