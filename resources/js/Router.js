import React from "react";
import {Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

/* SAYFALAR*/
import FrontIndex from './Views/Index/index'
import FrontLogin from './Views/Login/Login'
import FrontRegister from './Views/Register/Register'
/* URUNLER*/
import ProductIndex from './Views/Product/index'
import ProductCreate from './Views/Product/create'

const Main = () =>(
        <Switch>
            <Route path="/login" component={FrontLogin} />
            <Route path="/register" component={FrontRegister} />
            <PrivateRoute  path="/urunler/ekle" component={ProductCreate} />
            <PrivateRoute exac path="/urunler" component={ProductIndex} />
            <PrivateRoute exac path="/" component={FrontIndex} />
        </Switch>
)
export default Main
