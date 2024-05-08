import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("if paragraph is displayed", async () => {
  render(<App />);
  const p = await screen.findByRole("paragraph");
  expect(p).toHaveTextContent("App");
  expect(p).toBeInTheDocument();
});
