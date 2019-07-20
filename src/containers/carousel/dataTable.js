import React, { Component } from "react";
import { Table } from 'antd';
import { Popconfirm, message } from 'antd';
import {
    DELETE_ACCOUNT,
    LIST_ACCOUNT,
    LIST_ACCOUNTL,
    LIST_CAROUSEL,
    LIST_CATEGORY,
    LIST_PRODUCT
} from "../../constants/actionTypes";
import {formatDateddmmyyyy, formatMoneyVND} from "Constants/ultis";
import Pagination from "../../components/List/Pagination";
import {connect} from "react-redux";
import {Colxx} from "Components/CustomBootstrap";
import {ContextMenuTrigger} from "react-contextmenu";
import {Card, Row} from "reactstrap";
import classnames from "classnames";
import {UPDATE_STATUS_CAROUSEL} from "Constants/actionTypes";
import CustomSelectInput from "Components/CustomSelectInput";
import Select from "react-select";
function collect(props) {
    return { data: props.data };
}
class DataTable extends Component {
    constructor(props){
        super(props);
    }
    removeAccount = (id) => {
        this.props.removeAccountById(id);
        // console.log(id);
    }
    onChangeStatus = (option) =>{
        console.log(option)
        this.props.updateStatus(option.key, option.value)
      //  this.props.updateStatus()

    }
    onChangePage = (i) => {
        this.props.getListCarousel(i, this.props.data.selectPageSize, this.props.data.orderBy);
    }

    render(){
        const currentPage = parseInt(this.props.data.CurrentPage);
        return (

            <Row>
                {this.props.data.Data.map(item => {
                    const optionStatus = [
                        {label: "Mở", value: 1, key: item.id},
                        {label: "Đóng", value: 0, key: item.id},
                    ]
                    let defaultOption = item.status == null || item.status == 0 ? {label: "Đóng", value: 0, key: 0}
                        : {label: "Mở", value: 1, key: item.id}
                    return (
                        <Colxx xxs="12" key={item.id} className="mb-3">
                            <ContextMenuTrigger
                                id="menu_id"
                                data={item.id}
                                collect={collect}
                            >
                                <Card
                                    /*  onClick={event =>
                                          this.handleCheckChange(event, product.Id)
                                      }*/
                                    className={classnames("d-flex flex-row", {
                                        active: this.props.data.Data.includes(
                                            item.id
                                        )
                                    })}
                                >
                                    <img
                                        alt={item.title}
                                        src={item.image}
                                        className="list-thumbnail responsive border-0"
                                    />
                                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                            <p className="list-item-heading mb-1 truncate">
                                                {item.title}
                                            </p>
                                            <p className="mb-1 text-muted text-small w-25 w-sm-100">
                                                {item.description}
                                            </p>
                                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                {formatDateddmmyyyy(new Date(item.createdDate))}
                                            </p>

                                            <div className="w-sm-100 w-15">
                                                <Select
                                                    components={{ Input: CustomSelectInput }}
                                                    classNamePrefix="react-select"
                                                    name="category"
                                                    options={optionStatus}
                                                    defaultValue={defaultOption}
                                                    onChange={this.onChangeStatus}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </Card>
                            </ContextMenuTrigger>
                        </Colxx>
                    );
                })}
                <Pagination
                    currentPage={currentPage}
                    totalPage={this.props.data.MaxPage}
                    onChangePage={i => this.onChangePage(i)}
                />
            </Row>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.carouselList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListCarousel: (page,pageSize, orderBy) => dispatch({
            type: LIST_CAROUSEL,
            page: page,
            pageSize: pageSize,
            orderBy: orderBy
        }),
        updateStatus: (id, status) => dispatch({
            type: UPDATE_STATUS_CAROUSEL,
            id: id,
            status: status
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);