import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./style.css";

const footers = [
  {
    title: "customer support",
    content: [
      {
        title: "preferential card",
        link: "/",
      },
      {
        title: "service center",
        link: "/",
      },
    ],
  },
  {
    title: "purchase policy and warranty",
    content: [
      {
        title: "general rules",
        link: "/",
      },
      {
        title: "information privacy policy",
        link: "/",
      },
      {
        title: "shipping and Installation Policy",
        link: "/",
      },
      {
        title: "warranty Policy",
        link: "/",
      },
      {
        title: "refund policy",
        link: "/",
      },
    ],
  },
  {
    title: "company information",
    content: [
      {
        title: "introduce",
        link: "/",
      },
      {
        title: "contact Info",
        link: "/",
      },
      {
        title: "q&A",
        link: "/",
      },
      {
        title: "tech news",
        link: "/",
      },
    ],
  },
  {
    title: "community",
    content: [
      {
        title: "Gọi mua hàng 0999999",
        link: "/",
      },
      {
        title: "Gọi chăm sóc 09999999",
        link: "/",
      },
    ],
  },
  {
    title: "contact email",
    content: [
      {
        title: "customer support",
        link: "/",
      },
      {
        title: "Gọi chăm sóc 09999999",
        link: "/",
      },
    ],
  },
];

function Footer() {
  const { t } = useTranslation("footer");
  return (
    <footer className="wrapper-footer">
      <div className="container">
        <div className="footer-list-item">
          {footers.map((itemMain, index) => {
            return (
              <div key={"footer-main-" + index}>
                <p className="footer-title-main">{t(itemMain.title)}</p>
                {itemMain.content.map((itemSub, indexSub) => {
                  return (
                    <Link to={itemSub.link} key={"footer-sub-" + indexSub}>
                      <p className="footer-title-sub">{t(itemSub.title)}</p>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="ui-footer-copyright">....</div>
      </div>
    </footer>
  );
}

export default Footer;
