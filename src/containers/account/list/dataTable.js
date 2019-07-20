import React, { Component } from "react";
import { Table } from 'antd';
import { Popconfirm, message } from 'antd';
import {
    DELETE_ACCOUNT,
    LIST_ACCOUNT,
    MODAL_EDIT,
    CLOSE_MODAL_EDIT_ACCOUNTG,
    LIST_ACCOUNTL
} from "../../../constants/actionTypes";

import {formatDateddmmyyyy} from "Constants/ultis";
import Pagination from "../../../components/List/Pagination";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
class DataTable extends Component {
    constructor(props){
        super(props);
    }
    removeAccount = (id) => {
        this.props.removeAccountById(id);
    }

    onChangePage = (i) => {
        this.props.getListAccount(this.props.data.selectPageSize, i, this.props.data.orderBy, this.props.intl);
    }
    render(){
        const {messages} = this.props.intl;
        const columns = [
            {
                title: messages["account.table.header.name"],
                dataIndex: 'name'
            },
            {
                title: messages["account.table.header.username"],
                dataIndex: 'username'
            },
            {
                title: messages["account.table.header.birth.day"],
                dataIndex: 'birthDay'
            },
            {
                title: messages["account.table.header.phone"],
                dataIndex: 'numberPhone'
            },
            {
                title: messages["header.label.create.date"],
                dataIndex: 'create'
            },
            {
                title: messages["header.label.create.date"],
                dataIndex: 'update'
            },
            {
                title: messages["header.label.action"],
                key: 'action',
                render: (record) => (
                    <div>

                        <a href="#" onClick = {() => this.props.openModalEdit(record.id, this.props.data.selectPageSize, this.props.data.currentPage, this.props.data.orderBy)}><i className="far fa-edit"></i></a> | <Popconfirm
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
            data = this.props.data.Data.map(function(elem){
                return {
                    key: elem.Id,
                    id: elem.Id,
                    username: elem.Username,
                    name: elem.User.FirstName + " "+elem.User.LastName,
                    create: formatDateddmmyyyy(new Date(elem.CreatedDate)),
                    update: formatDateddmmyyyy(new Date(elem.ModifiedDate)),
                    numberPhone: elem.User.PhoneNumber,
                    birthDay: formatDateddmmyyyy(new Date(elem.User.BirthDay)),
                    action: elem.Id
                }

            })
        }

        return(
            this.props.data.isLoading?
                <div className="loading"></div>
                :
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
        data: state.accountList
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        getListAccount: (pageSize, currentPage, orderBy, intl) => dispatch({
            type: LIST_ACCOUNTL,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy,
            intl: intl
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