import React, { Component, Fragment } from 'react';
import { Redirect, Route, Switch} from 'react-router-dom';
import { IntlProvider} from 'react-intl';

import ColorSwitcher from '../components/ColorSwitcher'
import {  NotificationContainer} from "../components/ReactNotifications";

import { defaultStartPath } from '../constants/defaultValues'

import { connect } from "react-redux";

import AppLocale from '../lang';
import MainApp from 'Routes/Admin';

import HomeApp from 'Routes/Home';
import login from '../routes/Admin/layouts/login'
import register from '../routes/Admin/layouts/register'
import error from '../routes/Admin/layouts/error'
import forgotPassword from '../routes/Admin/layouts/forgot-password'
import '../assets/css/vendor/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';

class App extends Component {
	render() {

		const username = localStorage.getItem("username");
		const { location, match, user, locale } = this.props;
		const currentAppLocale = AppLocale[locale];
		if (location.pathname === '/'  || location.pathname==='/app'|| location.pathname==='/app/') {
			return (<Redirect to={defaultStartPath} />);
		}
		return (
			<Fragment>
				<IntlProvider
					locale={currentAppLocale.locale}
					messages={currentAppLocale.messages}
				>

					<Fragment>
  						<NotificationContainer />
						<Switch>
							<Route path={`/admin`} component={MainApp} />
							<Route path={`/home`} component={HomeApp} />
							<Route path={`/login`} component={login} />
							<Route path={`/register`} component={register} />
							<Route path={`/forgot-password`} component={forgotPassword} />
							<Route path={`/error`} component={error} />
							<Redirect to="/error" />
						</Switch>
						{username==null || username.trim()=="" ? "" : <ColorSwitcher />}
					</Fragment>
				</IntlProvider>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {
	const { user } = authUser;
	const { locale } = settings;
	return { user, locale };
};
export default connect(mapStateToProps, { })(App);
