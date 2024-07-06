import { useEffect } from "react";

function useDisableScroll() {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return null;
}

export default useDisableScroll;
