import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Calendar from "./Calendar";
import getPrettyDate from "../../utils/getPrettyDate";

const FULL_DATE_BTN_TEST_ID = "fullDateBtn";
const DAY_LIST_TEST_ID = "dayList";
const MONTH_LIST_TEST_ID = "monthList";
const YEAR_LIST_TEST_ID = "yearList";
const PREV_MONTH_BTN_TEST_ID = "prevMonthBtn";
const NEXT_MONTH_BTN_TEST_ID = "nextMonthBtn";

describe("Calendar.tsx", () => {
  it("should display current date in the following format: 1 Jan 2024", () => {
    render(<Calendar date={new Date(2024, 0, 1)} handleChange={(date) => date} />);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    expect(fullDateBtn).toHaveTextContent(getPrettyDate(2024, 0, 1));
  });

  it("should automatically set to current date, if no date is provided", () => {
    render(<Calendar handleChange={() => {}} />);

    const currentDate = new Date(Date.now());

    const prettifiedDate = getPrettyDate(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    expect(fullDateBtn).toBeInTheDocument();

    expect(fullDateBtn).toHaveTextContent(prettifiedDate);
  });

  it("should start at 'chooseYear' step if no date is provided", () => {
    render(<Calendar handleChange={() => {}} />);

    const yearList = screen.getByTestId(YEAR_LIST_TEST_ID);

    expect(yearList).toBeInTheDocument();
  });

  it("should start at 'chooseDay' step if date is provided", () => {
    render(<Calendar date={new Date(Date.now())} handleChange={() => {}} />);

    const dayList = screen.getByTestId(DAY_LIST_TEST_ID);

    expect(dayList).toBeInTheDocument();
  });

  it("should set step to 'chooseYear' step if full date button is clicked", async () => {
    render(<Calendar handleChange={() => {}} />);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    await user.click(fullDateBtn);

    const yearList = screen.getByTestId("yearList");

    expect(yearList).toBeInTheDocument();
  });

  it("should set date to previous month after clicking on the previous month button", async () => {
    render(<Calendar date={new Date(2024, 1, 1, 0, 0, 0)} handleChange={() => {}} />);

    const prevMonthBtn = screen.getByTestId(PREV_MONTH_BTN_TEST_ID);

    await user.click(prevMonthBtn);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    expect(fullDateBtn).toHaveTextContent(getPrettyDate(2024, 0, 1));
  });

  it("should set date to next month after clicking on the next month button", async () => {
    render(<Calendar date={new Date(2024, 1, 1, 0, 0, 0)} handleChange={() => {}} />);

    const nextMonthBtn = screen.getByTestId(NEXT_MONTH_BTN_TEST_ID);

    await user.click(nextMonthBtn);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    expect(fullDateBtn).toHaveTextContent(getPrettyDate(2024, 2, 1));
  });

  it("should change month to December and year to current year - 1 if current month is January and previous month button was clicked", async () => {
    render(<Calendar date={new Date(2024, 0, 1, 0, 0, 0)} handleChange={() => {}} />);

    const prevMonthBtn = screen.getByTestId(PREV_MONTH_BTN_TEST_ID);

    await user.click(prevMonthBtn);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    expect(fullDateBtn).toHaveTextContent(getPrettyDate(2023, 11, 1));
  });

  it("should change month to January and year to current year + 1 if current month is December and next month button was clicked", async () => {
    render(<Calendar date={new Date(2024, 11, 1, 0, 0, 0)} handleChange={() => {}} />);

    const nextMonthBtn = screen.getByTestId(NEXT_MONTH_BTN_TEST_ID);

    await user.click(nextMonthBtn);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    expect(fullDateBtn).toHaveTextContent(getPrettyDate(2025, 0, 1));
  });

  it("should set current day to last day of the month if current day does not exist in the current month, after pressing next month button", async () => {
    render(<Calendar date={new Date(2024, 0, 31)} handleChange={() => {}} />);

    const nextMonthBtn = screen.getByTestId(NEXT_MONTH_BTN_TEST_ID);

    await user.click(nextMonthBtn);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    expect(fullDateBtn).toHaveTextContent(getPrettyDate(2024, 1, 29));
  });

  it("should set current day to last day of the month if current day does not exist in the current month, after pressing previous month button", async () => {
    render(<Calendar date={new Date(2024, 0, 31)} handleChange={() => {}} />);

    const prevMonthBtn = screen.getByTestId(PREV_MONTH_BTN_TEST_ID);

    await user.click(prevMonthBtn);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    expect(fullDateBtn).toHaveTextContent(getPrettyDate(2023, 11, 30));
  });

  it("if year changes from leap year to non leap year and date was Febuary 29, it should change date to Febuary 28", async () => {
    render(<Calendar date={new Date(2024, 1, 29)} handleChange={(date) => date} />);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    await user.click(fullDateBtn);

    await user.click(screen.getByTestId("yearBtn-2023"));

    await user.click(screen.getByTestId("monthBtn-5"));

    expect(fullDateBtn).toHaveTextContent(getPrettyDate(2023, 5, 28));
  });

  it("should cycle steps correctly", async () => {
    render(<Calendar date={new Date(Date.now())} handleChange={() => {}} />);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    await user.click(fullDateBtn);

    const yearList = screen.getByTestId(YEAR_LIST_TEST_ID);

    expect(yearList).toBeInTheDocument();

    await user.click(yearList.querySelector("button")!);

    const monthList = screen.getByTestId(MONTH_LIST_TEST_ID);

    expect(monthList).toBeInTheDocument();

    await user.click(monthList.querySelector("button")!);

    const dayList = screen.getByTestId(DAY_LIST_TEST_ID);

    expect(dayList).toBeInTheDocument();
  });

  it("should move focus to current year in the list when step is changed to 'chooseYear'", () => {
    const currentYear = new Date(Date.now()).getFullYear();

    render(<Calendar handleChange={() => {}} />);

    const currentYearBtn = screen.getByTestId("yearBtn-" + currentYear);

    expect(currentYearBtn).toHaveFocus();
  });

  it("should move focus to current month in the list when step is changed to 'chooseMonth'", async () => {
    const testDate = new Date(Date.now());

    render(<Calendar date={testDate} handleChange={() => {}} />);

    const fullDateBtn = screen.getByTestId(FULL_DATE_BTN_TEST_ID);

    await user.click(fullDateBtn);

    await user.click(screen.getByTestId("yearBtn-" + testDate.getFullYear()));

    const currentMonthBtn = screen.getByTestId("monthBtn-" + testDate.getMonth());

    expect(currentMonthBtn).toHaveFocus();
  });

  it("should move focus to current day in the list when step is changed to 'chooseDay'", () => {
    const testDate = new Date(Date.now());

    render(<Calendar date={testDate} handleChange={() => {}} />);

    const currentDayBtn = screen.getByTestId("dayBtn-" + testDate.getDate());

    expect(currentDayBtn).toHaveFocus();
  });

  it("should execute 'handleChange' function after selecting a day with the correct params", async () => {
    const handleChangeTestFn = jest.fn();

    const testDate = new Date(2024, 0, 4, 0, 0, 0);

    render(<Calendar date={testDate} handleChange={handleChangeTestFn} />);

    await user.click(screen.getByTestId("dayBtn-4"));

    expect(handleChangeTestFn).toHaveBeenCalled();

    expect(handleChangeTestFn).toHaveBeenCalledWith(testDate);
  });
});
