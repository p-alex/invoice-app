import { useRef, useState } from "react";
import { Button, InputGroup, PrimaryButton, SelectGroup } from "../../ui";
import DateGroup from "../../ui/DateGroup/DateGroup";
import createRandomId from "../../utils/createRandomId";
import SideModal from "../SideModal";
import InvoiceItemList from "./InvoiceItemList";
import { Form, FormSection, FormThreeColGrid } from "../Form";
import useForm from "../../hooks/useForm";
import { InvoiceType, invoiceSchema } from "../../entities/Invoice";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CreateInvoiceRequestType } from "../../endpoints/useInvoiceEndpoint";

export interface CreateInvoiceSideModalProps {
  handleCloseModal: () => void;
  handleCreateInvoice: CreateInvoiceRequestType;
  handleSaveDraft: (invoice: InvoiceType) => void;
  handleRemoveDraft: (invoiceId: string) => void;
  firstFocusableButtonRef: React.RefObject<HTMLButtonElement>;
  lastFocusableButtonRef: React.RefObject<HTMLButtonElement>;
}

function CreateInvoiceSideModal({
  handleCloseModal,
  handleCreateInvoice,
  handleSaveDraft,
  handleRemoveDraft,
  firstFocusableButtonRef,
  lastFocusableButtonRef,
}: CreateInvoiceSideModalProps) {
  const localStorage = useLocalStorage();

  const draft = localStorage.getItem<InvoiceType>("draft");

  const invoiceId = useRef<string>(draft ? draft.id : createRandomId());

  const {
    formState,
    handleSubmit,
    registerTextInput,
    registerDateInput,
    registerSelectInput,
    registerListOfObjects,
  } = useForm<InvoiceType>(
    draft
      ? draft
      : {
          id: invoiceId.current,
          from_streetAddress: "",
          from_city: "",
          from_postCode: "",
          from_country: "",
          to_clientName: "",
          to_clientEmail: "",
          to_streetAddress: "",
          to_city: "",
          to_postCode: "",
          to_country: "",
          invoiceDate: new Date().toUTCString(),
          paymentTerms: "Net 1 Day",
          projectDescription: "",
          invoiceItemList: [],
        },
    invoiceSchema,
  );

  const handleCreateInvoiceRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(
      event,
      () => handleCreateInvoice(formState.state),
      (result, error) => {
        if (error) {
          setFormMessage({ type: "error", message: error });
          return;
        }

        handleCloseModal();

        handleRemoveDraft(result.id);
      },
    );
  };

  const [formMessage, setFormMessage] = useState<{ type: "error" | "success"; message: string }>();

  return (
    <SideModal handleCloseModal={handleCloseModal}>
      <Form onSubmit={handleCreateInvoiceRequest} noValidate>
        <SideModal.CloseButton onClick={handleCloseModal} ref={firstFocusableButtonRef} />
        <h2 className="text-2xl font-bold text-textLT dark:text-textDT">{"New Invoice"}</h2>

        <FormSection title="Bill From">
          <InputGroup
            label="Street Address"
            autoComplete="street-address"
            autoFocus
            {...registerTextInput("from_streetAddress")}
          />
          <div className="flex gap-6">
            <FormThreeColGrid className="gap-6">
              <InputGroup
                label="City"
                autoComplete="home city"
                {...registerTextInput("from_city")}
              />
              <InputGroup
                label="Post Code"
                autoComplete="postal-code"
                inputMode="numeric"
                {...registerTextInput("from_postCode")}
              />
              <InputGroup
                containerClassName="col-span-2 sm:col-span-1"
                label="Country"
                autoComplete="country"
                {...registerTextInput("from_country")}
              />
            </FormThreeColGrid>
          </div>
        </FormSection>
        <FormSection title="Bill To">
          <InputGroup label="Client's Name" {...registerTextInput("to_clientName")} />
          <InputGroup
            label="Client's Email"
            type="email"
            {...registerTextInput("to_clientEmail")}
          />
          <InputGroup
            label="Street Address"
            autoComplete="billing street-address"
            {...registerTextInput("to_streetAddress")}
          />

          <div className="flex gap-6">
            <FormThreeColGrid className="gap-6">
              <InputGroup
                label="City"
                autoComplete="billing city"
                {...registerTextInput("to_city")}
              />
              <InputGroup
                label="Post Code"
                autoComplete="billing postal-code"
                inputMode="numeric"
                {...registerTextInput("to_postCode")}
              />
              <InputGroup
                containerClassName="col-span-2 sm:col-span-1"
                label="Country"
                autoComplete="billing country"
                {...registerTextInput("to_country")}
              />
            </FormThreeColGrid>
          </div>
          <div className="flex gap-6">
            <DateGroup
              id="invoiceDate"
              label="Invoice Date"
              {...registerDateInput("invoiceDate")}
            />
            <SelectGroup
              id="paymentTerms"
              label="Payment Terms"
              options={["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"]}
              {...registerSelectInput("paymentTerms")}
            />
          </div>
          <InputGroup label="Project Description" {...registerTextInput("projectDescription")} />
        </FormSection>
        <FormSection title="Item List">
          <InvoiceItemList
            currentInvoiceId={invoiceId.current}
            {...registerListOfObjects("invoiceItemList")}
          />
        </FormSection>
        {formMessage?.message && (
          <p className={`${formMessage.type === "error" ? "text-danger" : "text-green-500"}`}>
            {formMessage.message}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <div className="flex gap-2">
            <Button onClick={() => handleSaveDraft(formState.state)}>Save Draft</Button>
            <PrimaryButton
              type="submit"
              ref={lastFocusableButtonRef}
              disabled={formState.isLoading}
            >
              {formState.isLoading ? "Loading..." : "Save & Send"}
            </PrimaryButton>
          </div>
        </div>
      </Form>
    </SideModal>
  );
}

export default CreateInvoiceSideModal;
