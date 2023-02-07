import React from "react";
import HeadPage from "../components/HeadPage";

function Employee() {
  return (
    <div>
      <HeadPage title="List Employee" actionMenu={<></>} isBack={0} />
      <div className="box-ad-page wrapper-box-admin-page"></div>
    </div>
  );
}

export default Employee;
