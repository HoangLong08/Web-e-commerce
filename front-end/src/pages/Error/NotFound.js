import { Button } from "antd";
import { Notfound } from "assets/index";
import PlayerLoti from "layouts/Player/index";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./style.css";

function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation("notfound");
  const location = useLocation();
  console.log("location: ", location);

  return (
    <div className="wrapper-not-found">
      {/* <h1>404</h1> */}
      <PlayerLoti
        src={Notfound}
        autoplay={true}
        style={{ width: "400px", height: "400px" }}
      />
      <p>{t("text")}</p>
      <Button
        type="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        {t("back")}
      </Button>
    </div>
  );
}

export default NotFound;
