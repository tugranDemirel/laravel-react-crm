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
import ProductEdit from './Views/Product/edit'

/* KATEGORILER */
import CategoryIndex from './Views/Category/index'
import CategoryCreate from './Views/Category/create'
import CategoryEdit from './Views/Category/edit'
const Main = () =>(
        <Switch>
            <Route path="/login" component={FrontLogin} />
            <Route path="/register" component={FrontRegister} />

            <PrivateRoute  path="/urunler/:id/duzenle" component={ProductEdit} />
            <PrivateRoute  path="/urunler/ekle" component={ProductCreate} />
            <PrivateRoute exac path="/urunler" component={ProductIndex} />

            <PrivateRoute  path="/kategori/:id/duzenle" component={CategoryEdit} />
            <PrivateRoute  path="/kategori/ekle" component={CategoryCreate} />
            <PrivateRoute exac path="/kategoriler" component={CategoryIndex} />

            <PrivateRoute exac path="/" component={FrontIndex} />
        </Switch>
)
export default Main
