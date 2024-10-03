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
      this._popupList.classList.add(
        "fixed",
        "bottom-[16px]",
        "right-[16px]",
        "sm:bottom-auto",
        "sm:top-[16px]",
        "flex",
        "flex-col",
        "gap-2",
        "z-[1000]",
      );
      document.body.appendChild(this._popupList);
    }
  }

  displayPopup(message: string) {
    if (!this._popupList) {
      throw new Error('Popup list is not initialized. Call "initialize" before displaying popups.');
    }

    const popup = this.createPopup(message);
    this._popupList.prepend(popup);
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
      "flex",
      "items-center",
      "gap-2",
      "border",
      "border-primary",
      "py-2",
      "px-4",
      "rounded-md",
      "bg-uiBgLT",
      "dark:bg-uiBgDT",
      "text-textLT",
      "dark:text-textDT",
      "shadow-md",
    );

    const infoSvg = document.createElement("img");
    infoSvg.src = "/images/info-icon.svg";
    infoSvg.width = 24;
    infoSvg.height = 24;

    const paragraph = document.createElement("p");
    paragraph.innerText = message;

    const closeButton = document.createElement("button");
    closeButton.classList.add(
      "w-6",
      "h-6",
      "flex",
      "items-center",
      "justify-center",
      "close-popup-button",
    );
    closeButton.setAttribute("aria-label", "close popup");
    const closeButtonIcon = document.createElement("img");
    closeButtonIcon.src = "/images/close-icon.svg";
    closeButtonIcon.width = 24;
    closeButtonIcon.height = 24;
    closeButtonIcon.alt = "";
    closeButton.addEventListener("click", () => listItem.remove());
    closeButton.appendChild(closeButtonIcon);

    listItem.appendChild(infoSvg);
    listItem.appendChild(paragraph);
    listItem.appendChild(closeButton);

    return listItem;
  }
}

export default FeedbackPopupManager;
