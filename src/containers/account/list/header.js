import React, { Component } from "react";
import {connect} from "react-redux";
import IntlMessages from "Util/IntlMessages";
import {Button, Collapse, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import ModalAdd from "Containers/account/group/modalAdd";
import ModalUpdate from "Containers/account/group/modalUpdate";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {LIST_ACCOUNTL, MODAL_OPEN} from "Constants/actionTypes";
import {injectIntl} from "react-intl";

class Header extends Component {
    constructor(props){
        super(props);
        const {messages} = this.props.intl;
        this.state = {
            optionPageSize: [8, 12, 24],
            pageSize: 8,
            displayOptionsIsOpen: false,
            selectedOrderOption:  {column: "CreatedDate",label: messages["label.order.by.create"]},
            orderOptions:[
                {column: "CreatedDate",label: messages["label.order.by.create"]},
                {column: "Username",label: messages["label.order.by.username"]},
            ],
        }
    }
    changePageSize = (size) => {
        this.props.getListAccount(size, this.props.data.orderBy, this.props.intl);
    }
    changeOrderBy = (order) => {
        this.props.getListAccount(this.props.data.selectPageSize, order, this.props.intl);
    }
    render(){
        const {messages} = this.props.intl;
        var startIndex = (this.props.data.CurrentPage-1)*this.props.data.selectPageSize;
        var endIndex = startIndex+this.props.data.PageSize;
        return(
            <Colxx xxs="12">

                <div className="mb-2">
                    <h1>
                        <IntlMessages id="menu.account" />
                    </h1>
                    <div className="float-sm-right">
                        <Button
                            color="primary"
                            size="lg"
                            className="top-right-button btnAddAccountGroup"
                            onClick={this.props.openModalAdd}
                        >
                            <IntlMessages id="button.add.new" />
                        </Button>
                        {"  "}
                        <ModalAdd />
                        <ModalUpdate />
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
                        <div className="d-block d-md-inline-block">
                            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                <DropdownToggle caret color="outline-dark" size="xs">
                                    <IntlMessages id="layouts.orderby" />
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
                      <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} ${messages["label.of"]} ${
                          this.props.data.TotalItemCount
                          } `}</span>
                            <UncontrolledDropdown className="d-inline-block">
                                <DropdownToggle caret color="outline-dark" size="xs">
                                    {this.props.data.selectPageSize}
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
        data: state.accountList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openModalAdd: () => dispatch({
            type: MODAL_OPEN_ADD_ACCOUNTL
        }),
        getListAccount: (pageSize, orderBy, intl) => dispatch({
            type: LIST_ACCOUNTL,
            selectPageSize: pageSize,
            currentPage: 1,
            orderBy: orderBy,
            intl: intl
        }),
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Header));