import React from "react";
import SideModalCloseButton from "./SideModalCloseButton";

interface Props {
  children: React.ReactNode;
  handleCloseModal: () => void;
}

function SideModal({ children, handleCloseModal }: Props) {
  return (
    <div className="fixed left-0 top-0">
      <div
        className="fixed left-0 top-0 z-0 h-full w-full bg-[rgba(0,0,0,0.7)]"
        onClick={handleCloseModal}
        data-testid={"sideModalBackdrop"}
      ></div>
      <div className="fixed left-0 top-0 z-10 mt-[80px] h-[calc(100vh-80px)] w-full max-w-[779px] overflow-y-scroll rounded-br-3xl rounded-tr-3xl bg-modalBgLt px-6 py-8 max-[616px]:rounded-br-none max-[616px]:rounded-tr-none md:mt-0 md:h-screen md:pl-[159px] md:pr-14 dark:bg-modalBgDT">
        {children}
      </div>
    </div>
  );
}

SideModal.CloseButton = SideModalCloseButton;

export default SideModal;
