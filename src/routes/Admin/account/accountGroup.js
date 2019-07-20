import React, { Component, Fragment } from "react";
import {
    Row,
} from "reactstrap";

import { ContextMenu, MenuItem } from "react-contextmenu";

import DataTable from "Containers/account/group/dataTable";
import Header from "Containers/account/group/header"
import {connect} from "react-redux";
import {LIST_ACCOUNT} from "Constants/actionTypes";
import "Assets/css/sass/account/accountList.scss";
class accountGroup extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getListAccount(this.props.data.selectPageSize, this.props.data.CurrentPage, this.props.data.orderBy);
    }
    render() {
        return (
            !this.props.data.isLoading?
                <div className="loading"></div>
                :
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
        data: state.accountGroup
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListAccount: (pageSize, currentPage, orderBy) => dispatch({
            type: LIST_ACCOUNT,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(accountGroup)
