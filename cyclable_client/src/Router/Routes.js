import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from '../Components/Error/NotFound';
import Product from '../Components/Product/Product';
import AboutUs from '../Components/About/AboutUs';
import LoginSignin from '../Components/LoginSignup/LoginSignup';
import LandingPage from '../Components/Landing/Landing';
import Faq from '../Components/FAQ/faq';
import UserTrack from '../Components/UserTrack/UserTrack';
export default () =>
  <Switch>
    <Route path="/register" exact component={LoginSignin} />
    <Route path="/" exact component={LandingPage} />
    <Route path="/product" exact component={Product} />
    <ProtectedRoutes path="/user" exact component={UserTrack} />
    <Route path="/about" exact component={AboutUs} />
    <Route path="/faq" exact component={Faq} />
    <Route path="*" component={NotFound} />
  </Switch>;