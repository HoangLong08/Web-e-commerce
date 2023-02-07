import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Button, Input, Popover, Badge, Select, Space, Image } from "antd";
import {
  Link,
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import { IconUserRegular, IconCartRegular } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "store/auth/auth.reducer";
import { isEmpty } from "lodash";
import { IconFacebook, IconPhone, Logo, Notification } from "assets/index";
import { useTranslation } from "react-i18next";
import { locales } from "i18n/i18n";
import { BarsOutlined, CloseOutlined } from "@ant-design/icons";
import PlayerLoti from "layouts/Player";
import "./style.css";

const { Search } = Input;
const { Option } = Select;

const categories = [
  {
    title: "Điên thoại",
    image: <IconPhone />,
    list: [
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
    ],
  },
  {
    title: "Lap top",
    image: <IconPhone />,
    list: [
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
    ],
  },
  {
    title: "PC - Máy tính bộ",
    image: <IconPhone />,
  },
  {
    title: "PC - Màn hình máy tính",
    image: <IconPhone />,
  },
  {
    title: "PC - Linh kiện máy tính",
    image: <IconPhone />,
  },
  {
    title: "PC - Phụ kiên",
    image: <IconPhone />,
  },
  {
    title: "Máy tính bảng",
    image: <IconPhone />,
  },
  {
    title: "Thiết bị âm thanh",
    image: <IconPhone />,
  },
  {
    title: "Thiết bị văn phòng",
    image: <IconPhone />,
  },
  {
    title: "Thiết bị văn phòng",
    image: <IconPhone />,
  },
  {
    title: "Thiết bị văn phòng",
    image: <IconPhone />,
  },
];

const getQueryParams = (query) =>
  window.location.search
    .replace("?", "")
    .split("&")
    .map((e) => e.split("=").map(decodeURIComponent))
    // eslint-disable-next-line no-sequences
    .reduce((r, [k, v]) => ((r[k] = v), r), {});

function HeaderClient() {
  const divHeader = useRef();
  const divPosition = useRef();
  // useTranslation(["ns1", "ns2", ...])
  const { t, i18n } = useTranslation("header");
  // i18n.language: get current language of website
  const currentLanguage = locales.find((item) => item.key === i18n.language);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paramFromUrl = getQueryParams(location.search);
  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const shoppingCart = useSelector(
    (state) => state.shoppingCartSlice.shoppingCart
  );
  const [open, setOpen] = useState(false);
  const [isOpenCategoryProduct, setIsOpenCategoryProduct] = useState(false);
  const [valueInput, setValueInput] = useState("");
  useEffect(() => {
    if (paramFromUrl.keyword) {
      setValueInput(paramFromUrl?.keyword?.replace("+", " ") || "");
    } else {
      setValueInput("");
    }
  }, [paramFromUrl?.keyword]);

  useLayoutEffect(() => {
    // const divAnimate = divPosition.current.getBoundingClientRect().top;
    const onScroll = () => {
      if (0 < window.scrollY) {
        divPosition.current.style.marginTop = "-34px";
        divPosition.current.style.transition = "margin-top 100ms ease-in-out";
        divHeader.current.style.height = "80px";
        divHeader.current.style.backgroundColor = "white";
        divHeader.current.style.transition =
          "background-color 100ms ease-in-out";
      } else {
        divPosition.current.style.marginTop = "0px";
        divPosition.current.style.transition = "margin-top 100ms ease-in-out";
        divHeader.current.style.height = "114px";
        divHeader.current.style.backgroundColor = "white";
        divHeader.current.style.transition =
          "background-color 100ms ease-in-out";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onChange = (e) => {
    setValueInput(e.target.value);
  };

  const onSearch = (value) => {
    if (value.length > 0) {
      navigate({
        pathname: "/catalog",
        search: `?${createSearchParams({
          keyword: value,
        })}`,
      });
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(removeAuth({}));
  };

  const changeLanguageHandler = (e) => {
    i18n.changeLanguage(e);
    localStorage.setItem("lang", e);
  };

  return (
    <header className="wrapper-header" ref={divHeader}>
      <div className="container">
        <div className="nav-bar" ref={divPosition}>
          <Space>
            <p>{t("follow us")}</p>
            <span>{<IconFacebook />}</span>
          </Space>
          <Space>
            <p>{t("call to buy")}: 0389999999</p>
            <Select
              style={{ width: 120 }}
              value={currentLanguage?.key}
              onChange={changeLanguageHandler}
              size="small"
            >
              {locales.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Space>
        </div>
        <div className="header-main wrapper-header-position">
          <Space>
            <Link to="/">
              <img className="image-logo" alt="tech store" src={Logo} />
            </Link>
            <div className="wrapper-category">
              <Button
                icon={
                  isOpenCategoryProduct ? <CloseOutlined /> : <BarsOutlined />
                }
                onClick={() => {
                  setIsOpenCategoryProduct(!isOpenCategoryProduct);
                }}
              >
                {t("category product")}
              </Button>
            </div>
          </Space>

          <div className="ui-search-body">
            <Search
              placeholder={t("placeholder search")}
              className="wrapper-big-search"
              enterButton={t("search")}
              size="large"
              loading={false}
              onSearch={onSearch}
              value={valueInput || ""}
              onChange={onChange}
            />
          </div>
          <div className="header-menu">
            {!isEmpty(authSlice) ? (
              <Popover
                overlayClassName="tooltip-header-icon-user"
                content={
                  <>
                    <Button
                      onClick={() => {
                        navigate("/profile/personal");
                      }}
                      type="link"
                      block
                    >
                      {t("account information")}
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/profile/orders");
                      }}
                      type="link"
                      style={{ marginBottom: "4px" }}
                      block
                    >
                      {t("order management")}
                    </Button>
                    <Button
                      onClick={() => {
                        handleLogout();
                      }}
                      block
                      type="primary"
                    >
                      {t("log out")}
                    </Button>
                  </>
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <div className="header-cart header-item">
                  <div className="wrapper-icon-cart">
                    <IconUserRegular className="icon-user" />
                  </div>
                  <span className="text-icon-cart">{authSlice?.username}</span>
                </div>
              </Popover>
            ) : (
              <div
                className="header-auth"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <IconUserRegular className="icon-user" />
                <span className="text-icon-user">
                  {t("sign in")}
                  <br />
                  {t("log in")}
                </span>
              </div>
            )}
            <div
              className="header-cart header-item"
              onClick={() => {
                navigate("/cart");
              }}
              style={{ textAlign: "center" }}
            >
              <Badge count={shoppingCart.length}>
                <div className="wrapper-icon-cart">
                  <IconCartRegular className="icon-cart" />
                </div>
                <span className="text-icon-cart">{t("cart")}</span>
              </Badge>
            </div>
            <div
              className="header-cart header-item"
              style={{ textAlign: "center" }}
            >
              <Badge count={0}>
                <div className="wrapper-icon-cart">
                  <PlayerLoti
                    src={Notification}
                    className="icon-cart"
                    hover={true}
                    autoplay={false}
                  />
                </div>
                <span className="text-icon-cart">{t("notifications")}</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`wrapper-dialog-category ${
          isOpenCategoryProduct
            ? "wrapper-dialog-category-display"
            : "wrapper-dialog-category-no-display"
        }`}
      >
        <div className="container content-dialog-category">
          <div className="category-sidebar-container">
            {categories.map((item, index) => {
              return (
                <div
                  className="item-dialog-category"
                  key={`item-dialog-category-` + index}
                >
                  <Image
                    src="https://media-api-beta.thinkpro.vn/media/core/categories/2021/12/29/Rectangle%201461.png"
                    width={64}
                    preview={false}
                  />
                  <p className="text-name-category">{item.title}</p>
                </div>
              );
            })}
          </div>
          <div className="category-main"></div>
        </div>
      </div>
    </header>
  );
}

export default HeaderClient;
