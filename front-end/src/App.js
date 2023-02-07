import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";
import { privateRoutes, publicRoutes } from "./routes";
import LayoutProfile from "./layouts/LayoutProfile";
import "./assets/fonts/Nunito_Sans/NunitoSans-Black.ttf";
import "antd/dist/reset.css";
import "./i18n/i18n";
import { createBrowserHistory } from "history";
import CustomRouter from "./CustomRouter";

const history = createBrowserHistory();

export const rootNavigate = (to) => {
  history.push(to);
};

function App() {
  return (
    <CustomRouter history={history}>
      {/* <Router> */}
      <Routes>
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout === null ? Fragment : LayoutAdmin;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {publicRoutes.map((route, index) => {
          const Page = route.page;
          const Layout = route.layout === null ? Fragment : LayoutClient;
          return (
            <Route
              key={"public-route" + index}
              path={route.path}
              element={
                <Layout>
                  {route.path.includes("profile") ? (
                    <LayoutProfile>
                      <Page />
                    </LayoutProfile>
                  ) : (
                    <Page />
                  )}
                </Layout>
              }
            />
          );
        })}
      </Routes>
      {/* </Router> */}
    </CustomRouter>
  );
}

export default App;
