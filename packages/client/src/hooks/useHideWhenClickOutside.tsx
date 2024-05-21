import { useCallback, useEffect } from "react";

interface Props {
  containerRef: React.RefObject<HTMLElement>;
  hideFunc: () => void;
}

function useHideWhenClickOutside({ containerRef, hideFunc }: Props) {
  const handleCloseWhenClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(event.target as HTMLElement)) hideFunc();
    },
    [hideFunc, containerRef],
  );

  useEffect(() => {
    document.addEventListener("click", handleCloseWhenClickOutside);

    return () => {
      document.removeEventListener("click", handleCloseWhenClickOutside);
    };
  }, [handleCloseWhenClickOutside]);

  return null;
}

export default useHideWhenClickOutside;
