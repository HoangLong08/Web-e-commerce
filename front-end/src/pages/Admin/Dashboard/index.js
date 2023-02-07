import { Col, Row, Space, Spin } from "antd";
import React from "react";
import {
  DollarCircleOutlined,
  UserOutlined,
  TagOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "./style.css";
import { formatCash } from "../../../utils";
import HeadPage from "../components/HeadPage";
import Chart from "chart.js/auto";
import { CategoryScale, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDashboardAction } from "store/dashboard/dashboard.action";
import { useNavigate } from "react-router-dom";

Chart.register(CategoryScale, ArcElement, Tooltip, Legend);

const random_bg_color = () => {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var a = Math.random();
  var bgColor = "rgb(" + x + "," + y + "," + z + "," + a.toFixed(1) + ")";

  return bgColor;
};

const labels = ["January", "February", "March"];
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboardSlice.dashboard);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Số người đặt hàng theo tháng",
        data: dashboard?.data?.data?.getOrderByMonth?.map((item) =>
          parseInt(item.value)
        ),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Số người dùng mỗi tháng",
        data: dashboard?.data?.data?.getUserByMonth?.map((item) =>
          parseInt(item.value)
        ),
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const dataPie = {
    labels:
      dashboard?.data?.data?.categories?.rows?.map((item) => item.name) || [],
    datasets: [
      {
        label: "# of Votes",
        data:
          dashboard?.data?.data?.categories?.rows?.map(
            (item) => item?.Products?.length
          ) || [],
        backgroundColor: dashboard?.data?.data?.categories?.rows?.map((item) =>
          random_bg_color()
        ),
        borderColor: dashboard?.data?.data?.categories?.rows?.map((item) =>
          random_bg_color()
        ),
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch(getDashboardAction(navigate));
  }, [dispatch]);

  return (
    <>
      <Spin spinning={dashboard.load}>
        <HeadPage title="Dashboard" actionMenu={<></>} isBack={0} />
        <Row
          gutter={[8, 8]}
          style={{
            marginLeft: "0px",
            marginRight: "0px",
            marginBottom: "12px",
          }}
        >
          <Col md={6}>
            <div className="box-ad-page d-flex">
              <div className="box-head-dashboard box-head-dashboard-sales">
                <DollarCircleOutlined />
              </div>
              <div>
                <p className="box-head-dashboard-title">Tổng số doanh thu</p>
                <p className="box-head-dashboard-number">
                  {formatCash(
                    dashboard?.data?.data?.totalRevenue?.[0]?.total_amount
                  )}
                </p>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="box-ad-page d-flex">
              <div className="box-head-dashboard box-head-dashboard-customer">
                <UserOutlined />
              </div>
              <div>
                <p className="box-head-dashboard-title">Tổng số người dùng</p>
                <p className="box-head-dashboard-number">
                  {dashboard?.data?.data?.users?.count}
                </p>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="box-ad-page d-flex">
              <div className="box-head-dashboard box-head-dashboard-product">
                <TagOutlined />
              </div>
              <div>
                <p className="box-head-dashboard-title">Tổng số sản phẩm</p>
                <p className="box-head-dashboard-number">
                  {dashboard?.data?.data?.products?.count}
                </p>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="box-ad-page d-flex">
              <div className="box-head-dashboard box-head-dashboard-order">
                <ProfileOutlined />
              </div>
              <div>
                <p className="box-head-dashboard-title">Tổng số đơn hàng</p>
                <p className="box-head-dashboard-number">
                  {dashboard?.data?.data?.orders?.count}
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Line data={data} />
        <div
          style={{
            height: "400px",
            position: "relative",
            marginBottom: "1%",
            padding: "1%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pie data={dataPie} />
        </div>
      </Spin>
    </>
  );
}

export default Dashboard;
