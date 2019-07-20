import React, { Component } from "react";
import { Carousel, Icon, Card } from 'antd';
import "../../../assets/css/sass/home/menu.scss"
import {GET_LIST_CATEGORY_HOME, GET_LIST_SLIDER_HOME} from "Constants/actionTypes";
import {connect} from "react-redux";
import { css } from 'glamor';
import {NewsHeaderCard} from "react-ui-cards"
import {NavLink} from "react-router-dom";
import ProductList from "../../../containers/home/productList"
const { Meta } = Card;
const image = css({
    height: '500px',
    width: '100%'
})
const categoryLabel = css({
    textAlign: "center",
    marginTop: "30px",
    fontSize: "20px"
})
const cardImage = css({
    padding: '10px 15px',
    width: "50%",
    height: "300px",
    '@media(max-width: 600px)': {
        width: "100%",
    }
})
const cardProduct = css({
    margin: '10px 15px',
    position: "relative"
})
class homePage extends Component {
    constructor(props) {
        super(props);
        this.carousel = React.createRef();
    }
    next = () => {
        this.carousel.next();
    }
    previous = () => {
        this.carousel.prev();
    }
    componentWillMount(){
        this.props.getListSlider();
        this.props.getListCategory();
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const dataImage = this.props.slider.Data.map(elem => {
            return(
                <div>
                    <img src={elem.image} {...image}/>
                </div>
            )
        })
        const dataCategory = this.props.category.Data.map(elem => {
            return(
                <NavLink to="/product/2" {...cardImage}>
                    <NewsHeaderCard
                        title={elem.name}
                        thumbnail={elem.avatar}
                    />
                </NavLink>
            )
        })

        return (
            <div>
                <div className="carouselImage">
                    <Icon type="right-circle" onClick={this.next} />
                    <Carousel autoplay ref={node => (this.carousel = node)} {...settings}>
                        {dataImage}
                    </Carousel>
                    <Icon type="left-circle" onClick={this.previous} />
                </div>
                <div className="w-100" {...categoryLabel}>
                    <strong>Sản phẩm</strong>
                </div>
                <div className="cardHome">
                    {dataCategory}
                </div>
                <div className="productHome">
                    <ProductList categoryId={0} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        slider: state.slider,
        category: state.category
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListSlider: () => dispatch({
            type: GET_LIST_SLIDER_HOME,
        }),
        getListCategory: () => dispatch({
            type: GET_LIST_CATEGORY_HOME,
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(homePage)

