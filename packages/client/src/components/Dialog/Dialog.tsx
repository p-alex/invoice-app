import { Button } from "../../ui";
import Backdrop from "../Backdrop/Backdrop";

interface Props {
  title: string;
  description: string;
  closeFunc: () => void;
  actionBtn: React.ReactNode;
  cancelBtnRef: React.RefObject<HTMLButtonElement>;
}

function Dialog({ title, description, closeFunc, actionBtn, cancelBtnRef }: Props) {
  return (
    <>
      <Backdrop func={closeFunc} />
      <div
        role="dialog"
        className="fixed left-0 right-0 top-[50%] z-50 mx-auto flex w-full max-w-[480px] translate-y-[-50%] flex-col gap-3 rounded-uiBorderRadius bg-uiBgLT p-8 dark:bg-uiBgDT"
      >
        <h2 className="text-2xl font-bold text-textLT dark:text-textDT">{title}</h2>
        <p className="text-sm text-muted">{description}</p>
        <div className="flex justify-end gap-2">
          <Button ref={cancelBtnRef} onClick={closeFunc} autoFocus>
            Cancel
          </Button>
          {actionBtn}
        </div>
      </div>
    </>
  );
}

export default Dialog;
