import FeedbackPopupManager from "./FeedbackPopupManager";

const feebackPopupManager = new FeedbackPopupManager();

feebackPopupManager.initialize();

export type DisplayPopupType = typeof feebackPopupManager.displayPopup;

export default feebackPopupManager;
