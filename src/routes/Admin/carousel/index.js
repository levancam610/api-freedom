import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import carouselList from './carouselList';

const carousel = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
            <Route path={`${match.url}/list`} component={carouselList} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default carousel;
