import { Link, useLocation } from "react-router-dom";
import { navData } from "../../../data";
import "./DesktopNav.css";

const DesktopNav = () => {
  const location = useLocation();

  return (
    <>
      <nav className="Nav">
        <img src="logoImg.png" alt="logoImg" className="logoImg" />

        <ul className="NavMenu">
          {navData.map((items) => (
            <li
              key={items.id}
              className={`NavItem ${
                location.pathname === items.path ? "active" : ""
              }`}
            >
              <Link to={items.path} className="NavLinks">
                {items.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default DesktopNav;

