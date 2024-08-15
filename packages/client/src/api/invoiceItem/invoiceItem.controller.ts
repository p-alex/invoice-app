import UnitOfWork from "../UnitOfWork/UnitOfWork";

class InvoiceItemController {
  constructor(private readonly _unitOfWork: UnitOfWork) {}

  deleteOne(id: string) {
    return new Promise((resolve) => {
      resolve(this._unitOfWork.invoiceItem.deleteOne(id));
    });
  }
}

export default InvoiceItemController;
