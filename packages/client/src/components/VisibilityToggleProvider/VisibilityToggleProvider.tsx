import { useCallback, useEffect, useRef, useState } from "react";
import createRandomId from "../../utils/createRandomId";

interface VisibilityProviderProps {
  toggle: (props: {
    toggleRef: React.RefObject<HTMLButtonElement>;
    handleToggleVisibilty: () => void;
  }) => React.ReactNode;
  content: (props: { handleToggleOffVisibilty: () => void }) => React.ReactNode;
  hideWhenClickOutside?: boolean;
  hideWithEsc?: boolean;
  disableScroll?: boolean;
}

const VisibiltyToggleProvider = (props: VisibilityProviderProps) => {
  const toggleRef = useRef<HTMLButtonElement>(null);

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
    if (props.hideWhenClickOutside) document.addEventListener("click", handleHideWhenClickOutside);
    if (props.hideWithEsc) document.addEventListener("keydown", handleHideWithEsc);

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

  return (
    <div id={"visibilityToggleContainer-" + visibilityToggleContainerId}>
      {props.toggle({ toggleRef, handleToggleVisibilty })}
      {isVisible && props.content({ handleToggleOffVisibilty })}
    </div>
  );
};

export default VisibiltyToggleProvider;
