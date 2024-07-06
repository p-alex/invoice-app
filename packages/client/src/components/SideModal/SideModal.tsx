import React, { useRef } from "react";
import useDisableScroll from "../../hooks/useDisableScroll";
import { ChevronLeft } from "../../svgs";
import FocusTrap from "../FocusTrap";

interface Props {
  render: (lastFocusableButtonRef: React.RefObject<HTMLButtonElement>) => React.ReactNode;
  handleCloseModal: () => void;
}

function SideModal({ render, handleCloseModal }: Props) {
  useDisableScroll();

  const firstFocusableButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusableButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="fixed left-0 top-0">
      <div
        className="fixed left-0 top-0 z-0 h-full w-full bg-[rgba(0,0,0,0.7)]"
        onClick={handleCloseModal}
      ></div>
      <div className="fixed left-0 top-0 z-10 mt-[80px] h-[calc(100vh-80px)] w-full max-w-[779px] overflow-y-scroll rounded-br-3xl rounded-tr-3xl bg-modalBgLt px-6 py-8 max-[616px]:rounded-br-none max-[616px]:rounded-tr-none md:mt-0 md:h-screen md:pl-[159px] md:pr-14 dark:bg-modalBgDT">
        <FocusTrap element={lastFocusableButtonRef} />
        <button
          className="mb-6 flex items-center gap-6 py-1 font-bold text-textLT dark:text-textDT"
          onClick={handleCloseModal}
          ref={firstFocusableButtonRef}
        >
          <ChevronLeft /> Go back
        </button>
        {render(lastFocusableButtonRef)}
        <FocusTrap element={firstFocusableButtonRef} />
      </div>
    </div>
  );
}

export default SideModal;
