import { useCallback, useEffect, useState } from "react";

function useIsWindowSizeLowerThan(size: number) {
  const [isLower, setIsLower] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth < size) {
      setIsLower(true);
    } else {
      setIsLower(false);
    }
  }, [size]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return isLower;
}

export default useIsWindowSizeLowerThan;
