import LoginAdmin from "../pages/Auth/LoginAdmin";
import Dashboard from "../pages/Admin/Dashboard";
// import Analyst from "../pages/Admin/Analyst";
import Product from "../pages/Admin/Product";
import AddProduct from "../pages/Admin/Product/Add";
import Category from "../pages/Admin/Category";
import Order from "pages/Admin/Order/index";
import Customer from "pages/Admin/Customer/index";
import EditProduct from "pages/Admin/Product/Edit";
import NotFound from "pages/Error/NotFound";
import Role from "pages/Admin/Role/index";
import Employee from "pages/Admin/Employee/index";

const privateRoutes = [
  { path: "/management/admin/login", component: LoginAdmin, layout: null },
  { path: "/management/admin/dashboard", component: Dashboard },
  // { path: "/management/admin/analyst", component: Analyst },
  { path: "/management/admin/products", component: Product },
  { path: "/management/admin/products/add-product", component: AddProduct },
  {
    path: "/management/admin/products/edit-product/:idProduct",
    component: EditProduct,
  },
  { path: "/management/admin/categories", component: Category },
  { path: "/management/admin/roles", component: Role },
  { path: "/management/admin/employees", component: Employee },
  { path: "/management/admin/orders", component: Order },
  { path: "/management/admin/customers", component: Customer },
  { path: "*", component: NotFound, layout: null },
  { path: "/404", component: NotFound, layout: null },
];

export { privateRoutes };
