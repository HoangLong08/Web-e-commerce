import { LogoNoBg } from "assets/index";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconBars } from "../../assets";
import "./style.css";

function Sidebar({ isSidebar, onSidebar, dataMenu, type }) {
  const { t } = useTranslation(["profile"]);
  const location = useLocation();
  const pathUrl = location && location.pathname;

  const checkUrlActive = (urlOne, urlTwo) => {
    return urlOne.includes(urlTwo.split("/")[3]);
  };

  return (
    <div
      className={
        isSidebar ? `wrapper-sidebar-active` : `wrapper-sidebar-${type}`
      }
    >
      {type !== "client" && ( // reuse component sidebars to client or admin usage
        <div className="sidebar-top">
          <p className="sidebar-logo line-clamp-one">
            <img className="image-logo" src={LogoNoBg} alt="tech store" />
            {/* <span>
              Tech <br /> store
            </span> */}
          </p>
          <div
            className="sidebar-bar"
            onClick={() => {
              onSidebar(!isSidebar);
            }}
          >
            <IconBars />
          </div>
        </div>
      )}
      <div className="sidebar-menu">
        {dataMenu.map((item, index) => {
          return (
            <NavLink
              key={"item-nav-link" + index}
              to={item.link}
              className={({ isActive }) =>
                isActive || checkUrlActive(pathUrl, item.link)
                  ? "menu-item-link-active"
                  : "menu-item-link"
              }
            >
              <div className="item-nav-link">
                <div className="item-nav-link-icon">{item.icon}</div>
                <p className="item-nav-link-title line-clamp-one">
                  {t(item.title)}
                </p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
