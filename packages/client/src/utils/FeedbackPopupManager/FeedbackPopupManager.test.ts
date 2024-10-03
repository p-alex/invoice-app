import FeedbackPopupManager from "./FeedbackPopupManager";

describe("FeedbackPopupManager", () => {
  let feedbackManager: FeedbackPopupManager;

  beforeEach(() => {
    feedbackManager = new FeedbackPopupManager();
    document.body.innerHTML = "";
  });

  it("should initialize the feedback popup list in the DOM with correct attributes", () => {
    feedbackManager.initialize();

    const popupList = document.getElementById(feedbackManager.listId) as HTMLUListElement;

    expect(popupList).not.toBeNull();
    expect(popupList.tagName).toBe("UL");
    expect(popupList.getAttribute("aria-live")).toBe("polite");
  });

  it("should not create another list if already initialized", () => {
    feedbackManager.initialize();
    feedbackManager.initialize();

    const popupLists = document.querySelectorAll(`#${feedbackManager.listId}`);

    expect(popupLists.length).toBe(1);
  });

  it("should display a popup with the correct message", () => {
    feedbackManager.initialize();
    feedbackManager.displayPopup("Test message");

    const popupList = document.getElementById(feedbackManager.listId) as HTMLUListElement;
    const popup = popupList.querySelector("li") as HTMLLIElement;
    const popupMessage = popup.querySelector("p") as HTMLParagraphElement;

    expect(popup).not.toBeNull();
    expect(popupMessage.innerText).toBe("Test message");
  });

  it("should remove the popup after the default duration", () => {
    jest.useFakeTimers();
    feedbackManager.initialize();
    feedbackManager.displayPopup("Test message");

    const popupList = document.getElementById(feedbackManager.listId) as HTMLUListElement;
    let popup = popupList.querySelector("li");

    expect(popup).not.toBeNull();

    jest.advanceTimersByTime(4000);

    popup = popupList.querySelector("li");

    expect(popup).toBeNull();
  });

  it("should remove the popup after a custom duration", () => {
    jest.useFakeTimers();
    feedbackManager.setRemoveDuration(2000);
    feedbackManager.initialize();
    feedbackManager.displayPopup("Test message");

    const popupList = document.getElementById(feedbackManager.listId) as HTMLUListElement;
    let popup = popupList.querySelector("li");

    expect(popup).not.toBeNull();

    jest.advanceTimersByTime(2000);

    popup = popupList.querySelector("li");

    expect(popup).toBeNull();
  });

  it("should remove popup if 'close popup' button is clicked", () => {
    feedbackManager.initialize();

    feedbackManager.displayPopup("hello");

    const popupList = document.getElementById(feedbackManager.listId);

    const closeButton = document.querySelector(".close-popup-button") as HTMLButtonElement;

    closeButton.click();

    expect(closeButton).not.toBeNull();

    expect(popupList?.children.length).toBe(0);
  });
});
