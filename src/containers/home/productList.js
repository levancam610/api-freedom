import React, { Component } from "react";
import { Card } from 'antd';
import {GET_LIST_PRODUCT_HOME } from "Constants/actionTypes";
import {connect} from "react-redux";
import { css } from 'glamor';

import {NavLink} from "react-router-dom";
const { Meta } = Card;

const cardProduct = css({
    margin: '10px 15px',
    position: "relative"
})
class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        const categoryId = this.props.categoryId;
        this.props.getListProduct(categoryId);
    }
    render() {
        return (
            this.props.product.Data.map(elem => {
                return(
                    <NavLink className="w-20 w-xs-100" to={"/index/product/"+elem.id}>
                        <Card
                            hoverable
                            cover={<img alt="example" src={elem.avatar} />}
                            {...cardProduct}
                        >
                            <Meta title={elem.name} description={elem.price} />
                        </Card>
                    </NavLink>
                )
            })
        );
    }
}
const mapStateToProps = state => {
    return {
        product: state.product
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListProduct: (id) => dispatch({
            type: GET_LIST_PRODUCT_HOME,
            categoryId: id
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)

