import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import listRole from './listRole';

const role = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
            <Route path={`${match.url}/list`} component={listRole} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default role;
