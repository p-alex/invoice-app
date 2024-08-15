import React from "react";

const FocusTrap = ({ redirectTo }: { redirectTo: React.RefObject<HTMLElement> }) => {
  const handleRedirect = () => {
    redirectTo.current?.focus();
  };

  return <div tabIndex={0} onFocus={handleRedirect} style={{ position: "absolute" }}></div>;
};

export default FocusTrap;
