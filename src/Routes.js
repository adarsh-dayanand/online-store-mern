import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts'
import AddProduct from './admin/AddProduct';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory'
import Cart from './core/Cart';
import PaymentB from './core/PaymentB';


export default function Routes() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
            <PrivateRoute path="/cart" exact component={Cart}/>
            <PrivateRoute path="/payment" exact component={PaymentB}/>
            {/* <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} /> */}
            <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
            <AdminRoute path="/admin/create/category" exact component={AddCategory} />
            <AdminRoute path="/admin/create/product" exact component={AddProduct} />
            <AdminRoute path="/admin/categories" exact component={ManageCategories} />
            <AdminRoute path="/admin/products" exact component={ManageProducts} />
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
            <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
        </Switch>
    </Router>
  );
}
