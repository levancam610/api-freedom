import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import productList from './productList';
import detailProduct from './detailProduct'
const product = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
            <Route path={`${match.url}/list`} component={productList} />
            <Route path={`${match.url}/:id`} component={detailProduct} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default product;
