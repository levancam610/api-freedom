import React, { Component, Fragment } from "react";
import { injectIntl} from 'react-intl';
import {
    Row
} from "reactstrap";
import Header from "Containers/product/productList/header";
import DataTable from "Containers/product/productList/dataTable";
import mouseTrap from "react-mousetrap";
import ModalImage from "Containers/product/productList/modalImage";

import "Assets/css/sass/product/productList.scss";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {LIST_PRODUCT, MODAL_IMAGE_PRODUCT} from "Constants/actionTypes";
import {connect} from "react-redux";
function collect(props) {
    return { data: props.data };
}
const apiUrl ="http://api.crealeaf.com/cakes/paging"

class productList extends Component {
    constructor(props) {
        super(props);
        this.toggleDisplayOptions = this.toggleDisplayOptions.bind(this);
        this.toggleSplit = this.toggleSplit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onContextMenuClick = this.onContextMenuClick.bind(this);


        this.state = {
            displayMode: "thumblist",
            pageSizes: [8, 12, 24],
            selectedPageSize: 8,
            categories:  [
                {label:'Cakes',value:'Cakes',key:0},
                {label:'Cupcakes',value:'Cupcakes',key:1},
                {label:'Desserts',value:'Desserts',key:2},
            ],
            orderOptions:[
                {column: "title",label: "Product Name"},
                {column: "type.js",label: "Category"},
                {column: "status",label: "Status"}
            ],
            selectedOrderOption:  {column: "title",label: "Product Name"},
            dropdownSplitOpen: false,
            modalOpen: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            selectedItems: 0,
            lastChecked: null,
            displayOptionsIsOpen: false,
            isLoading:false
        };
    }
    componentWillMount() {
        this.props.getListProduct(this.props.data.selectPageSize, this.props.data.CurrentPage, this.props.data.orderBy, this.props.data.CategorySelect);
    }

    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }
    toggleDisplayOptions() {
        this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
    }
    toggleSplit() {
        this.setState(prevState => ({
            dropdownSplitOpen: !prevState.dropdownSplitOpen
        }));
    }
    changeOrderBy(column) {
        this.setState(
            {
                selectedOrderOption: this.state.orderOptions.find(
                    x => x.column === column
                )
            },
            () => this.dataListRender()
        );
    }
    changePageSize(size) {
        this.setState(
            {
                selectedPageSize: size,
                currentPage: 1
            },
            () => this.dataListRender()
        );
    }
    changeDisplayMode(mode) {
        this.setState({
            displayMode: mode
        });
        return false;
    }
    onChangePage(page) {
        this.setState(
            {
                currentPage: page
            },
            () => this.dataListRender()
        );
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.setState(
                {
                    search: e.target.value.toLowerCase()
                },
                () => this.dataListRender()
            );
        }
    }

    onContextMenuClick = (e, data, target) => {
        if(data.action=="image"){
            this.props.openModalImage(this.state.selectedItems)
        }
    };

    onContextMenu = (e, data) => {
        const clickedProductId = data.data;
        if (this.state.selectedItems != clickedProductId) {
            this.setState({
                selectedItems :clickedProductId
            });
        }
        return true;
    };

    render() {
        return (
            <Fragment>
                <div className="disable-text-selection">
                    <Row>
                        <Header match={this.props.match} />
                    </Row>
                    <ModalImage />
                    <DataTable/>
                </div>
                <ContextMenu
                    id="menu_id"
                    onShow={e => this.onContextMenu(e, e.detail.data)}
                >
                    <MenuItem
                        onClick={this.onContextMenuClick}
                        data={{ action: "image"}}
                    >
                        <i className="simple-icon-docs" /> <span>Hình ảnh</span>
                    </MenuItem>
                    <MenuItem
                        onClick={this.onContextMenuClick}
                        data={{ action: "move" }}
                    >
                        <i className="simple-icon-drawer" /> <span>Move to archive</span>
                    </MenuItem>
                    <MenuItem
                        onClick={this.onContextMenuClick}
                        data={{ action: "delete" }}
                    >
                        <i className="simple-icon-trash" /> <span>Delete</span>
                    </MenuItem>
                </ContextMenu>
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        data: state.productList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openModalImage: (id) => dispatch({
            type: MODAL_IMAGE_PRODUCT,
            id: id
        }),
        getListProduct: (pageSize, currentPage, orderBy, categoryId) => dispatch({
            type: LIST_PRODUCT,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy,
            categoryId: categoryId
        })
    }
}
export default injectIntl(mouseTrap(connect(mapStateToProps, mapDispatchToProps)(productList)));
//export default injectIntl(mouseTrap(productList))
