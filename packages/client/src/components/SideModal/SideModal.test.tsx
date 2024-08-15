import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SideModal from "./SideModal";

describe("SideModal.tsx", () => {
  it("should display content correctly", () => {
    render(
      <SideModal
        handleCloseModal={() => {}}
        title="test"
        children={<p>test</p>}
        closeButtonRef={{ current: null }}
      />,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toBeInTheDocument();
  });

  it("should call 'handleCloseModal' if the backdrop is clicked", async () => {
    const closeMock = jest.fn();
    render(
      <SideModal
        handleCloseModal={closeMock}
        title="test"
        children={<p>test</p>}
        closeButtonRef={{ current: null }}
      />,
    );

    const backdrop = screen.getByTestId("sideModalBackdrop");

    await user.click(backdrop);

    expect(closeMock).toHaveBeenCalled();
  });

  it("should call 'handleCloseModal' if the close button is clicked", async () => {
    const closeMock = jest.fn();

    render(
      <SideModal
        handleCloseModal={closeMock}
        title="test"
        children={<p>test</p>}
        closeButtonRef={{ current: null }}
      />,
    );

    const closeButton = screen.getByLabelText(/close test modal/i);

    await user.click(closeButton);

    expect(closeMock).toHaveBeenCalled();
  });

  it("should set the title as an h2 tag", () => {
    render(
      <SideModal handleCloseModal={() => {}} title="title" closeButtonRef={{ current: null }}>
        <p>content</p>
      </SideModal>,
    );

    const h2 = screen.getByRole("heading", { level: 2 });

    expect(h2).toBeInTheDocument();

    expect(h2).toHaveTextContent("title");
  });
});
