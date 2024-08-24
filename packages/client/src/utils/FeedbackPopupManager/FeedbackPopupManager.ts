class FeedbackPopupManager {
  readonly listId: string;
  private _removeDuration: number;
  private _popupList: HTMLUListElement | null;

  constructor() {
    this._removeDuration = 4000;
    this.listId = "feedback-popup-list";
    this._popupList = null;
    this.displayPopup = this.displayPopup.bind(this);
  }

  initialize() {
    if (!this._popupList) {
      this._popupList = document.createElement("ul");
      this._popupList.setAttribute("aria-live", "polite");
      this._popupList.id = this.listId;
      this._popupList.classList.add("flex", "flex-column", "gap-2");
      document.body.appendChild(this._popupList);
    }
  }

  displayPopup(message: string) {
    if (!this._popupList) {
      throw new Error('Popup list is not initialized. Call "initialize" before displaying popups.');
    }

    const popup = this.createPopup(message);
    this._popupList.appendChild(popup);
    this.removePopup(popup);
  }

  setRemoveDuration(timeInMs: number) {
    this._removeDuration = timeInMs;
  }

  cleanup() {
    if (this._popupList) {
      this._popupList.remove();
      this._popupList = null;
    }
  }

  private removePopup(popup: Element) {
    setTimeout(() => {
      if (popup.parentElement) {
        popup.remove();
      }
    }, this._removeDuration);
  }

  private createPopup(message: string) {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "fixed",
      "top-[16px]",
      "right-[16px]",
      "py-2",
      "px-4",
      "rounded-md",
      "bg-uiBgLT",
      "dark:bg-uiBgDT",
      "text-textLT",
      "dark:text-textDT",
      "shadow-md",
    );
    listItem.innerText = message;
    return listItem;
  }
}

export default FeedbackPopupManager;
