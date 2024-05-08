interface Props {
  children: React.ReactNode;
}

function NavbarSectionContainer({ children }: Props) {
  return <div className="flex md:flex-col">{children}</div>;
}

export default NavbarSectionContainer;
