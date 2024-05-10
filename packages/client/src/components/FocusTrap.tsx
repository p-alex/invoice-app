import React from "react";

const FocusTrap = ({ element }: { element: React.RefObject<HTMLElement> }) => {
  const handleRedirect = () => {
    element.current?.focus();
  };

  return <div tabIndex={0} onFocus={handleRedirect} style={{ position: "absolute" }}></div>;
};

export default FocusTrap;
