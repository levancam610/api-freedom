import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import accountList from './accountList';
import accountGroup from './accountGroup';

const account = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
            <Route path={`${match.url}/list`} component={accountList} />
            <Route path={`${match.url}/group`} component={accountGroup} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default account;
