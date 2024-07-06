import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import VisibiltyToggleProvider from "./VisibilityToggleProvider";

describe("VisibilityToggleProvider.tsx", () => {
  it("should toggle properly", async () => {
    render(
      <VisibiltyToggleProvider
        toggle={({ handleToggleVisibilty }) => (
          <button onClick={handleToggleVisibilty}>toggle</button>
        )}
        content={() => <p>content</p>}
      />,
    );

    const toggle = screen.getByRole("button");

    await user.click(toggle);

    const content = screen.getByRole("paragraph");

    expect(content).toBeInTheDocument();

    await user.click(toggle);

    expect(content).not.toBeInTheDocument();
  });

  it("should redirect focus to toggle when toggled off", async () => {
    render(
      <VisibiltyToggleProvider
        toggle={({ toggleRef, handleToggleVisibilty }) => (
          <button onClick={handleToggleVisibilty} ref={toggleRef}>
            toggle
          </button>
        )}
        content={({ handleToggleOffVisibilty }) => (
          <p onClick={handleToggleOffVisibilty}>content</p>
        )}
      />,
    );

    const toggle = screen.getByRole("button");

    await user.click(toggle);

    const content = screen.getByRole("paragraph");

    await user.click(content);

    expect(toggle).toHaveFocus();
  });

  it("should hide content when clicking outside of the container if 'hideWhenClickOutside' prop is set to true", async () => {
    render(
      <VisibiltyToggleProvider
        toggle={({ toggleRef, handleToggleVisibilty }) => (
          <button onClick={handleToggleVisibilty} ref={toggleRef}>
            toggle
          </button>
        )}
        content={() => <p>content</p>}
        hideWhenClickOutside
      />,
    );

    const toggle = screen.getByRole("button");

    await user.click(toggle);

    const body = window.document.documentElement;

    await user.click(body);

    const content = screen.queryByRole("paragraph");

    expect(content).not.toBeInTheDocument();
  });

  it("should hide content after the 'Escape' key is pressed if 'hideWithEsc' prop is set to true", async () => {
    render(
      <VisibiltyToggleProvider
        toggle={({ toggleRef, handleToggleVisibilty }) => (
          <button onClick={handleToggleVisibilty} ref={toggleRef}>
            toggle
          </button>
        )}
        content={() => <p>content</p>}
        hideWithEsc
      />,
    );

    const toggle = screen.getByRole("button");

    await user.click(toggle);

    await user.keyboard("[Escape]");

    const content = screen.queryByRole("paragraph");

    expect(content).not.toBeInTheDocument();
  });
});
