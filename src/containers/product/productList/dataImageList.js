import React, { Component } from "react";
import { Table } from 'antd';
import { Popconfirm, message } from 'antd';
import {DELETE_ACCOUNT, LIST_ACCOUNT} from "../../../constants/actionTypes";

import {formatDateddmmyyyy, formatMoneyVND} from "Constants/ultis";
import Pagination from "../../../components/List/Pagination";
import {connect} from "react-redux";
import {Colxx} from "Components/CustomBootstrap";
import {ContextMenuTrigger} from "react-contextmenu";
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CustomInput, Row} from "reactstrap";
import classnames from "classnames";
import {NavLink} from "react-router-dom";
class DataImageList extends Component {
    constructor(props){
        super(props);
    }
    removeAccount = (id) => {
        this.props.removeAccountById(id);
    }
    onChangePage = (i) => {
        this.props.getListAccount(this.props.data.selectPageSize, i, this.props.data.orderBy);
    }

    render(){
        let currentPage = parseInt(this.props.data.CurrentPage);
        return (
            <Row>
                {this.props.data.Data.map(product => {
                    return (
                        <Colxx
                            sm="6"
                            lg="4"
                            xl="3"
                            className="mb-3"
                            key={product.id}
                        >
                            <ContextMenuTrigger
                                id="menu_id"
                                data={product.id}
                            >
                                <Card
                                    onClick={event =>
                                        this.handleCheckChange(event, product.id)
                                    }
                                    className={classnames({
                                        active: this.props.data.Data.includes(
                                            product.id
                                        )
                                    })}
                                >
                                    <div className="position-relative">
                                        <NavLink
                                            to={`?p=${product.id}`}
                                            className="w-40 w-sm-100"
                                        >
                                            <CardImg
                                                top
                                                alt={product.name}
                                                src={product.avatar}
                                            />
                                        </NavLink>
                                        <Badge
                                            //color={product.statusColor}
                                            pill
                                            className="position-absolute badge-top-left"
                                        >
                                            {product.instock}
                                        </Badge>
                                    </div>
                                    <CardBody>
                                        <Row>
                                            <Colxx xxs="12" className="mb-3">
                                                <CardSubtitle>{product.name}</CardSubtitle>
                                                <CardText className="text-muted text-small mb-0 font-weight-light">
                                                    <p>{formatDateddmmyyyy(new Date(product.createdDate))}</p>
                                                    <p>Price: {formatMoneyVND(product.price)}</p>
                                                    <p>{product.discount==0 ? null : "Sale: "+formatMoneyVND(product.discount)}</p>
                                                </CardText>
                                            </Colxx>
                                        </Row>
                                    </CardBody>
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

export default connect(mapStateToProps)(DataImageList);