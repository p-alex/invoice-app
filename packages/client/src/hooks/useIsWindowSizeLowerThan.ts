import { useCallback, useEffect, useRef, useState } from "react";

function useIsWindowSizeLowerThan(size: number) {
  const [isLower, setIsLower] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth < size) {
      setIsLower(true);
    } else {
      setIsLower(false);
    }
  }, [size]);

  const renderCount = useRef<number>(0);

  useEffect(() => {
    if (renderCount.current === 0) handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      renderCount.current = renderCount.current + 1;
    };
  }, [handleResize]);

  return isLower;
}

export default useIsWindowSizeLowerThan;
