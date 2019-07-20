import React, { Component, Fragment } from "react";
import {
    Row,
} from "reactstrap";

import { ContextMenu, MenuItem } from "react-contextmenu";

import DataTable from "Containers/carousel/dataTable";
import Header from "Containers/carousel/header"
import {connect} from "react-redux";
import {LIST_CAROUSEL} from "Constants/actionTypes";

class carouselList extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getListCarouse(this.props.data.CurrentPage, this.props.data.selectPageSize, this.props.data.orderBy);
    }
    render() {
        return (
            this.props.data.isLoading?
                <div className="loading"></div>
                :
                <Fragment>
                    <div className="disable-text-selection">
                        <Row>
                            <Header />
                        </Row>
                    </div>
                    <DataTable/>
                </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        data: state.carouselList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListCarouse: (page, pageSize, orderBy) => dispatch({
            type: LIST_CAROUSEL,
            page: page,
            pageSize: pageSize,
            orderBy: orderBy
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(carouselList)
