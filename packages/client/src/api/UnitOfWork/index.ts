import UnitOfWork from "./UnitOfWork";
import LocalStorage from "../LocalStorage";

const localStorage = new LocalStorage();

const unitOfWork = new UnitOfWork(localStorage);

export default unitOfWork;
