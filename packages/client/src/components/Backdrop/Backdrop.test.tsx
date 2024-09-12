import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Backdrop from "./Backdrop";

describe("Backdrop.tsx", () => {
  it("should call 'func' if the backdrop is clicked", async () => {
    const funcMock = jest.fn();

    render(<Backdrop func={funcMock} />);

    const backdrop = screen.getByTestId("backdrop");

    await userEvent.click(backdrop);

    expect(funcMock).toHaveBeenCalled();
  });
});
