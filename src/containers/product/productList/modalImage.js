import React, { Component } from "react";
import {
    Button,
    Label,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
} from "reactstrap";

import IntlMessages from "Util/IntlMessages";
import {MODAL_IMAGE_PRODUCT, UPLOAD_IMAGE_PRODUCT, REMOVE_IMAGE_PRODUCT} from "Constants/actionTypes";
import {connect} from "react-redux";
import {Icon, Radio, Upload, RadioGroup} from "antd";
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export class ModalImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            previewVisible: false,
            previewImage: "",
            fileImage: null,
            fileList: [
                /*{
                    uid: "-1",
                    name: "xxx.png",
                    status: "done",
                    url:
                        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                }*/
            ],

        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);

        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true
        });
    };


    getfile = file =>{
        this.props.uploadImageProduct(file)
        console.log(file)
      //  this.setState({fileList: file});
    }
    removeFile = (file) =>{
        if(!isNaN(file.uid)){
            this.props.removeImageProduct(file.uid)
        }
    }
    handleChange = ({ fileList }) =>{
        this.setState({ fileList })
        console.log(fileList);
    }


    render(){
        if (this.props.data.modalImage.data.length > 0) {
            let image = [];
            this.props.data.modalImage.data.map((elem) => {
                image.push({uid: elem.id, url: elem.url, key: elem.id})
            })
            this.state.fileList = image;
        }
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Tải lên</div>
            </div>
        );
        return(
            <Modal
                isOpen={this.props.data.modalImage.open}
                toggle={this.props.openModalImage}
                wrapClassName="modal-top"
                backdrop="static"
                size="lg"
            >
                    <ModalHeader toggle={this.props.openModalImage}>
                       Hình ảnh chi tiết
                    </ModalHeader>
                    <ModalBody>
                        <div className="clearfix">
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                action="/api/testImage"
                                data={this.getfile}
                                onRemove={this.removeFile}
                            >
                                {uploadButton}
                            </Upload>
                            <Modal
                                isOpen={previewVisible}
                                toggle={this.handleCancel}
                            >
                                <img alt="example" style={{ width: "100%" }} src={previewImage} />
                            </Modal>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={this.props.openModalImage}
                            color="secondary"
                            outline
                        >
                            Thoát
                        </Button>
                    </ModalFooter>
            </Modal>
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
        openModalImage: () => dispatch({
            type: MODAL_IMAGE_PRODUCT,
        }),
        uploadImageProduct: (file) => dispatch({
            type: UPLOAD_IMAGE_PRODUCT,
            file: file
        }),
        removeImageProduct: (id) => dispatch({
            type: REMOVE_IMAGE_PRODUCT,
            id: id
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalImage);
