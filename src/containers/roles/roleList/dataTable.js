import React, { Component } from "react";
import { Table } from 'antd';
import { Popconfirm, message } from 'antd';
import {DELETE_ROLE, LIST_ROLE} from "../../../constants/actionTypes";

import Pagination from "../../../components/List/Pagination";
import {connect} from "react-redux";

class DataTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageSize: 8,
            currentPage: 1,
            totalPage: 100,
            orderBy: "Name"
        }
    }
    onChangePage = (i) => {
        this.setState({currentPage: i})
        this.props.getListRole(this.props.data.selectPageSize, i, this.props.data.orderBy);
    }
    render(){
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Code',
                dataIndex: 'code'
            },
            {
                title: 'Description',
                dataIndex: 'desc'
            },
            {
                title: 'Group role',
                dataIndex: 'roleGroup'
            },
            {
                title: 'Action',
                key: 'action',
                render: (record) => (
                    <Popconfirm
                        title="Are you sure delete this account?"
                        onConfirm={()=>this.props.removeRoleById(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#"><i className="far fa-trash-alt"></i></a>
                    </Popconfirm>
                ),
            },
        ];
        var data = [], totalPage=0;
        if(typeof this.props.data.Data !="undefined"){
            totalPage = typeof this.props.data.MaxPage != "undefined" ? this.props.data.MaxPage : 0;
            data = this.props.data.Data.map(function(elem){
                return {
                    id: elem.Id,
                    name: elem.Name,
                    code: elem.Code,
                    desc: elem.Description,
                    role: elem.RoleGroupId
                }
            })
            console.log(data);
        }

        return(
            <div>
                <Table dataSource={data} columns={columns} pagination={false}/>
                <Pagination
                    currentPage={this.props.data.CurrentPage}
                    totalPage={totalPage}
                    onChangePage={(i)=>this.onChangePage(i)}
                />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.roleList
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    console.log(ownProps);
    return {
        getListRole: (pageSize, currentPage, orderBy) => dispatch({
            type: LIST_ROLE,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy
        }),
        removeRoleById: id => dispatch({
            type: DELETE_ROLE,
            id: id,
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);