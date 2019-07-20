import React, { Component, Fragment } from "react";
import {
    Row,
} from "reactstrap";

import { ContextMenu, MenuItem } from "react-contextmenu";

import DataTable from "Containers/account/list/dataTable";
import Header from "Containers/account/list/header"
import {connect} from "react-redux";
import {LIST_ACCOUNTL} from "Constants/actionTypes";
import "Assets/css/sass/account/accountList.scss";

import {injectIntl} from "react-intl";
class accountList extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getListAccount(this.props.data.selectPageSize, this.props.data.CurrentPage, this.props.data.orderBy, this.props.intl);
    }
    render() {
        return (
                <Fragment>
                    <div className="disable-text-selection">
                        <Row>
                            <Header match={this.props.match}/>
                        </Row>
                    </div>
                    <DataTable/>
                </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        data: state.accountList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListAccount: (pageSize, currentPage, orderBy, intl) => dispatch({
            type: LIST_ACCOUNTL,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy,
            intl: intl
        })
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(accountList))