import React, { Component } from "react";
import {
    Button,
    CustomInput, Form, FormFeedback, FormGroup, Input, Label,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
} from "reactstrap";
import {message} from "antd";

import IntlMessages from "Util/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import {MODAL_ADD_PRODUCT, UPLOAD_AVATAR_PRODUCT, ADD_PRODUCT} from "Constants/actionTypes";
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
export class ModalAddProduct extends Component {
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
                categoryId: true,
                price: true,
                number: true,
                discount: true
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
            category: event.target.category.value,
            price: event.target.price.value,
            number: event.target.number.value,
            discount: event.target.discount.value,
            file: this.state.fileImage,
        }
        if(this.checkValidation(param.name, param.description, param.category, param.price, param.number, param.discount, param.file)){
            this.props.addProduct(param);
        }
    }


    checkValidation = (nameV, descV, categoryIdV, priceV, numberV, discountV) => {
        let name = nameV!="", desc = descV!="", categoryId = categoryIdV>0;
        let price = priceV.trim()=="" ? true : !isNaN(priceV) ? true : false;
        let number = numberV.trim()=="" ? true : !isNaN(numberV) ? true : false;
        let discount = discountV.trim()=="" ? true : !isNaN(discountV) ? true : false;


        this.setState({
            validation:{
                name: name,
                desc: desc,
                categoryId: categoryId,
                price: price,
                number: number,
                discount: discount
            }
        })
        if(name && desc && categoryId && price && number && discount){
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
        const optionCategories = this.props.data.Categories.length > 0 ?
            this.props.data.Categories.map((elem)=>{
                return {
                    label: elem.name,
                    value: elem.id,
                    key: elem.id,
                }
            }) : null;
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
                            <IntlMessages id="layouts.product-name" />
                        </Label>
                        <Input name="name" invalid={!this.state.validation.name}/>
                        <FormFeedback><IntlMessages id="validation.form.not.empty"/></FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelAccount">
                            <IntlMessages id="layouts.description" />
                        </Label>
                        <Input type="textarea"  name="description" invalid={!this.state.validation.desc} />
                        <FormFeedback><IntlMessages id="validation.form.not.empty"/></FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelAccount">
                            Danh mục
                        </Label>
                        <Select
                            components={{ Input: CustomSelectInput }}
                            className={"react-select " + (!this.state.validation.categoryId ? "select-validation-error" : "")}
                            classNamePrefix="react-select"
                            name="category"
                            options={optionCategories}
                            isClearable={true}
                            isSearchable={true}
                            style={{borderColor: "red !important"}}
                        />
                        <FormFeedback className={!this.state.validation.categoryId ? "validation-error" : ""}><IntlMessages id="validation.form.not.empty"/></FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelAccount">
                            Giá bán
                        </Label>
                        <Input type="number"  name="price" invalid={!this.state.validation.price} />
                        <FormFeedback>Vui lòng nhập số hợp lệ</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label className="labelAccount">
                            Giảm giá
                        </Label>
                        <Input type="number" name="discount" invalid={!this.state.validation.discount}/>
                        <FormFeedback>Vui lòng nhập số hợp lệ</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label className="labelAccount">
                            Số lượng
                        </Label>
                        <Input type="number"  name="number" invalid={!this.state.validation.number} />
                        <FormFeedback>Vui lòng nhập số hợp lệ</FormFeedback>
                    </FormGroup>
                    <Label className="mt-4">
                        <IntlMessages id="layouts.image"/>
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
        data: state.productList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openModalAdd: () => dispatch({
            type: MODAL_ADD_PRODUCT,
        }),
        addProduct: (param) => dispatch({
            type: ADD_PRODUCT,
            param: param
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalAddProduct);
