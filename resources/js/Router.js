import React from "react";
import {Switch, Route} from "react-router-dom";

/* SAYFALAR*/
import FrontIndex from './Views/Index/index'
import FrontLogin from './Views/Login/Login'
import FrontRegister from './Views/Register/Register'

const Main = () =>(
        <Switch>
            <Route path="/login" component={FrontLogin} />
            <Route path="/register" component={FrontRegister} />
            <Route exac path="/" component={FrontIndex} />
        </Switch>
)
export default Main
