function useDisableScroll() {
  const disableScroll = () => {
    document.body.style.overflowY = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflowY = "scroll";
  };

  return { disableScroll, enableScroll };
}

export default useDisableScroll;
