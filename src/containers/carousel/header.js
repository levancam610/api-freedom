import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import IntlMessages from "Util/IntlMessages";
import {
    Breadcrumb, BreadcrumbItem,
    Button,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from "reactstrap";
import ModalAddCategory from "./modalAdd";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {LIST_CAROUSEL_HEADER, MODAL_ADD_CAROUSEL, MODAL_ADD_CATEGORY} from "Constants/actionTypes";
import {injectIntl} from "react-intl";

/*{
  url:
  active
  title
}*/
const headerLink = [
    {title: "Trang chủ", url: "/admin/dashboard", active: false},
    {title: "Hình slider", url: "/admin/carousel/list", active: false},
    {title: "Danh sách", active: true}
]
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            optionPageSize: [8, 12, 24],
            pageSize: 8,
            displayOptionsIsOpen: false,
            selectedOrderOption:  {column: "CreatedDate",label: "Ngày tạo"},
            orderOptions:[
                {column: "CreatedDate",label: "Ngày tạo"},
                {column: "title",label: "Tiêu đề"},
            ],
        }
    }
    changePageSize = (size) => {
        this.state.pageSize = size;
        this.props.getListCarousel(size, null);
    }
    changeOrderBy = (order) => {
        this.state.selectedOrderOption = order;
        this.props.getListCarousel(null, order.column);
    }
    render(){
        const {messages} = this.props.intl;
        let startIndex = (this.props.data.CurrentPage-1)*this.props.data.selectPageSize+1;
        let endIndex = startIndex+this.props.data.selectPageSize;
        if(endIndex>this.props.data.TotalItemCount){
            endIndex = this.props.data.TotalItemCount;
        }
        return(
            <Colxx xxs="12">
                <div className="mb-2">
                    <h1>
                        Hình slider
                    </h1>
                    <div className="float-sm-right">
                        <Button
                            color="primary"
                            size="lg"
                            className="top-right-button btnAddAccountGroup"
                            onClick={this.props.openModalAdd}
                        >
                            Thêm mới
                        </Button>
                        {"  "}
                        <ModalAddCategory />
                    </div>
                    <BreadcrumbItems match={headerLink} />
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
                                    <IntlMessages id="label.orderby" />
                                    {this.state.selectedOrderOption.label}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.orderOptions.map((order, index) => {
                                        return (
                                            <DropdownItem
                                                key={index}
                                                onClick={() => this.changeOrderBy(order)}
                                            >
                                                {order.label}
                                            </DropdownItem>
                                        );
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
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
        data: state.carouselList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openModalAdd: () => dispatch({
            type: MODAL_ADD_CAROUSEL
        }),
        getListCarousel: (pageSize, orderBy) => dispatch({
            type: LIST_CAROUSEL_HEADER,
            pageSize: pageSize,
            orderBy: orderBy
        }),
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Header));