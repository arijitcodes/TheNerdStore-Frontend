import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Context State
import CartState from "./core/context/cartNotification/CartState";

// Components
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategory from "./admin/ManageCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import ManageOrders from "./admin/ManageOrders";
import UpdateOrder from "./admin/UpdateOrder";
import Orders from "./core/Orders";

const Routes = () => {
  return (
    <CartState>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/orders" exact component={Orders} />
          <PrivateRoutes
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <AdminRoutes
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoutes
            path="/admin/create/category"
            exact
            component={AddCategory}
          />
          <AdminRoutes
            path="/admin/categories"
            exact
            component={ManageCategory}
          />
          <AdminRoutes
            path="/admin/category/update/:categoryId"
            exact
            component={UpdateCategory}
          />
          <AdminRoutes
            path="/admin/create/product"
            exact
            component={AddProduct}
          />
          <AdminRoutes
            path="/admin/products"
            exact
            component={ManageProducts}
          />
          <AdminRoutes
            path="/admin/product/update/:productId"
            exact
            component={UpdateProduct}
          />
          <AdminRoutes path="/admin/orders" exact component={ManageOrders} />
          <AdminRoutes
            path="/admin/order/update/:orderId"
            exact
            component={UpdateOrder}
          />
        </Switch>
      </Router>
    </CartState>
  );
};

export default Routes;
