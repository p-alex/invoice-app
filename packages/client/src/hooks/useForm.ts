import { useRef, useState } from "react";
import { SelectGroupProps } from "../ui/SelectGroup/SelectGroup";
import { ZodSchema } from "zod";
import { DefaultResponse } from "../entities/DefaultResponse";

type FieldErrorsType<TState> = { [Property in keyof TState]: string | undefined };

function useForm<TState extends object>(state: TState, zodSchema: ZodSchema) {
  const [formState, setFormState] = useState<TState>(state);

  const [isLoading, setIsLoading] = useState(false);

  const createFieldErrorsObject = (): FieldErrorsType<TState> => {
    const result = Object.keys(formState).reduce((acc, curr) => {
      const key = curr as keyof TState;

      acc[key] = undefined;

      return acc;
    }, {} as FieldErrorsType<TState>);

    return result;
  };

  const defaultFieldErrorsObject = useRef(createFieldErrorsObject());

  const [fieldErrors, setFieldErrors] = useState<FieldErrorsType<TState>>(
    defaultFieldErrorsObject.current,
  );

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>, name: keyof TState) => {
    setFormState((prevState) => ({ ...prevState, [name]: event.target.value }));
  };

  const handleSelectChange = (option: string, name: keyof TState) => {
    setFormState((prevState) => ({ ...prevState, [name]: option }));
  };

  const handleDateChange = (dateInUTCFormat: string, name: keyof TState) => {
    setFormState((prevState) => ({ ...prevState, [name]: dateInUTCFormat }));
  };

  const handleArrayOfObjectsChange = <TArray>(list: TArray, name: keyof TState) => {
    setFormState((prevState) => ({ ...prevState, [name]: list }));
  };

  const handleValidate = () => {
    const result = zodSchema.safeParse(formState);

    if (result.success) return true;

    const newFieldErrors = { ...defaultFieldErrorsObject.current };

    for (let i = 0; i < result.error.issues.length; i++) {
      const issue = result.error.issues[i];

      const path = issue.path[0] as keyof FieldErrorsType<TState>;

      newFieldErrors[path] = issue.message;
    }

    setFieldErrors(newFieldErrors);
  };

  const handleResetFieldErrors = () => {
    setFieldErrors(defaultFieldErrorsObject.current);
  };

  const resetForm = () => {
    setFieldErrors(defaultFieldErrorsObject.current);
    setFormState(state);
  };

  const handleSubmit = async <TResult>(
    event: React.FormEvent<HTMLFormElement>,
    submitFunc: () => Promise<DefaultResponse<TResult>>,
    cb: (result: TResult, error: string | null) => void,
  ) => {
    event.preventDefault();

    handleResetFieldErrors();

    setIsLoading(true);

    try {
      const isValid = handleValidate();

      if (!isValid) throw new Error("All fields must be valid");

      const response = await submitFunc();

      cb(response.result, response.error);

      resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) cb({} as TResult, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const registerTextInput = (name: keyof TState) => ({
    id: name,
    name: name,
    value: formState[name] as string,
    error: fieldErrors[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleTextChange(event, name),
  });

  const registerSelectInput = (
    name: keyof TState,
  ): Pick<SelectGroupProps, "onChange" | "value" | "error"> => ({
    value: formState[name] as string,
    error: fieldErrors[name],
    onChange: (option: string) => handleSelectChange(option, name),
  });

  const registerDateInput = (name: keyof TState) => ({
    date: formState[name] as Date,
    error: fieldErrors[name],
    onChange: (dateInUTCFormat: string) => handleDateChange(dateInUTCFormat, name),
  });

  const registerListOfObjects = <TArray>(name: keyof TState) => ({
    list: formState[name] as TArray,
    onChange: (list: TArray) => handleArrayOfObjectsChange(list, name),
    error: fieldErrors[name],
  });

  return {
    formState: {
      state: formState,
      fieldErrors,
      isLoading,
    },
    handleSubmit,
    registerTextInput,
    registerSelectInput,
    registerDateInput,
    registerListOfObjects,
  };
}

export default useForm;
