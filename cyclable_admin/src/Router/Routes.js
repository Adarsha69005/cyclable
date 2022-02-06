import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from '../Components/Error/NotFound';
import SignInAdmin from '../Components/SignInRegister/SignInAdmin';
import RegisterAdmin from '../Components/SignInRegister/RegisterAdmin';
import Dashboard from '../Components/Dashboard/Dashboard';
import Product from '../Components/Product/Product';
import AddProduct from '../Components/Product/AddProduct';
import UserList from '../Components/UserList/UserList';
import UserInfo from '../Components/UserList/UserInfo';
import ProductInfo from '../Components/Product/ProductInfo';
import Profile from '../Components/UserList/profile';



export default () =>
  <Switch>
    <Route path="/" exact component={RegisterAdmin} />
    <Route path="/signin" exact component={SignInAdmin} />
    <ProtectedRoutes path="/dashboard" exact component={Dashboard} />
    <ProtectedRoutes path="/product" exact component={Product} />
    <ProtectedRoutes path="/profile" exact component={Profile} />
    <ProtectedRoutes path="/product/:product_id" exact component={ProductInfo} />
    <ProtectedRoutes path="/addproduct" exact component={AddProduct} />
    <ProtectedRoutes path="/userlist" exact component={UserList} />
    <ProtectedRoutes path="/userlist/:user_id" exact component={UserInfo} />
    <Route path="*" component={NotFound} />
  </Switch>;