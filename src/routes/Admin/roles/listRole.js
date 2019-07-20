import React, { Component, Fragment } from "react";
import { injectIntl} from 'react-intl';
import {
    Row,
} from "reactstrap";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import DataTable from "Containers/roles/roleList/dataTable";
import Header from "Containers/roles/roleList/header"
import {connect} from "react-redux";
import {LIST_ROLE} from "Constants/actionTypes";

class listRole extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
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
            search: "",
            selectedItems: [],
            lastChecked: null,
            displayOptionsIsOpen: false,
        };
    }
    componentWillMount(){
        this.props.getListRole(this.props.data.selectPageSize, this.props.data.CurrentPage, this.props.data.orderBy);
    }
    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    changeOrderBy(column) {
        this.setState(
            {
                selectedOrderOption: this.state.orderOptions.find(
                    x => x.column === column
                )
            },
            () => console.log("asda")
        );
    }


    render() {
        return (
            !this.props.data.isLoading?
                <div className="loading"></div>
                :
                <Fragment>
                    <div className="disable-text-selection">
                        <Row>
                            <Header match={this.props.match}/>
                        </Row>
                    </div>

                    <DataTable/>

                    <ContextMenu
                        id="menu_id"
                        onShow={e => this.onContextMenu(e, e.detail.data)}
                    >
                        <MenuItem
                            onClick={this.onContextMenuClick}
                            data={{ action: "copy" }}
                        >
                            <i className="simple-icon-docs" /> <span>Copy</span>
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
        data: state.roleList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListRole: (pageSize, currentPage, orderBy) => dispatch({
            type: LIST_ROLE,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(listRole)
