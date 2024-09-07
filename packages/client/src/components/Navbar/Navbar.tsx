import NavLogo from "../NavLogo";
import NavbarButton from "../NavbarButton";
import NavbarSection from "../NavbarSection";
import NavbarSectionContainer from "../NavbarSectionContainer";
import NavbarThemeToggle from "../NavbarThemeToggle";

function Navbar() {
  return (
    <nav className="fixed z-50 flex h-20 w-full justify-between bg-uiBgDT md:fixed md:left-0 md:top-0 md:h-screen md:w-[103px] md:flex-col md:rounded-br-nav md:rounded-tr-nav">
      <NavLogo />
      <NavbarSectionContainer>
        <NavbarSection>
          <NavbarThemeToggle />
        </NavbarSection>
        <NavbarSection>
          <NavbarButton aria-label="toggle profile menu">
            <img
              src="/images/image-avatar.jpg"
              className="h-full w-full rounded-[inherit]"
              alt=""
            />
          </NavbarButton>
        </NavbarSection>
      </NavbarSectionContainer>
    </nav>
  );
}

export default Navbar;
