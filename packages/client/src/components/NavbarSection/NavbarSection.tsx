interface Props {
  children: React.ReactNode;
}

function NavbarSection({ children }: Props) {
  return (
    <div className="border-l first-of-type:border-none h-full w-auto md:h-auto md:w-full md:border-l-0 md:border-t border-borderDark flex items-center justify-center aspect-square md:first-of-type:border-none">
      {children}
    </div>
  );
}

export default NavbarSection;
