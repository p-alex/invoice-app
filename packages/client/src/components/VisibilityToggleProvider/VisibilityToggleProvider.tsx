import { useCallback, useEffect, useRef, useState } from "react";
import createRandomId from "../../utils/createRandomId";
import FocusTrap from "../FocusTrap";
import useDisableScroll from "../../hooks/useDisableScroll";

interface ContentArgs {
  handleToggleOffVisibilty: () => void;
  firstFocusableButtonRef: React.RefObject<HTMLButtonElement>;
  lastFocusableButtonRef: React.RefObject<HTMLButtonElement>;
}

interface VisibilityProviderProps {
  toggle: (props: {
    isVisible: boolean;
    toggleRef: React.RefObject<HTMLButtonElement>;
    handleToggleVisibilty: () => void;
  }) => React.ReactNode;
  content: (props: ContentArgs) => React.ReactNode;
  hideWhenClickOutside?: boolean;
  hideWithEsc?: boolean;
  trapFocus?: boolean;
  disableScroll?: boolean;
}

const VisibiltyToggleProvider = (props: VisibilityProviderProps) => {
  const { enableScroll, disableScroll } = useDisableScroll();

  const toggleRef = useRef<HTMLButtonElement>(null);

  const firstFocusableButtonRef = useRef<HTMLButtonElement>(null);

  const lastFocusableButtonRef = useRef<HTMLButtonElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibilty = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleToggleOffVisibilty = () => {
    setIsVisible(false);
    toggleRef.current?.focus();
  };

  const visibilityToggleContainerId = useRef<string>(createRandomId()).current;

  const handleHideWhenClickOutside = useCallback(
    (event: MouseEvent) => {
      const visibilityToggleContainer = document.getElementById(
        "visibilityToggleContainer-" + visibilityToggleContainerId,
      ) as HTMLDivElement;

      const target = event.target as HTMLElement;

      if (isVisible && !visibilityToggleContainer.contains(target)) {
        handleToggleOffVisibilty();
      }
    },
    [isVisible, visibilityToggleContainerId],
  );

  const handleHideWithEsc = useCallback(
    (event: KeyboardEvent) => {
      const visibilityToggleContainer = document.getElementById(
        "visibilityToggleContainer-" + visibilityToggleContainerId,
      ) as HTMLDivElement;

      const focusedElement = document.activeElement;

      if (
        isVisible &&
        visibilityToggleContainer.contains(focusedElement) &&
        event.key === "Escape"
      ) {
        handleToggleOffVisibilty();
      }
    },
    [isVisible, visibilityToggleContainerId],
  );

  useEffect(() => {
    if (props.hideWhenClickOutside === true)
      document.addEventListener("click", handleHideWhenClickOutside);
    if (props.hideWithEsc === true) document.addEventListener("keydown", handleHideWithEsc);

    return () => {
      document.removeEventListener("click", handleHideWhenClickOutside);
      document.removeEventListener("keydown", handleHideWithEsc);
    };
  }, [
    isVisible,
    handleHideWhenClickOutside,
    handleHideWithEsc,
    props.hideWhenClickOutside,
    props.hideWithEsc,
  ]);

  useEffect(() => {
    if (!props.disableScroll) return;
    isVisible ? disableScroll() : enableScroll();
  }, [isVisible]);

  return (
    <div id={"visibilityToggleContainer-" + visibilityToggleContainerId}>
      {props.toggle({ isVisible, toggleRef, handleToggleVisibilty })}
      {props.trapFocus && isVisible && <FocusTrap element={lastFocusableButtonRef} />}
      {isVisible &&
        props.content({
          handleToggleOffVisibilty,
          firstFocusableButtonRef,
          lastFocusableButtonRef,
        })}
      {props.trapFocus && isVisible && <FocusTrap element={firstFocusableButtonRef} />}
    </div>
  );
};

export default VisibiltyToggleProvider;
