import { Button, InputGroup, PrimaryButton, SelectGroup } from "../../ui";
import DateGroup from "../../ui/DateGroup/DateGroup";
import SideModal from "../SideModal";
import InvoiceItemList from "./InvoiceItemList";
import { Form, FormSection, FormThreeColGrid } from "../Form";
import InvoiceItem from "./InvoiceItemList/InvoiceItem";
import useCreateInvoiceSideModal, {
  CreateInvoiceSideModalProps,
} from "./useCreateInvoiceSideModal";

function CreateInvoiceSideModal(props: CreateInvoiceSideModalProps) {
  const {
    form,
    handleSaveAndSend,
    handleSaveAsDraft,
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
        <Form onSubmit={form.handleSubmit(handleSaveAndSend)} noValidate>
          <FormSection title="Bill From">
            <InputGroup
              id="from_street_address"
              label="Street Address"
              autoComplete="street-address"
              autoFocus
              {...form.register("invoice.sender_address.street")}
              error={
                form.formState.errors.invoice?.sender_address?.street &&
                form.formState.errors.invoice?.sender_address?.street?.message
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
                    form.formState.errors.invoice?.sender_address?.city?.message
                  }
                />
                <InputGroup
                  label="Post Code"
                  autoComplete="postal-code"
                  {...form.register("invoice.sender_address.post_code")}
                  error={
                    form.formState.errors.invoice?.sender_address?.post_code &&
                    form.formState.errors.invoice?.sender_address?.post_code?.message
                  }
                />
                <InputGroup
                  containerClassName="col-span-2 sm:col-span-1"
                  label="Country"
                  autoComplete="country"
                  {...form.register("invoice.sender_address.country")}
                  error={
                    form.formState.errors.invoice?.sender_address?.country &&
                    form.formState.errors.invoice?.sender_address?.country?.message
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
                form.formState.errors.invoice?.client_name?.message
              }
            />
            <InputGroup
              label="Client's Email"
              type="email"
              {...form.register("invoice.client_email")}
              error={
                form.formState.errors.invoice?.client_email &&
                form.formState.errors.invoice?.client_email?.message
              }
            />
            <InputGroup
              label="Street Address"
              autoComplete="billing street-address"
              {...form.register("invoice.receiver_address.street")}
              error={
                form.formState.errors.invoice?.receiver_address?.street &&
                form.formState.errors.invoice?.receiver_address?.street?.message
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
                    form.formState.errors.invoice?.receiver_address?.city?.message
                  }
                />
                <InputGroup
                  label="Post Code"
                  autoComplete="billing postal-code"
                  {...form.register("invoice.receiver_address.post_code")}
                  error={
                    form.formState.errors.invoice?.receiver_address?.post_code &&
                    form.formState.errors.invoice?.receiver_address?.post_code?.message
                  }
                />
                <InputGroup
                  containerClassName="col-span-2 sm:col-span-1"
                  label="Country"
                  autoComplete="billing country"
                  {...form.register("invoice.receiver_address.country")}
                  error={
                    form.formState.errors.invoice?.receiver_address?.country &&
                    form.formState.errors.invoice?.receiver_address?.country?.message
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
                  form.formState.errors.invoice?.created_at?.message
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
                  form.formState.errors.invoice?.payment_terms?.message
                }
              />
            </div>
            <InputGroup
              label="Project Description"
              {...form.register("invoice.project_description")}
              error={
                form.formState.errors.invoice?.project_description &&
                form.formState.errors.invoice?.project_description?.message
              }
            />
          </FormSection>
          <FormSection title="Item List">
            <InvoiceItemList
              error={
                form.formState.errors?.invoiceItems && form.formState.errors?.invoiceItems?.message
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
                        {...form.register(`invoiceItems.${index}.name` as const)}
                        error={
                          form.formState.errors?.invoiceItems &&
                          form.formState.errors?.invoiceItems[index] &&
                          form.formState.errors?.invoiceItems[index]?.name?.message
                        }
                      />
                    }
                    quantityField={
                      <InputGroup
                        id={`itemQuantity${index}`}
                        label="Qty"
                        type="number"
                        {...form.register(`invoiceItems.${index}.quantity` as const, {
                          valueAsNumber: true,
                        })}
                        error={
                          form.formState.errors?.invoiceItems &&
                          form.formState.errors?.invoiceItems[index] &&
                          form.formState.errors?.invoiceItems[index]?.quantity?.message
                        }
                      />
                    }
                    priceField={
                      <InputGroup
                        id={`itemPrice${index}`}
                        label="Price"
                        type="number"
                        {...form.register(`invoiceItems.${index}.price` as const, {
                          valueAsNumber: true,
                        })}
                        error={
                          form.formState.errors?.invoiceItems &&
                          form.formState.errors?.invoiceItems[index] &&
                          form.formState.errors?.invoiceItems[index]?.price?.message
                        }
                      />
                    }
                    totalPrice={(
                      form.watch(`invoiceItems.${index}.price`) *
                      form.watch(`invoiceItems.${index}.quantity`)
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
                onClick={() => handleSaveAsDraft(form.getValues())}
                disabled={form.formState.isLoading}
              >
                Save as Draft
              </Button>
              <PrimaryButton
                type="submit"
                ref={props.lastFocusableButtonRef}
                disabled={form.formState.isLoading}
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
