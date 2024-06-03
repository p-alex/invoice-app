interface Props {
  children: React.ReactNode;
}

function NavbarSection({ children }: Props) {
  return (
    <div className="flex aspect-square w-20 items-center justify-center border-l border-[#494E6E] first-of-type:border-none md:h-auto md:w-full md:border-l-0 md:border-t md:first-of-type:border-none">
      {children}
    </div>
  );
}

export default NavbarSection;
