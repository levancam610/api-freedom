import React, { Component } from "react";
import { Table } from 'antd';
import { Popconfirm, message } from 'antd';
import {DELETE_ACCOUNT, LIST_ACCOUNT, MODAL_EDIT, CLOSE_MODAL_EDIT_ACCOUNTG} from "../../../constants/actionTypes";

import {formatDateddmmyyyy} from "Constants/ultis";

import Pagination from "../../../components/List/Pagination";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
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
    removeAccount = (id) => {
        this.props.removeAccountById(id);
    }

    onChangePage = (i) => {
        this.setState({currentPage: i})
        this.props.getListAccount(this.props.data.selectPageSize, i, this.props.data.orderBy);
    }
    render(){
        const { messages } = this.props.intl;
        const columns = [
            {
                title: messages["account.group.table.header.name"],
                dataIndex: 'name'
            },
            {
                title: messages["account.group.table.header.description"],
                dataIndex: 'desc'
            },
            {
                title: messages["account.group.table.header.createDate"],
                dataIndex: 'create'
            },
            {
                title: messages["account.group.table.header.update"],
                dataIndex: 'update'
            },
            {
                title: messages["account.group.table.header.shop"],
                dataIndex: 'shopName'
            },
            {
                title: messages["account.group.table.header.action"],
                key: 'action',
                render: (record) => (
                    <div>
                        <a href="#" onClick = {() => this.props.openModalEdit(record.id, this.props.data.selectPageSize, this.state.currentPage, this.props.data.orderBy)}><i className="far fa-edit"></i></a> | <Popconfirm
                            title="Are you sure delete this account?"
                            onConfirm={()=>this.removeAccount(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="#"><i className="far fa-trash-alt"></i></a>
                        </Popconfirm>
                    </div>
                ),
            },
        ];
        var data = [], totalPage=0;
        if(typeof this.props.data.Data !="undefined"){
            console.log(this.props.data.Data);
            totalPage = typeof this.props.data.MaxPage != "undefined" ? this.props.data.MaxPage : 0;
            console.log(totalPage);
            data = this.props.data.Data.map(function(elem){
                return {
                    key: elem.Id,
                    id: elem.Id,
                    name: elem.Name,
                    desc: elem.Description,
                    create: formatDateddmmyyyy(new Date(elem.CreatedDate)),
                    update: formatDateddmmyyyy(new Date(elem.ModifiedDate)),
                    shopName: elem.Shop!= null ? elem.Shop.Name : null,
                    shopId: elem.ShopId,
                    action: elem.Id
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
        data: state.accountGroup
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    console.log(ownProps);
    return {
        getListAccount: (pageSize, currentPage, orderBy) => dispatch({
            type: LIST_ACCOUNT,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy
        }),
        removeAccountById: id => dispatch({
           type: DELETE_ACCOUNT,
           id: id,
        }),
        openModalEdit: (id, pageSize, currentPage, orderBy) => dispatch({
            type: MODAL_EDIT,
            id: id,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy
        }),
        closeModalEdit: () => dispatch({
            type: CLOSE_MODAL_EDIT_ACCOUNTG
        })
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(DataTable));