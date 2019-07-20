import React, { Component } from "react";
import {connect} from "react-redux";
import IntlMessages from "Util/IntlMessages";
import {
    Button,
    ButtonDropdown,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, Input, Label,
    UncontrolledDropdown
} from "reactstrap";
import ModalAdd from "Containers/account/group/modalAdd";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {
    GET_FILTER_OPTIONS,
    LIST_ACCOUNT, LIST_CATEGORY_HEADER_PRODUCT,
    MODAL_ADD_PRODUCT,
    PRODUCT_SET_TYPE_LIST,
    UPLOAD_AVATAR_PRODUCT
} from "Constants/actionTypes";
import {injectIntl} from "react-intl";
import ModalAddProduct from "Containers/product/productList/modalAdd";

class Header extends Component {
    constructor(props){
        super(props);
        const {messages} = this.props.intl;
        this.state = {
            optionPageSize: [8, 12, 24],
            pageSize: 8,
            displayOptionsIsOpen: false,
            selectedFilterOptions: {value: 0, label: messages["label.all"]},
            filterOptions: [
                {value: 0, label: messages["label.all"]}
            ],
            selectedOrderOption:  {column: "CreatedDate",label: messages["label.order.by.create"]},
            orderOptions:[
                {column: "CreatedDate",label: messages["label.order.by.create"]},
                {column: "Name",label: messages["label.order.by.name"]},
            ],
        }
    }
    changePageSize = (size) => {
        this.props.getListAccount(size, this.props.data.orderBy);
    }
    changeFilter = (filter) => {
        this.props.getListAccount(this.props.data.selectPageSize, filter);
    }
    changeOrderBy = (order) => {
        this.props.getListAccount(this.props.data.selectPageSize, order);
    }
    componentWillMount(){
        this.props.getHeaderCategory();
    }

