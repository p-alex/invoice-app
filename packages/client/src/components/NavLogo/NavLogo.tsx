function NavLogo() {
  return (
    <div className="relative w-[80px] h-[80px] md:w-[103px] md:h-[103px] bg-primary rounded-tr-nav rounded-br-nav flex items-center justify-center">
      <img
        className="relative z-[1] shrink-0 w-[31px] h-[31px] md:w-[40px] md:h-[40px]"
        src="./images/logo.svg"
        alt=""
      />
      <div className="absolute bottom-0 left-0 w-full h-[50%] rounded-tl-[20px] rounded-br-[inherit] bg-primaryLight"></div>
      <div></div>
    </div>
  );
}

export default NavLogo;
