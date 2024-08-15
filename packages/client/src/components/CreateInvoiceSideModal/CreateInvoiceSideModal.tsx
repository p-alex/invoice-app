import { Button, InputGroup, PrimaryButton, SelectGroup } from "../../ui";
import DateGroup from "../../ui/DateGroup/DateGroup";
import SideModal from "../SideModal";
import InvoiceItemList from "./InvoiceItemList";
import { Form, FormSection, FormThreeColGrid } from "../Form";
import InvoiceItem from "./InvoiceItemList/InvoiceItem";
import useCreateInvoiceSideModal from "./useCreateInvoiceSideModal";

export interface CreateInvoiceSideModalProps {
  handleCloseModal: () => void;
  firstFocusableButtonRef: React.RefObject<HTMLButtonElement>;
  lastFocusableButtonRef: React.RefObject<HTMLButtonElement>;
}

function CreateInvoiceSideModal(props: CreateInvoiceSideModalProps) {
  const {
    form,
    submit,
    submitAsDraft,
    handleAddInvoiceItem,
    handleRemoveInvoiceItem,
    handleSetInvoiceDate,
  } = useCreateInvoiceSideModal(props);

  return (
    <SideModal
      handleCloseModal={props.handleCloseModal}
      title={"New Invoice"}
      closeButtonRef={props.firstFocusableButtonRef}
      children={
        <Form onSubmit={form.handleSubmit(submit)} noValidate>
          <FormSection title="Bill From">
            <InputGroup
              id="from_street_address"
              label="Street Address"
              autoComplete="street-address"
              autoFocus
              {...form.register("invoice.sender_address.street")}
              error={
                form.formState.errors.invoice?.sender_address?.street &&
                form.formState.errors.invoice?.sender_address?.street.message
              }
            />
            <div className="flex gap-6">
              <FormThreeColGrid className="gap-6">
                <InputGroup
                  label="City"
                  autoComplete="home city"
                  {...form.register("invoice.sender_address.city")}
                  error={
                    form.formState.errors.invoice?.sender_address?.city &&
                    form.formState.errors.invoice?.sender_address?.city.message
                  }
                />
                <InputGroup
                  label="Post Code"
                  autoComplete="postal-code"
                  {...form.register("invoice.sender_address.post_code")}
                  error={
                    form.formState.errors.invoice?.sender_address?.post_code &&
                    form.formState.errors.invoice?.sender_address?.post_code.message
                  }
                />
                <InputGroup
                  containerClassName="col-span-2 sm:col-span-1"
                  label="Country"
                  autoComplete="country"
                  {...form.register("invoice.sender_address.country")}
                  error={
                    form.formState.errors.invoice?.sender_address?.country &&
                    form.formState.errors.invoice?.sender_address?.country.message
                  }
                />
              </FormThreeColGrid>
            </div>
          </FormSection>
          <FormSection title="Bill To">
            <InputGroup
              label="Client's Name"
              {...form.register("invoice.client_name")}
              error={
                form.formState.errors.invoice?.client_name &&
                form.formState.errors.invoice?.client_name.message
              }
            />
            <InputGroup
              label="Client's Email"
              type="email"
              {...form.register("invoice.client_email")}
              error={
                form.formState.errors.invoice?.client_email &&
                form.formState.errors.invoice?.client_email.message
              }
            />
            <InputGroup
              label="Street Address"
              autoComplete="billing street-address"
              {...form.register("invoice.receiver_address.street")}
              error={
                form.formState.errors.invoice?.receiver_address?.street &&
                form.formState.errors.invoice?.receiver_address.street.message
              }
            />
            <div className="flex gap-6">
              <FormThreeColGrid className="gap-6">
                <InputGroup
                  label="City"
                  autoComplete="billing city"
                  {...form.register("invoice.receiver_address.city")}
                  error={
                    form.formState.errors.invoice?.receiver_address?.city &&
                    form.formState.errors.invoice?.receiver_address.city.message
                  }
                />
                <InputGroup
                  label="Post Code"
                  autoComplete="billing postal-code"
                  inputMode="numeric"
                  {...form.register("invoice.receiver_address.post_code")}
                  error={
                    form.formState.errors.invoice?.receiver_address?.post_code &&
                    form.formState.errors.invoice?.receiver_address.post_code.message
                  }
                />
                <InputGroup
                  containerClassName="col-span-2 sm:col-span-1"
                  label="Country"
                  autoComplete="billing country"
                  {...form.register("invoice.receiver_address.country")}
                  error={
                    form.formState.errors.invoice?.receiver_address?.country &&
                    form.formState.errors.invoice?.receiver_address.country.message
                  }
                />
              </FormThreeColGrid>
            </div>
            <div className="flex gap-6">
              <DateGroup
                id="invoiceDate"
                label="Invoice Date"
                utcDate={new Date(Date.now()).toUTCString()}
                handleChange={(date) => handleSetInvoiceDate(new Date(date))}
                error={
                  form.formState.errors.invoice?.created_at &&
                  form.formState.errors.invoice?.created_at.message
                }
              />
              <SelectGroup
                id="paymentTerms"
                label="Payment Terms"
                options={["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"]}
                handleChange={(option) => {
                  form.setValue("invoice.payment_terms", option);
                }}
                error={
                  form.formState.errors.invoice?.payment_terms &&
                  form.formState.errors.invoice?.payment_terms.message
                }
              />
            </div>
            <InputGroup
              label="Project Description"
              {...form.register("invoice.project_description")}
              error={
                form.formState.errors.invoice?.project_description &&
                form.formState.errors.invoice?.project_description.message
              }
            />
          </FormSection>
          <FormSection title="Item List">
            <InvoiceItemList
              error={
                form.formState.errors.invoice_item_list &&
                form.formState.errors.invoice_item_list.message
              }
            >
              {form.invoiceItemFields.map((field, index) => {
                return (
                  <InvoiceItem
                    key={field.id}
                    invoiceItemIndex={index}
                    handleRemoveInvoiceItem={handleRemoveInvoiceItem}
                    nameField={
                      <InputGroup
                        id={`itemName${index}`}
                        label="Item name"
                        {...form.register(`invoice_item_list.${index}.name` as const)}
                        error={
                          form.formState.errors.invoice_item_list &&
                          form.formState.errors.invoice_item_list[index] &&
                          form.formState.errors.invoice_item_list[index].name?.message
                        }
                      />
                    }
                    quantityField={
                      <InputGroup
                        id={`itemQuantity${index}`}
                        label="Qty"
                        type="number"
                        {...form.register(`invoice_item_list.${index}.quantity` as const, {
                          valueAsNumber: true,
                        })}
                        error={
                          form.formState.errors.invoice_item_list &&
                          form.formState.errors.invoice_item_list[index] &&
                          form.formState.errors.invoice_item_list[index].quantity?.message
                        }
                      />
                    }
                    priceField={
                      <InputGroup
                        id={`itemPrice${index}`}
                        label="Price"
                        type="number"
                        {...form.register(`invoice_item_list.${index}.price` as const, {
                          valueAsNumber: true,
                        })}
                        error={
                          form.formState.errors.invoice_item_list &&
                          form.formState.errors.invoice_item_list[index] &&
                          form.formState.errors.invoice_item_list[index].price?.message
                        }
                      />
                    }
                    totalPrice={(
                      form.watch(`invoice_item_list.${index}.price`) *
                      form.watch(`invoice_item_list.${index}.quantity`)
                    ).toFixed(2)}
                  />
                );
              })}
              <Button onClick={handleAddInvoiceItem}>+ Add New Item</Button>
            </InvoiceItemList>
          </FormSection>
          <div className="flex justify-end gap-2">
            <div className="flex gap-2">
              <Button
                onClick={() => submitAsDraft(form.getValues())}
                disabled={!form.formState.isValid || form.formState.isLoading}
              >
                Save Draft
              </Button>
              <PrimaryButton
                type="submit"
                ref={props.lastFocusableButtonRef}
                disabled={!form.formState.isValid || form.formState.isLoading}
              >
                {form.formState.isLoading ? "Loading..." : "Save & Send"}
              </PrimaryButton>
            </div>
          </div>
        </Form>
      }
    ></SideModal>
  );
}

export default CreateInvoiceSideModal;
