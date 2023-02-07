import HomePage from "../pages/Home";
import LoginUserPage from "../pages/Auth/LoginUser";
import RegisterUserPage from "../pages/Auth/RegisterUser";
import ForgotPasswordPage from "../pages/Auth/ForgotPassword";
import DetailProduct from "pages/Detail/index";
import SearchPage from "pages/Search/index";
import Cart from "pages/Cart/index";
import CheckOut from "pages/Checkout/index";
import PaymentSuccess from "pages/Checkout/PaymentSuccess";
import InfoPersonal from "pages/Profile/InfoPersonal";
import Orders from "pages/Profile/Orders";
import ChangePassword from "pages/Profile/ChangePassword";
import DetailOrder from "pages/Profile/DetailOrder";
import NotFound from "pages/Error/NotFound";

const publicRoutes = [
  { path: "/", page: HomePage },
  { path: "/login", page: LoginUserPage, layout: null },
  { path: "/register", page: RegisterUserPage, layout: null },
  { path: "/forgot-password", page: ForgotPasswordPage, layout: null },
  { path: "/catalog", page: SearchPage },
  { path: "/:category/:nameProduct", page: DetailProduct },
  { path: "/cart", page: Cart },
  // { path: "/category/:nameCategory", page: ProductPage },
  { path: "/profile/personal", page: InfoPersonal },
  { path: "/profile/orders", page: Orders },
  { path: "/profile/change-password", page: ChangePassword },
  { path: "/profile/orders/:idOrder", page: DetailOrder },
  { path: "/checkout", page: CheckOut },
  { path: "/checkout/payment-success", page: PaymentSuccess },
  { path: "*", page: NotFound },
  { path: "/404", page: NotFound },
];

export { publicRoutes };
