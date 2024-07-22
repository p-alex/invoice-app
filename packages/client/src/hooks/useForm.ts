import { useRef, useState } from "react";
import { SelectGroupFormProps } from "../ui/SelectGroup/SelectGroup";
import { ZodSchema } from "zod";
import { DefaultResponse } from "../entities/DefaultResponse";
import { InputGroupFormProps } from "../ui/InputGroup/InputGroup";
import { DateGroupFormProps } from "../ui/DateGroup/DateGroup";
import { ArrayOfObjectFormProps } from "../components/CreateInvoiceSideModal/InvoiceItemList/InvoiceItemList";

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

  const handleDateChange = (invoiceUTCDate: string, name: keyof TState) => {
    setFormState((prevState) => ({ ...prevState, [name]: invoiceUTCDate }));
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

  const registerTextInput = (name: keyof TState): InputGroupFormProps => ({
    text: formState[name] as string,
    error: fieldErrors[name],
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => handleTextChange(event, name),
  });

  const registerSelectInput = (name: keyof TState): SelectGroupFormProps => ({
    option: formState[name] as string,
    error: fieldErrors[name],
    handleChange: (option: string) => handleSelectChange(option, name),
  });

  const registerDateInput = (name: keyof TState): DateGroupFormProps => ({
    utcDate: formState[name] as string,
    error: fieldErrors[name],
    handleChange: (invoiceUTCDate: string) => handleDateChange(invoiceUTCDate, name),
  });

  const registerListOfObjects = <TArray>(name: keyof TState): ArrayOfObjectFormProps => ({
    // @ts-expect-error will error out if the name parameter is not correctly assigned
    list: formState[name] as TArray,
    error: fieldErrors[name],
    // @ts-expect-error will error out if the list parameter is not correctly assigned
    handleChange: (list: TArray) => handleArrayOfObjectsChange(list, name),
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
