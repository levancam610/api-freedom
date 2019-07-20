import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import categoryList from './categoryList';

const product = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
            <Route path={`${match.url}/list`} component={categoryList} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default product;
