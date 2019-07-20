
import React, { Component, Fragment } from "react";
import {LIST_PRODUCT, DELETE_PRODUCT} from "../../constants/actionTypes";
import { connect } from 'react-redux';
import {Colxx} from "Components/CustomBootstrap";
import {ContextMenuTrigger} from "react-contextmenu";
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CustomInput, Row} from "reactstrap";
import classnames from "classnames";
import {NavLink} from "react-router-dom";
import Pagination from "Components/List/Pagination";
class List extends Component {
    constructor(props){
        super(props);
        this.state ={
            displayMode: "imagelist",
            selectedItems: [],
        };
    }
    componentWillMount(){
        //this.props.getListProduct();
    }
    render(){
        if(typeof this.props.data.data != "undefined" && this.props.data.data.length>0){
            return(
                <div>
                    { this.props.data.data.map(product => {
                        if (this.state.displayMode === "imagelist") {
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
                                                active: this.state.selectedItems.includes(
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
                                                        alt={product.title}
                                                        src={product.img}
                                                    />
                                                </NavLink>
                                                <Badge
                                                    color={product.statusColor}
                                                    pill
                                                    className="position-absolute badge-top-left"
                                                >
                                                    {product.status}
                                                </Badge>
                                            </div>
                                            <CardBody>
                                                <Row>
                                                    <Colxx xxs="2">
                                                        <CustomInput
                                                            className="itemCheck mb-0"
                                                            type="checkbox"
                                                            id={`check_${product.id}`}
                                                            checked={this.state.selectedItems.includes(
                                                                product.id
                                                            )}
                                                            onChange={() => {}}
                                                            label=""
                                                        />
                                                    </Colxx>
                                                    <Colxx xxs="10" className="mb-3">
                                                        <CardSubtitle>{product.title}</CardSubtitle>
                                                        <CardText className="text-muted text-small mb-0 font-weight-light">
                                                            {product.date}
                                                        </CardText>
                                                    </Colxx>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </ContextMenuTrigger>
                                </Colxx>
                            );
                        } else if (this.state.displayMode === "thumblist") {
                            return (
                                <Colxx xxs="12" key={product.id} className="mb-3">
                                    <ContextMenuTrigger
                                        id="menu_id"
                                        data={product.id}
                                    >
                                        <Card
                                            onClick={event =>
                                                this.handleCheckChange(event, product.id)
                                            }
                                            className={classnames("d-flex flex-row", {
                                                active: this.state.selectedItems.includes(
                                                    product.id
                                                )
                                            })}
                                        >
                                            <NavLink
                                                to={`?p=${product.id}`}
                                                className="d-flex"
                                            >
                                                <img
                                                    alt={product.title}
                                                    src={product.img}
                                                    className="list-thumbnail responsive border-0"
                                                />
                                            </NavLink>
                                            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                                    <NavLink
                                                        to={`?p=${product.id}`}
                                                        className="w-40 w-sm-100"
                                                    >
                                                        <p className="list-item-heading mb-1 truncate">
                                                            {product.title}
                                                        </p>
                                                    </NavLink>
                                                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                        {product.type}
                                                    </p>
                                                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                        {product.date}
                                                    </p>
                                                    <div className="w-15 w-sm-100">
                                                        <Badge color={product.statusColor} pill>
                                                            {product.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                                                    <CustomInput
                                                        className="itemCheck mb-0"
                                                        type="checkbox"
                                                        id={`check_${product.id}`}
                                                        checked={this.state.selectedItems.includes(
                                                            product.id
                                                        )}
                                                        onChange={() => {}}
                                                        label=""
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                    </ContextMenuTrigger>
                                </Colxx>
                            );
                        } else {
                            return (
                                <Colxx xxs="12" key={product.id} className="mb-3">
                                    <ContextMenuTrigger
                                        id="menu_id"
                                        data={product.id}
                                    >
                                        <Card
                                            onClick={event =>
                                                this.handleCheckChange(event, product.id)
                                            }
                                            className={classnames("d-flex flex-row", {
                                                active: this.state.selectedItems.includes(
                                                    product.id
                                                )
                                            })}
                                        >
                                            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                                    <NavLink
                                                        to={`?p=${product.id}`}
                                                        className="w-40 w-sm-100"
                                                    >
                                                        <p className="list-item-heading mb-1 truncate">
                                                            {product.title}
                                                        </p>
                                                    </NavLink>
                                                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                        {product.type}
                                                    </p>
                                                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                        {product.date}
                                                    </p>
                                                    <div className="w-15 w-sm-100">
                                                        <Badge color={product.statusColor} pill>
                                                            {product.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                                                    <CustomInput
                                                        className="itemCheck mb-0"
                                                        type="checkbox"
                                                        id={`check_${product.id}`}
                                                        checked={this.state.selectedItems.includes(
                                                            product.id
                                                        )}
                                                        onChange={() => {}}
                                                        label=""
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                    </ContextMenuTrigger>
                                </Colxx>
                            );
                        }
                    })}
                    <Pagination
                        currentPage={this.state.currentPage}
                        totalPage={this.state.totalPage}
                        onChangePage={i => this.onChangePage(i)}
                    />
                </div>
            )
        }else{
            return (
                <p>doi 1 ti</p>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        data: state.productList
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getListProduct: () => dispatch({
            type: LIST_PRODUCT,
        }),
        removeProductById: () => dispatch({
            type: DELETE_PRODUCT,
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
