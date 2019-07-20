import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import HomeMenu from 'Containers/Sidebar/Home';
import homePage from './HomePage/homePage';
import detailProduct from './HomePage/detailProduct';
import { connect } from 'react-redux';

import MessengerCustomerChat from 'react-messenger-customer-chat';
import "../../assets/css/sass/home/menu.scss"

export class HomeApp extends Component {
    render() {
        const { match, containerClassnames} = this.props;
        return (
            <div id="app-container" className={containerClassnames}>
                <HomeMenu history={this.props.history}/>
                    <div className="container-fluid">
                        <Switch>
                            <Route path={`${match.url}/index`} component={homePage} />
                            <Route path={`${match.url}/product/:id`} component={detailProduct} />
                            <Redirect to="/index" />
                        </Switch>
                    </div>
                <MessengerCustomerChat
                    pageId="1222109314633925"
                    appId="478797662870063"
                />
            </div>
        );
    }
}
const mapStateToProps = ({ menu }) => {
    const { containerClassnames} = menu;
    return { containerClassnames };
}

export default withRouter(connect(mapStateToProps, {})(HomeApp));
