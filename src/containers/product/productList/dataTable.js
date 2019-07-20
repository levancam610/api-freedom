import React, { Component } from "react";
import { Table } from 'antd';
import { Popconfirm, message } from 'antd';
import {DELETE_ACCOUNT, LIST_ACCOUNT} from "../../../constants/actionTypes";

import DataList from "./dataList"
import DataImageList from "./dataImageList"
import Pagination from "../../../components/List/Pagination";
import {connect} from "react-redux";
class DataTable extends Component {
    constructor(props){
        super(props);
    }
    removeAccount = (id) => {
        this.props.removeAccountById(id);
        // console.log(id);
    }
    onChangePage = (i) => {
        this.setState({currentPage: i})
        this.props.getListAccount(this.props.data.selectPageSize, i, this.props.data.orderBy);
    }

    render(){
        var displayMode = this.props.data.displayMode;
        return (
            this.props.data.isLoading ? <div className="loading"></div> :
                displayMode=="list" ? <DataList/> :
                    <DataImageList/>


        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.productList
    }
}

export default connect(mapStateToProps)(DataTable);