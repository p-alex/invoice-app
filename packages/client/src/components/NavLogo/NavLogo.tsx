function NavLogo() {
  return (
    <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-br-nav rounded-tr-nav bg-primary md:h-[103px] md:w-[103px]">
      <img
        className="relative z-[1] h-[31px] w-[31px] shrink-0 md:h-[40px] md:w-[40px]"
        src="./images/logo.svg"
        alt=""
      />
      <div className="absolute bottom-0 left-0 h-[50%] w-full rounded-br-[inherit] rounded-tl-[20px] bg-primaryLight"></div>
    </div>
  );
}

export default NavLogo;
