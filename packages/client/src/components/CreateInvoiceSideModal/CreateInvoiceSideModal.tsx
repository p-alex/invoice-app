import { useRef } from "react";
import { Button, InputGroup, PrimaryButton, SelectGroup } from "../../ui";
import DateGroup from "../../ui/DateGroup/DateGroup";
import createRandomId from "../../utils/createRandomId";
import SideModal from "../SideModal";
import InvoiceItemList from "./InvoiceItemList";
import { Form, FormSection, FormThreeColGrid } from "../Form";

interface Props {
  handleCloseModal: () => void;
}

function CreateInvoiceSideModal({ handleCloseModal }: Props) {
  const invoiceId = useRef<string>(createRandomId());

  return (
    <SideModal
      handleCloseModal={handleCloseModal}
      render={(lastFocusableButtonRef) => {
        return (
          <Form>
            <h2 className="text-2xl font-bold text-textLT dark:text-textDT">{"New Invoice"}</h2>
            <FormSection title="Bill From">
              <InputGroup
                label="Street Address"
                id="streetAddress"
                autoComplete="street-address"
                error={undefined}
                autoFocus
              />
              <div className="flex gap-6">
                <FormThreeColGrid className="gap-6">
                  <InputGroup label="City" id="city" autoComplete="home city" error={undefined} />
                  <InputGroup
                    label="Post Code"
                    id="postCode"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    error={undefined}
                  />
                  <InputGroup
                    containerClassName="col-span-2 sm:col-span-1"
                    label="Country"
                    autoComplete="country"
                    id="country"
                    error={undefined}
                  />
                </FormThreeColGrid>
              </div>
            </FormSection>
            <FormSection title="Bill To">
              <InputGroup label="Client's Name" id="clientName" />
              <InputGroup label="Client's Email" type="email" id="clientEmail" />
              <InputGroup
                label="Street Address"
                id="billToStreetAddress"
                autoComplete="billing street-address"
                error={undefined}
              />

              <div className="flex gap-6">
                <FormThreeColGrid className="gap-6">
                  <InputGroup
                    label="City"
                    id="billToCity"
                    autoComplete="billing city"
                    error={undefined}
                  />
                  <InputGroup
                    label="Post Code"
                    id="billToPostCode"
                    autoComplete="billing postal-code"
                    inputMode="numeric"
                    error={undefined}
                  />
                  <InputGroup
                    containerClassName="col-span-2 sm:col-span-1"
                    label="Country"
                    autoComplete="billing country"
                    id="billToCountry"
                    error={undefined}
                  />
                </FormThreeColGrid>
              </div>
              <div className="flex gap-6">
                <DateGroup id="invoiceDate" label="Invoice Date" onChange={() => {}} />
                <SelectGroup
                  id="paymentTerms"
                  label="Payment Terms"
                  onChange={() => {}}
                  options={["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"]}
                />
              </div>
              <InputGroup label="Project Description" id="projectDescription" error={undefined} />
            </FormSection>
            <FormSection title="Item List">
              <InvoiceItemList
                currentInvoiceId={invoiceId.current}
                invoices={[]}
                onChange={(invoiceItemList) => console.log(invoiceItemList)}
              />
            </FormSection>
            <div className="flex justify-end gap-2">
              <div className="flex gap-2">
                <Button>Save Draft</Button>
                <PrimaryButton type="submit" ref={lastFocusableButtonRef}>
                  Save & Send
                </PrimaryButton>
              </div>
            </div>
          </Form>
        );
      }}
    ></SideModal>
  );
}

export default CreateInvoiceSideModal;
