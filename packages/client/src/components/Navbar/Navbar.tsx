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
            <a href="https://github.com/p-alex" target="_blank" className="rounded-[inherit]">
              <img
                src="/images/profile_picture.jpg"
                className="rounded-[inherit]"
                alt=""
                width={80}
                height={80}
              />
            </a>
          </NavbarButton>
        </NavbarSection>
      </NavbarSectionContainer>
    </nav>
  );
}

export default Navbar;
