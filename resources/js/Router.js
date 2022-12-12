import React from "react";
import {Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

/* SAYFALAR*/
import FrontIndex from './Views/Index/index'
import FrontLogin from './Views/Login/Login'
import FrontRegister from './Views/Register/Register'

const Main = () =>(
        <Switch>
            <Route path="/login" component={FrontLogin} />
            <Route path="/register" component={FrontRegister} />
            <PrivateRoute exac path="/" component={FrontIndex} />
        </Switch>
)
export default Main
