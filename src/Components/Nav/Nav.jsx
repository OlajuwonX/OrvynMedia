import DesktopNav from "../DesktopNav/DesktopNav";
import MobileNav from "../MobileNav/MobileNav";
import useMediaQuery from "../Hooks/useMediaQuery";

const Nav = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <div>{isMobile ? <MobileNav /> : <DesktopNav />}</div>;
};

export default Nav;
