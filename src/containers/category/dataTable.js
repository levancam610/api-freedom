import React, { Component } from "react";
import { Table } from 'antd';
import { Popconfirm, message } from 'antd';
import {DELETE_ACCOUNT, LIST_ACCOUNT, LIST_ACCOUNTL, LIST_PRODUCT} from "../../constants/actionTypes";
import {formatDateddmmyyyy, formatMoneyVND} from "Constants/ultis";
import Pagination from "../../components/List/Pagination";
import {connect} from "react-redux";
import {Colxx} from "Components/CustomBootstrap";
import {ContextMenuTrigger} from "react-contextmenu";
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CustomInput, Row} from "reactstrap";
import classnames from "classnames";
import {NavLink} from "react-router-dom";
import {LIST_CATEGORY} from "Constants/actionTypes";
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
    onChangePage = (i) => {
        this.props.getListCategory(this.props.data.selectPageSize, i, this.props.data.orderBy);
    }

    render(){
        let currentPage = parseInt(this.props.data.CurrentPage);
        return (

            <Row>
                {this.props.data.Data.map(item => {
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
                                        alt={item.name}
                                        src={item.avatar}
                                        className="list-thumbnail responsive border-0"
                                    />
                                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                            <NavLink
                                                to={`/admin/product/${item.id}`}
                                                className="w-40 w-sm-100"
                                            >
                                                <p className="list-item-heading mb-1 truncate">
                                                    {item.name}
                                                </p>
                                            </NavLink>
                                            <p className="mb-1 text-muted text-small w-25 w-sm-100">
                                                {item.description}
                                            </p>
                                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                {formatDateddmmyyyy(new Date(item.createdDate))}
                                            </p>

                                            <div className="w-sm-100">
                                                <Badge  /*color={product.statusColor}*/ pill>
                                                    {item.totalProduct}
                                                </Badge>
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
        data: state.categoryList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListCategory: (pageSize, currentPage, orderBy) => dispatch({
            type: LIST_CATEGORY,
            page: currentPage,
            pageSize: pageSize,
            orderBy: orderBy
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);