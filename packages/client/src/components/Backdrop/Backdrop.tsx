interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  func: () => void;
}

function Backdrop({ func, ...divProps }: Props) {
  return (
    <div
      data-testid={"backdrop"}
      {...divProps}
      className="fixed left-0 top-0 z-10 h-full w-full bg-[rgba(0,0,0,0.8)]"
      onClick={func}
    ></div>
  );
}

export default Backdrop;
