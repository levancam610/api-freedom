import React, { Component } from "react";
import Carousel, { Modal, ModalGateway } from 'react-images';
import {Row} from "reactstrap"
import "../../../assets/css/sass/home/menu.scss"
import {GET_PRODUCT_HOME} from "Constants/actionTypes";
import {connect} from "react-redux";
import {Button, Comment, Avatar } from "antd";
import {Colxx} from "Components/CustomBootstrap";
import { css } from 'glamor';
const cardImage = css({
    height: "80px",
    paddingLeft: "2px",
    paddingRight: "2px"
})
const parentImage = css({
    padding: "0px"
})
const row = css({
    padding: "50px 100px",
    '@media(max-width: 600px)': {
        padding: "5px 5px"
    }
})
const ExampleComment = ({ children }) => (
    <Comment
        actions={[<span>Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        }
        content={
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
            </p>
        }
    >
        {children}
    </Comment>
);


class detailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            lightboxIsOpen: false,
        }
    }
    componentWillMount(){
        console.log("ssssss:"+ this.props.match.params.id);
        const productId = this.props.match.params.id;
        this.props.getProductById(productId);

    }
    camhoi = (s) => {
        console.log(s);
    }
    toggleLightbox = (selectedIndex) => {
        this.setState(state => ({
            lightboxIsOpen: !state.lightboxIsOpen,
            selectedIndex,
        }));
    };

    render() {

        const { selectedIndex, lightboxIsOpen } = this.state;
        let images = [];
        for(let i=0; i<10; i++){
            images.push({src: "https://firebasestorage.googleapis.com/v0/b/shopcode-cd861.appspot.com/o/images%2Fcategory%2F7772ab3c63135e094f97307cf83a266f.jpeg?alt=media&token=fcf483b8-c28f-4158-813f-2f0db99eac26"})
        }
        const kk = images.map((elem,index) => {
            return (
                <a onClick={() => this.toggleLightbox(index)}>
                    <img {...cardImage} src={elem.src}/>
                </a>
                )});

        return(
            <Row {...row}>
                <div className="row w-50 w-xs-100">
                    <div className="w-50 w-xs-100">
                        <img style={{width:"100%"}} src={images[0].src}/>
                        <div style={{display: "flex", overflowX: "auto", marginTop: "5px"}}>
                            {kk}
                        </div>
                    </div>
                    <div style={{paddingLeft: "10px"}} className="w-50 w-xs-100">
                        <div><h3><strong>ao T-shirt001</strong></h3></div>
                        <p>
                            dasd asd wqe sd w  s d w sad asd asd
                        dasdasd asd a dw a sd esad wqe sad asd w ewe
                            adsadsad asd w e d s w s e w ds w e s w sd
                            eq e wq  dsas qwe asd e q sad qw sd qe sd wqe asd qwe
                        </p>
                        <div style={{textAlign: "center"}}>
                            <strong>160,000 VND </strong><Button type="primary">Đặt mua</Button>
                        </div>
                    </div>

                </div>
                <div className="w-100">
                    <ExampleComment>
                        <ExampleComment>
                        </ExampleComment>
                    </ExampleComment>,
                </div>
                <ModalGateway>
                    {lightboxIsOpen ? (
                        <Modal onClose={this.toggleLightbox}>
                            <Carousel
                                currentIndex={selectedIndex}
                                frameProps={{ autoSize: 'height' }}
                                views={images}
                                isFullscreen = {true}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </Row>
            );
    }
}
const mapStateToProps = state => {
    return {
        product: state.product.Select
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProductById: (id) => dispatch({
            type: GET_PRODUCT_HOME,
            id: id
        }),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(detailProduct)