    render(){
        const {messages} = this.props.intl;
        if(this.props.data.Categories.length>0){
            this.state.filterOptions = this.props.data.Categories.map((elem) =>{
                return{label: elem.Name, column: elem.Id}
            })
            this.state.filterOptions = [{label: messages["label.all"], column: 0}, ...this.state.filterOptions];
        }

        var startIndex = (this.props.data.CurrentPage-1)*this.props.data.selectPageSize;
        var endIndex = startIndex+this.props.data.PageSize;
        return(
            <Colxx xxs="12">
                <div className="mb-2">
                    <h1>
                        <IntlMessages id="product.header.name" />
                    </h1>

                    <div className="float-sm-right">
                        <Button
                            color="primary"
                            size="lg"
                            className="top-right-button btnAddNewProduct"
                            onClick={this.props.openModalAdd}
                        >
                            <IntlMessages id="layouts.add-new" />
                        </Button>
                        {"  "}

                        <ModalAddProduct/>

                    </div>

                    <BreadcrumbItems match={this.props.match} />
                </div>

                <div className="mb-2">
                    <Button
                        color="empty"
                        className="pt-0 pl-0 d-inline-block d-md-none"
                        onClick={this.toggleDisplayOptions}
                    >
                        <IntlMessages id="layouts.display-options" />{" "}
                        <i className="simple-icon-arrow-down align-middle" />
                    </Button>
                    <Collapse
                        isOpen={this.state.displayOptionsIsOpen}
                        className="d-md-block"
                        id="displayOptions"
                    >
                   <span className="mr-3 mb-2 d-inline-block float-md-left">
                    <a
                        className={`mr-2 view-icon ${
                            this.props.data.displayMode === "list" ? "active" : ""
                            }`}
                        onClick={() => this.props.changeDisplayMode("list")}
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                    <path className="view-icon-svg" d="M17.5,3H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" />
                    <path className="view-icon-svg" d="M3,2V3H1V2H3m.12-1H.88A.87.87,0,0,0,0,1.88V3.12A.87.87,0,0,0,.88,4H3.12A.87.87,0,0,0,4,3.12V1.88A.87.87,0,0,0,3.12,1Z" />
                    <path className="view-icon-svg" d="M3,9v1H1V9H3m.12-1H.88A.87.87,0,0,0,0,8.88v1.24A.87.87,0,0,0,.88,11H3.12A.87.87,0,0,0,4,10.12V8.88A.87.87,0,0,0,3.12,8Z" />
                    <path className="view-icon-svg" d="M3,16v1H1V16H3m.12-1H.88a.87.87,0,0,0-.88.88v1.24A.87.87,0,0,0,.88,18H3.12A.87.87,0,0,0,4,17.12V15.88A.87.87,0,0,0,3.12,15Z" />
                    <path className="view-icon-svg" d="M17.5,10H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" />
                    <path className="view-icon-svg" d="M17.5,17H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" /></svg>
                    </a>
                    <a
                        className={`mr-2 view-icon ${
                            this.props.data.displayMode === "thumblist" ? "active" : ""
                            }`}
                        onClick={() => this.props.changeDisplayMode("imagelist")}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                    <path className="view-icon-svg" d="M7,2V8H1V2H7m.12-1H.88A.87.87,0,0,0,0,1.88V8.12A.87.87,0,0,0,.88,9H7.12A.87.87,0,0,0,8,8.12V1.88A.87.87,0,0,0,7.12,1Z" />
                    <path className="view-icon-svg" d="M17,2V8H11V2h6m.12-1H10.88a.87.87,0,0,0-.88.88V8.12a.87.87,0,0,0,.88.88h6.24A.87.87,0,0,0,18,8.12V1.88A.87.87,0,0,0,17.12,1Z" />
                    <path className="view-icon-svg" d="M7,12v6H1V12H7m.12-1H.88a.87.87,0,0,0-.88.88v6.24A.87.87,0,0,0,.88,19H7.12A.87.87,0,0,0,8,18.12V11.88A.87.87,0,0,0,7.12,11Z" />
                    <path className="view-icon-svg" d="M17,12v6H11V12h6m.12-1H10.88a.87.87,0,0,0-.88.88v6.24a.87.87,0,0,0,.88.88h6.24a.87.87,0,0,0,.88-.88V11.88a.87.87,0,0,0-.88-.88Z" /></svg>
                    </a>
                    <a
                        className={`mr-2 view-icon ${
                            this.props.data.displayMode === "imagelist" ? "active" : ""
                            }`}
                        onClick={() => this.props.changeDisplayMode("imagelist")}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                    <path className="view-icon-svg" d="M7,2V8H1V2H7m.12-1H.88A.87.87,0,0,0,0,1.88V8.12A.87.87,0,0,0,.88,9H7.12A.87.87,0,0,0,8,8.12V1.88A.87.87,0,0,0,7.12,1Z" />
                    <path className="view-icon-svg" d="M17,2V8H11V2h6m.12-1H10.88a.87.87,0,0,0-.88.88V8.12a.87.87,0,0,0,.88.88h6.24A.87.87,0,0,0,18,8.12V1.88A.87.87,0,0,0,17.12,1Z" />
                    <path className="view-icon-svg" d="M7,12v6H1V12H7m.12-1H.88a.87.87,0,0,0-.88.88v6.24A.87.87,0,0,0,.88,19H7.12A.87.87,0,0,0,8,18.12V11.88A.87.87,0,0,0,7.12,11Z" />
                    <path className="view-icon-svg" d="M17,12v6H11V12h6m.12-1H10.88a.87.87,0,0,0-.88.88v6.24a.87.87,0,0,0,.88.88h6.24a.87.87,0,0,0,.88-.88V11.88a.87.87,0,0,0-.88-.88Z" /></svg>
                    </a>
                  </span>

                        <div className="d-block d-md-inline-block">
                            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                <DropdownToggle caret color="outline-dark" size="xs">
                                    <IntlMessages id="label.category" />
                                    {this.state.selectedFilterOptions.label}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.filterOptions.map((filter, index) => {
                                        return (
                                            <DropdownItem
                                                key={index}
                                                onClick={() => this.changeFilter(filter.column)}
                                            >
                                                {filter.label}
                                            </DropdownItem>
                                        );
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                <DropdownToggle caret color="outline-dark" size="xs">
                                    <IntlMessages id="label.orderby" />
                                    {this.state.selectedOrderOption.label}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.orderOptions.map((order, index) => {
                                        return (
                                            <DropdownItem
                                                key={index}
                                                onClick={() => this.changeOrderBy(order.column)}
                                            >
                                                {order.label}
                                            </DropdownItem>
                                        );
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                <input
                                    type="text"
                                    name="keyword"
                                    id="search"
                                    placeholder={messages["menu.search"]}
                                    onKeyPress={e => this.handleKeyPress(e)}
                                />
                            </div>

                        </div>
                        <div className="float-md-right">
                      <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${
                          this.state.totalItemCount
                          } `}</span>
                            <UncontrolledDropdown className="d-inline-block">
                                <DropdownToggle caret color="outline-dark" size="xs">
                                    {this.state.selectedPageSize}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.state.optionPageSize.map((size, index) => {
                                        return (
                                            <DropdownItem
                                                key={index}
                                                onClick={() => this.changePageSize(size)}
                                            >
                                                {size}
                                            </DropdownItem>
                                        );
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </Collapse>
                </div>
                <Separator className="mb-5" />
            </Colxx>
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
        getHeaderCategory: () => dispatch({
            type: LIST_CATEGORY_HEADER_PRODUCT,
        }),
        getFilterOptions: () => dispatch({
            type: GET_FILTER_OPTIONS,
        }),
        openModalAdd: () => dispatch({
            type: MODAL_ADD_PRODUCT,
        }),
        changeDisplayMode: type => dispatch({
            type: PRODUCT_SET_TYPE_LIST,
            payLoad: type
        })
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Header));