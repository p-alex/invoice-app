/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { act, renderHook, waitFor } from "@testing-library/react";
import useForm from "./useForm";
import { z } from "zod";
import { InvoiceItemType } from "../entities/InvoiceItem";

const testStateSchema = z.object({
  username: z.string().min(1, "not blank"),
  password: z.string().min(1, "not blank"),
  createdAt: z.string().min(1, "not blank"),
  selectOption: z.enum(["test1", "test2"], { message: "invalid option" }),
  list: z.array(z.object({ test: z.string().min(1) })).min(1, "at least one"),
});

describe("useForm.ts", () => {
  const invalidTestState = {
    username: "",
    password: "",
    createdAt: "",
    selectOption: "test3",
    list: [],
  };

  const validTestState = {
    username: "test",
    password: "test",
    createdAt: new Date(2020, 1, 1).toUTCString(),
    selectOption: "test1",
    list: [{ test: "test" }],
  };

  it("should set formState correctly", () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    expect(result.current.formState.state).toEqual(validTestState);
  });

  it("should return correct properties from 'registerTextInput' function", () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    act(() => {
      const registerTextProps = result.current.registerTextInput("username");

      expect(registerTextProps).toHaveProperty("text", validTestState.username);

      expect(registerTextProps).toHaveProperty("error", undefined);

      expect(registerTextProps).toHaveProperty("handleChange");
    });
  });

  it("should return correct properties from 'registerSelectInput' function", () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    act(() => {
      const registerSelectInput = result.current.registerSelectInput("selectOption");

      expect(registerSelectInput).toHaveProperty("option", validTestState.selectOption);

      expect(registerSelectInput).toHaveProperty("error", undefined);

      expect(registerSelectInput).toHaveProperty("handleChange");
    });
  });

  it("should return correct properties from 'registerDateInput' function", () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    act(() => {
      const registerDateInput = result.current.registerDateInput("createdAt");

      expect(registerDateInput).toHaveProperty("utcDate", validTestState.createdAt);

      expect(registerDateInput).toHaveProperty("error", undefined);

      expect(registerDateInput).toHaveProperty("handleChange");
    });
  });

  it("should return correct properties from 'registerListOfObjectsInput' function", () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    act(() => {
      const registerListOfObjects = result.current.registerListOfObjects("list");

      expect(registerListOfObjects).toHaveProperty("list", validTestState.list);

      expect(registerListOfObjects).toHaveProperty("error", undefined);

      expect(registerListOfObjects).toHaveProperty("handleChange");
    });
  });

  it("should update correct state property when 'handleChange' is called from 'registerTextInput' function", async () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    act(() => {
      result.current
        .registerTextInput("username")
        .handleChange({ target: { value: "hello" } } as any);
    });

    await waitFor(() => expect(result.current.formState.state.username).toEqual("hello"));
  });

  it("should update correct state property when 'handleChange' is called from 'registerSelectInput' function", async () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    act(() => {
      result.current.registerSelectInput("selectOption").handleChange("item2");
    });

    await waitFor(() => expect(result.current.formState.state.selectOption).toEqual("item2"));
  });

  it("should update correct state property when 'handleChange' is called from 'registerDateInput' function", async () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    const testDate = new Date(2000, 4, 20).toUTCString();

    act(() => {
      result.current.registerDateInput("createdAt").handleChange(testDate);
    });

    await waitFor(() => expect(result.current.formState.state.createdAt).toEqual(testDate));
  });

  it("should update correct state property when 'handleChange' is called from 'registerListOfObjectsInput' function", async () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    const testListOfObjects: InvoiceItemType[] = [
      { id: "test", invoiceId: "test", name: "test", price: 0, quantity: 0 },
    ];

    act(() => {
      result.current.registerListOfObjects("list").handleChange(testListOfObjects);
    });

    await waitFor(() => expect(result.current.formState.state.list).toEqual(testListOfObjects));
  });

  it("should create default fieldErrors object on load correctly", () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    const errors = Object.keys(validTestState).reduce(
      (acc, curr) => {
        const key = curr as keyof typeof acc;

        acc[key] = undefined;

        return acc;
      },
      {} as { [Property in keyof typeof validTestState]: string | undefined },
    );

    expect(result.current.formState.fieldErrors).toEqual(errors);
  });

  it("after calling 'handleSubmit' with a valid form, the callback function should be called with the correct result and an error as an empty string", async () => {
    const { result } = renderHook(() => useForm(validTestState, testStateSchema));

    const callbackFunc = jest.fn();

    const handleSubmit = result.current.handleSubmit;

    act(() => {
      handleSubmit(
        { preventDefault: () => {} } as any,
        async () => ({ success: true, result: true, error: "" }),
        callbackFunc,
      );
    });

    await waitFor(() => {
      expect(callbackFunc).toHaveBeenCalled();

      expect(callbackFunc).toHaveBeenCalledWith(true, "");
    });
  });

  it("after calling handleSubmit with an invalid form, the callback function should be called with an empty object as result and an error as string", async () => {
    const { result } = renderHook(() => useForm(invalidTestState, testStateSchema));

    const callbackFunc = jest.fn();

    const handleSubmit = result.current.handleSubmit;

    act(() => {
      handleSubmit(
        { preventDefault: () => {} } as any,
        async () => ({ success: true, result: true, error: "" }),
        callbackFunc,
      );
    });

    await waitFor(() => {
      expect(callbackFunc).toHaveBeenCalled();

      expect(callbackFunc).toHaveBeenCalledWith({}, "All fields must be valid");
    });
  });

  it("should not call submit func if form is invalid", async () => {
    const { result } = renderHook(() => useForm(invalidTestState, testStateSchema));

    const submitFunc = jest.fn();

    const handleSubmit = result.current.handleSubmit;

    act(() => {
      handleSubmit({ preventDefault: () => {} } as any, submitFunc, () => {});
    });

    await waitFor(() => expect(submitFunc).not.toHaveBeenCalled());
  });

  it("should populate fieldErrors object correctly if the form has been submitted with invalid data", async () => {
    const { result } = renderHook(() => useForm(invalidTestState, testStateSchema));

    const handleSubmit = result.current.handleSubmit;

    act(() => {
      handleSubmit(
        { preventDefault: () => {} } as any,
        async () => ({ success: true, result: true, error: "" }),
        () => {},
      );
    });

    await waitFor(() => {
      const fieldErrors = result.current.formState.fieldErrors;

      expect(fieldErrors.username).not.toBeUndefined();

      expect(fieldErrors.password).not.toBeUndefined();

      expect(fieldErrors.selectOption).not.toBeUndefined();

      expect(fieldErrors.createdAt).not.toBeUndefined();

      expect(fieldErrors.list).not.toBeUndefined();
    });
  });
});
