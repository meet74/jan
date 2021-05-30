import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import AddProduct from "pages/AddProduct";
import UpDelProduct from "pages/UpDelProduct";
import ChangeBanner from "pages/ChangeBanner";
import CreateCategory from "pages/CreateCategory";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Add Admin",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/addProduct",
    name: "Add Product",
    icon: "content_paste",
    component: AddProduct,
    layout: "/admin",
  },
  {
    path: "/upDelProudct",
    name: "Update & Delete Product",
    icon: "content_paste",
    component: UpDelProduct,
    layout: "/admin",
  },
  {
    path: "/banner",
    name: "Change Banner",
    icon: "content_paste",
    component: ChangeBanner,
    layout: "/admin",
  },
  {
    path: "/createCategory",
    name: "Create Category",
    icon: "content_paste",
    component: CreateCategory,
    layout: "/admin",
  },
];

export default dashboardRoutes;
