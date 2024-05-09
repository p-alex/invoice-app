import NavLogo from "../NavLogo";
import NavbarButton from "../NavbarButton";
import NavbarSection from "../NavbarSection";
import NavbarSectionContainer from "../NavbarSectionContainer";
import NavbarThemeToggle from "../NavbarThemeToggle";

function Navbar() {
  return (
    <nav className="relative md:rounded-tr-nav md:rounded-br-nav h-20 w-full flex justify-between md:h-screen md:w-[103px] md:flex-col bg-uiBgDarkTheme">
      <NavLogo />
      <NavbarSectionContainer>
        <NavbarSection>
          <NavbarThemeToggle />
        </NavbarSection>
        <NavbarSection>
          <NavbarButton aria-label="toggle profile menu">
            <img
              src="./images/image-avatar.jpg"
              className="rounded-[inherit] w-full h-full"
              alt=""
            />
          </NavbarButton>
        </NavbarSection>
      </NavbarSectionContainer>
    </nav>
  );
}

export default Navbar;
