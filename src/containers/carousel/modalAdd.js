import React, { Component } from "react";
import {
    Button,
    Form, FormFeedback, FormGroup, Input, Label,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
} from "reactstrap";
import {Upload, Icon} from "antd";

import IntlMessages from "Util/IntlMessages";
import {MODAL_ADD_CAROUSEL, ADD_CAROUSEL} from "Constants/actionTypes";
import {connect} from "react-redux";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export class ModalAddCategory extends Component {
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
            validation:{
                name: true,
                desc: true,
            }
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
        this.setState({fileImage: file});
    }
    removeFile = () =>{
        this.setState({fileImage: null})
    }
    handleChange = ({ fileList }) =>{ this.setState({ fileList }); console.log(fileList)}
    onChange = event =>{
        this.setState({[event.target.name]: event.target.value});
    }
    submitForm = (event) => {
        event.preventDefault();
        let param = {
            name: event.target.name.value,
            description: event.target.description.value,
            status: event.target.status.value,
            file: this.state.fileImage
        }
        if(this.checkValidation(param.name, param.description)){
            this.props.addCarousel(param);
        }
    }


    checkValidation = (nameV, descV) => {
        let name = nameV!="", desc = descV!="";
        this.setState({
            validation:{
                name: name,
                desc: desc,
            }
        })
        if(name && desc){
            return true;
        }
        return false;
    }
    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const optionStatus = [
            {label: "Mở", value: 1, key: 1},
            {label: "Đóng", value: 0, key: 0},
        ]
        let defaultOption = {label: "Đóng", value: 0, key: 0}

        return(
            <Modal
                isOpen={this.props.data.modalOpen}
                toggle={this.props.openModalAdd}
                wrapClassName="modal-right"
                backdrop="static"
            >
                <Form onSubmit={this.submitForm} className="formAdmin">
                    <ModalHeader toggle={this.props.openModalAdd}>
                        <IntlMessages id="layouts.add-new-modal-title" />
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label className="labelAccount">
                                Tên danh mục
                            </Label>
                            <Input name="name" invalid={!this.state.validation.name}/>
                            <FormFeedback><IntlMessages id="validation.form.not.empty"/></FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label className="labelAccount">
                                Mô tả
                            </Label>
                            <Input type="textarea"  name="description" invalid={!this.state.validation.desc} />
                            <FormFeedback><IntlMessages id="validation.form.not.empty"/></FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Trạng thái
                            </Label>
                            <Select
                                components={{ Input: CustomSelectInput }}
                                classNamePrefix="react-select"
                                name="status"
                                options={optionStatus}
                                defaultValue={defaultOption}
                            />
                        </FormGroup>
                        <Label className="mt-4">
                            Hình đại diện
                        </Label>
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
                                {fileList.length >= 1 ? null : uploadButton}
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
                            color="secondary"
                            outline
                        >
                            <IntlMessages id="layouts.cancel" />
                        </Button>
                        <Button color="primary" type="submit">

                            <IntlMessages id="layouts.submit" />
                        </Button>{" "}
                    </ModalFooter>
                </Form>
            </Modal>
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
        openModalAdd: () => dispatch({
            type: MODAL_ADD_CAROUSEL,
        }),
        addCarousel: (param) => dispatch({
            type: ADD_CAROUSEL,
            param: param
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalAddCategory);
