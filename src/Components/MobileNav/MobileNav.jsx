import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion as Motion, AnimatePresence } from "framer-motion";

import { navData } from "../../../data";
import "./MobileNav.css";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="MobileNav">
      <div className="MobileNavHeader">
        <img src="/logoImg.png" alt="logoImg" className="logoImg" />
        <button
          className="HamburgerBtn"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <IoCloseOutline size={23} style={{ strokeWidth: 1 }} />
          ) : (
            <RxHamburgerMenu size={18} style={{ strokeWidth: 1 }} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <Motion.ul
            className="MobileMenu"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {navData.map((items, index) => (
              <Motion.li
                key={index}
                className={
                  location.pathname === items.path
                    ? "active MobileLinkItem"
                    : "MobileLinkItem"
                }
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={items.path} className="MobileNavLink">
                  {items.title}
                </Link>
              </Motion.li>
            ))}
          </Motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNav;
