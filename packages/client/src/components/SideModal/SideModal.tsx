import React from "react";
import { CloseIcon } from "../../svgs";

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  closeButtonRef: React.Ref<HTMLButtonElement>;
  handleCloseModal: () => void;
}

const SideModal = ({ children, title, handleCloseModal, closeButtonRef }: Props) => {
  return (
    <div className="fixed left-0 top-0 z-10">
      <div
        className="fixed left-0 top-0 z-0 h-full w-full bg-[rgba(0,0,0,0.7)]"
        onClick={handleCloseModal}
        data-testid={"sideModalBackdrop"}
      ></div>
      <div className="fixed left-0 top-0 z-10 mt-20 h-[calc(100vh-80px)] w-full max-w-[779px] overflow-y-scroll rounded-br-3xl rounded-tr-3xl bg-modalBgLt px-6 py-8 max-[616px]:rounded-br-none max-[616px]:rounded-tr-none md:mt-0 md:h-screen md:pl-[159px] md:pr-14 dark:bg-modalBgDT">
        <header className="mb-12 flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold text-textLT dark:text-textDT">{title}</h2>
          <button
            className="text-textLT dark:text-textDT"
            aria-label={`Close ${title} modal`}
            onClick={handleCloseModal}
            ref={closeButtonRef}
          >
            <CloseIcon />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default SideModal;
