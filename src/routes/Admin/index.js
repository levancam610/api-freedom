import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';

import HomeMenu from 'Containers/Sidebar/Home';
import product from './product';
import category from './category';
import carousel from './carousel'
import account from './account'
import role from './roles'
import { connect } from 'react-redux';

export class MainApp extends Component {
	render() {
		const token = localStorage.getItem("token");
		const { match, containerClassnames} = this.props;
		let routes = "";
		if(token==null || token.trim()==""){
			routes = <Switch>
				<Redirect to="/login" />
			</Switch>;
		}else{
			routes = <Switch>
				<Route path={`${match.url}/product`} component={product} />
				<Route path={`${match.url}/category`} component={category} />
				<Route path={`${match.url}/carousel`} component={carousel} />
				<Route path={`${match.url}/account`} component={account} />
				<Route path={`${match.url}/role`} component={role} />
				<Redirect to="/error" />
			</Switch>;
		}
		return (
			<div id="app-container" className={containerClassnames}>
				<TopNav history={this.props.history} />
				<Sidebar/>
				<main>
					<div className="container-fluid">
						{routes}
					</div>
				</main>
			</div>
		);
	}
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames} = menu;
	return { containerClassnames };
  }
  
export default withRouter(connect(mapStateToProps, {})(MainApp));
