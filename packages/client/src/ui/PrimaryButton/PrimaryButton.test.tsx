import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PrimaryButton from "./PrimaryButton";

describe("PrimaryButton.tsx", () => {
  it("should display icon if one is passed", () => {
    const svg = (
      <svg data-testid="test-svg" width="10" height="10" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
    );

    render(<PrimaryButton icon={svg}>testing</PrimaryButton>);

    const displayedSvg = screen.getByTestId("test-svg");

    expect(displayedSvg).toBeInTheDocument();
  });
});
