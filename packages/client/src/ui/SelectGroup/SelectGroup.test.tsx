import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SelectGroup from "./SelectGroup";

const onChangeMock = jest.fn();

describe("SelectGroup.tsx", () => {
  it("should set itself to the first option in the list if no 'value' prop is provided", () => {
    render(
      <SelectGroup
        id="test"
        label="label"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    expect(toggleBtn).toHaveTextContent("item1");
  });

  it("should be set to the value prop if the value prop is provided", () => {
    render(
      <SelectGroup
        id="test"
        value="value"
        label="label"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    expect(toggleBtn).toHaveTextContent("value");
  });

  it("should toggle list of options if any of them are passed to options prop", async () => {
    render(
      <SelectGroup
        id="test"
        label="label"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    await user.click(toggleBtn);

    const listOfOptions = screen.getByRole("list");

    expect(listOfOptions).toBeInTheDocument();

    await user.click(toggleBtn);

    expect(listOfOptions).not.toBeInTheDocument();
  });

  it("should set options correctly", async () => {
    const testOption = "item2";

    render(
      <SelectGroup
        id="test"
        label="label"
        options={["item1", testOption]}
        onChange={onChangeMock}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    await user.click(toggleBtn);

    const option = screen.getByRole("button", { name: testOption });

    await user.click(option);

    expect(onChangeMock).toHaveBeenCalled();

    expect(onChangeMock).toHaveBeenCalledWith(testOption);

    expect(toggleBtn).toHaveTextContent(testOption);
  });

  it("should display all options passed correctly", async () => {
    const options = ["item1", "item2", "item3"];

    render(<SelectGroup id="test" label="label" options={options} onChange={(option) => option} />);

    const toggleBtn = screen.getByRole("button");

    await user.click(toggleBtn);

    const listOfOptions = screen.getByRole("list");

    const optionsList = listOfOptions.querySelectorAll("button");

    expect(optionsList).toHaveLength(options.length);

    for (let i = 0; i < options.length; i++) {
      expect(optionsList[i]).toHaveTextContent(options[i]);
    }
  });

  it("should automatically deactivate after choosing an option", async () => {
    render(
      <SelectGroup
        id="test"
        label="label"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    await user.click(toggleBtn);

    const option = screen.getByText("item2");

    await user.click(option);

    const optionsList = screen.queryByRole("list");

    expect(optionsList).not.toBeInTheDocument();
  });

  it("should deactivate when pressing 'esc' while activated and move focus to toggle", async () => {
    render(
      <SelectGroup
        id="test"
        label="label"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    await user.click(toggleBtn);

    await user.keyboard("[Escape]");

    const optionsList = screen.queryByRole("list");

    expect(optionsList).not.toBeInTheDocument();

    expect(toggleBtn).toHaveFocus();
  });

  it("should move focus to first option button in list when activated", async () => {
    render(
      <SelectGroup
        label="label"
        id="test"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    await user.click(toggleBtn);

    const optionsList = screen.getByRole("list");

    const firstOption = optionsList.querySelectorAll("button")[0];

    expect(firstOption).toHaveFocus();
  });

  it("should move focus to toggle after deactivating", async () => {
    render(
      <SelectGroup
        label="label"
        id="test"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    await user.dblClick(toggleBtn);

    expect(toggleBtn).toHaveFocus();
  });

  it("should trap user focus in the options list when activated", async () => {
    render(
      <SelectGroup
        id="test"
        label="label"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    await user.click(toggleBtn);

    await user.tab({ shift: true });

    const optionsList = screen.getByRole("list");

    const options = optionsList.querySelectorAll("button");

    expect(options[options.length - 1]).toHaveFocus();

    await user.tab();

    expect(options[0]).toHaveFocus();
  });

  it("should display label tag and set htmlFor attribute correctly when id and label are set", () => {
    const labelValue = "label";

    render(
      <SelectGroup
        id="test"
        label={labelValue}
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const select = screen.getByLabelText(labelValue);

    expect(select).toBeInTheDocument();
  });

  it("should display an error message correctly if the error prop is a string", () => {
    const errorValue = "error";

    render(
      <SelectGroup
        id="test"
        label="label"
        error={errorValue}
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const errorMessage = screen.getByRole("paragraph");

    expect(errorMessage).toBeInTheDocument();

    expect(errorMessage).toHaveTextContent(errorValue);
  });

  it("should deactivate when clicking outside the select group", async () => {
    render(
      <SelectGroup
        id="test"
        label="label"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    await user.click(toggleBtn);

    await user.click(document.documentElement);

    const optionsList = screen.queryByRole("list");

    expect(optionsList).not.toBeInTheDocument();
  });

  it("should not move focus to toggle button after clicking outside to deactivate", async () => {
    render(
      <SelectGroup
        id="test"
        label="label"
        options={["item1", "item2"]}
        onChange={(option) => option}
      />,
    );

    const toggleBtn = screen.getByRole("button");

    await user.click(toggleBtn);

    await user.click(document.documentElement);

    expect(toggleBtn).not.toHaveFocus();
  });
});
