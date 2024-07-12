import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SideModal from "./SideModal";

describe("SideModal.tsx", () => {
  it("should display content properly", () => {
    render(
      <SideModal handleCloseModal={() => {}}>
        <p>hello</p>
      </SideModal>,
    );

    const paragraph = screen.getByText("hello");

    expect(paragraph).toBeInTheDocument();
  });

  it("should call 'handleCloseModal' if the backdrop is clicked", async () => {
    const closeMock = jest.fn();
    render(
      <SideModal handleCloseModal={closeMock}>
        <p>hello</p>
      </SideModal>,
    );

    const backdrop = screen.getByTestId("sideModalBackdrop");

    await user.click(backdrop);

    expect(closeMock).toHaveBeenCalled();
  });
});
