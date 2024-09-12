import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dialog from "./Dialog";
import userEvent from "@testing-library/user-event";

describe("Dialog.tsx", () => {
  it("should display the title", () => {
    const testTitle = "this is the title";

    render(
      <Dialog
        title={testTitle}
        description=""
        cancelBtnRef={{ current: null }}
        actionBtn={undefined}
        closeFunc={() => {}}
      />,
    );

    const title = screen.getByRole("heading", { level: 2 });

    expect(title).toBeInTheDocument();

    expect(title).toHaveTextContent(testTitle);
  });

  it("should display the description", () => {
    const testDescription = "this is the description";

    render(
      <Dialog
        title=""
        description={testDescription}
        cancelBtnRef={{ current: null }}
        actionBtn={undefined}
        closeFunc={() => {}}
      />,
    );

    const description = screen.getByRole("paragraph");

    expect(description).toBeInTheDocument();

    expect(description).toHaveTextContent(testDescription);
  });

  it("should display a cancel button", () => {
    render(
      <Dialog
        title=""
        description={""}
        cancelBtnRef={{ current: null }}
        actionBtn={undefined}
        closeFunc={() => {}}
      />,
    );

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });

    expect(cancelBtn).toBeInTheDocument();
  });

  it("should call 'closeFunc' if the cancel button is clicked", async () => {
    const closeFuncMock = jest.fn();

    render(
      <Dialog
        title=""
        description={""}
        cancelBtnRef={{ current: null }}
        actionBtn={undefined}
        closeFunc={closeFuncMock}
      />,
    );

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });

    await userEvent.click(cancelBtn);

    expect(closeFuncMock).toHaveBeenCalled();
  });

  it("should display the action button", () => {
    render(
      <Dialog
        title=""
        description={""}
        cancelBtnRef={{ current: null }}
        actionBtn={<button>action button</button>}
        closeFunc={() => {}}
      />,
    );

    const actionBtn = screen.getByRole("button", { name: /action button/i });

    expect(actionBtn).toBeInTheDocument();
  });
});
