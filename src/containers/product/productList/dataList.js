import React, { Component } from "react";
import { Table } from 'antd';
import { Popconfirm, message } from 'antd';
import {DELETE_ACCOUNT, LIST_ACCOUNT, LIST_ACCOUNTL, LIST_PRODUCT} from "../../../constants/actionTypes";
import {formatDateddmmyyyy, formatMoneyVND} from "Constants/ultis";
import Pagination from "../../../components/List/Pagination";
import {connect} from "react-redux";
import {Colxx} from "Components/CustomBootstrap";
import {ContextMenuTrigger} from "react-contextmenu";
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CustomInput, Row} from "reactstrap";
import classnames from "classnames";
import {NavLink} from "react-router-dom";
import Rating from "Components/Rating";
function collect(props) {
    return { data: props.data };
}
class DataList extends Component {
    constructor(props){
        super(props);
    }
    removeAccount = (id) => {
        this.props.removeAccountById(id);
        // console.log(id);
    }
    onChangePage = (i) => {
        this.props.getListProduct(this.props.data.selectPageSize, i, this.props.data.orderBy, this.props.data.CategorySelect);
    }

    render(){

        let currentPage = parseInt(this.props.data.CurrentPage);
        var displayMode = this.props.data.displayMode;
        return (

            <Row>
                {this.props.data.Data.map(product => {
                    return (
                        <Colxx xxs="12" key={product.id} className="mb-3">
                            <ContextMenuTrigger
                                id="menu_id"
                                data={product.id}
                                collect={collect}
                            >
                                <Card
                                  /*  onClick={event =>
                                        this.handleCheckChange(event, product.Id)
                                    }*/
                                    className={classnames("d-flex flex-row", {
                                        active: this.props.data.Data.includes(
                                            product.id
                                        )
                                    })}
                                >
                                    <img
                                        alt={product.name}
                                        src={product.avatar}
                                        className="list-thumbnail responsive border-0"
                                    />
                                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                            <NavLink
                                                to={`/admin/product/${product.id}`}
                                                className="w-40 w-sm-100"
                                            >
                                                <p className="list-item-heading mb-1 truncate">
                                                    {product.name}
                                                </p>
                                            </NavLink>
                                            <p className="mb-1 text-muted text-small w-25 w-sm-100">
                                                {formatMoneyVND(product.price)}
                                            </p>
                                            <p className="mb-1 text-muted text-small w-20 w-sm-100">
                                                 {product.SellPrice==0 ? "0 VND" : "-"+formatMoneyVND(product.discount)}
                                            </p>
                                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                {product.ProductCategoryId}
                                            </p>
                                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                {formatDateddmmyyyy(new Date(product.createdDate))}
                                            </p>
                                            <Rating
                                                total={5}
                                                rating={3}
                                                interactive={false}
                                            />
                                            <div className="w-sm-100">
                                                <Badge  /*color={product.statusColor}*/ pill>
                                                    {product.instock}
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
        data: state.productList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListProduct: (pageSize, currentPage, orderBy, categoryId) => dispatch({
            type: LIST_PRODUCT,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy,
            categoryId: categoryId
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataList);