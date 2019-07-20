import React, { Component, Fragment } from "react";
import {
    Row,
} from "reactstrap";

import { ContextMenu, MenuItem } from "react-contextmenu";

import DataTable from "Containers/category/dataTable";
import Header from "Containers/category/header"
import {connect} from "react-redux";
import {LIST_CATEGORY} from "Constants/actionTypes";

class categoryList extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getListCategory(this.props.data.selectPageSize, this.props.data.CurrentPage, this.props.data.orderBy);
    }
    render() {
        return (
            this.props.data.isLoading?
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
        data: state.categoryList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListCategory: (pageSize, currentPage, orderBy) => dispatch({
            type: LIST_CATEGORY,
            pageSize: pageSize,
            page: currentPage,
            orderBy: orderBy
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(categoryList)
