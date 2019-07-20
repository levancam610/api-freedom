import React, { Component } from "react";
import {
    Form,
    FormGroup,
    Button,
    Input, Label,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
    FormFeedback
} from "reactstrap";

import { injectIntl } from 'react-intl';
import IntlMessages from "Util/IntlMessages";

import {ADD_ACCOUNT, MODAL_OPEN} from "Constants/actionTypes";

import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import {connect} from "react-redux";
class ModalAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: "",
            categories:  [
                {label:'Cakes',value:'Cakes',key:0},
                {label:'Cupcakes',value:'Cupcakes',key:1},
                {label:'Desserts',value:'Desserts',key:2},
            ],
            shop:  [
                {label:'Cakes',value:'Cakes',key:0},
                {label:'Cupcakes',value:'Cupcakes',key:1},
                {label:'Desserts',value:'Desserts',key:2},
            ],
            shopId: 0,
            shopName: "",
            validation:{
                name: true,
                desc: true,
                shopId: true,
            }
        }
    }
    checkValidation = (nameV, descV, shopIdV) => {
        var name = nameV!="", desc = descV!="", shopId = shopIdV>0;
        this.setState({
            validation:{
                name: name,
                desc: desc,
                shopId: shopId
            }
        })
        console.log(name+"-"+desc);
        if(name && desc && shopId){
            return true;
        }
        return false;
    }
    submitForm = (event) => {
        event.preventDefault();
        if(this.checkValidation(event.target.name.value, event.target.description.value, event.target.shop.value)){
            this.props.addAccountGroup(
                event.target.name.value,
                event.target.description.value,
                event.target.shop.value,
                this.props.data.PageSize,
                this.props.data.CurrentPage,
                this.props.data.orderBy
            );
        }
    }
    render(){
        const {messages} = this.props.intl;
        var optionShop = this.props.data.listShop.length > 0 ?
            this.props.data.listShop.map((elem)=>{
                return {
                    label: elem.Name,
                    value: elem.Id,
                    key: elem.Id,
                }
            }) : null;
        return(
            <Modal

                isOpen={this.props.data.modalOpen}
                toggle={this.props.openModalAdd}
                wrapClassName="modal-right"
                backdrop="static"
            >
                <Form onSubmit={this.submitForm}>
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
                                <IntlMessages id="modal.add.shop" />
                            </Label>
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className={"react-select " + (!this.state.validation.shopId ? "select-validation-error" : "")}
                                classNamePrefix="react-select"
                                name="shop"
                                options={optionShop}
                                isClearable={true}
                                isSearchable={true}
                                style={{borderColor: "red !important"}}
                            />
                            <FormFeedback className={!this.state.validation.shopId ? "validation-error" : ""}><IntlMessages id="validation.form.not.empty"/></FormFeedback>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="secondary"
                            outline
                            onClick={this.props.openModalAdd}
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
        data: state.accountGroup
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openModalAdd: () => dispatch({
            type: MODAL_OPEN,
        }),
        addAccountGroup: (name, description, shopId, pageSize, currentPage, orderBy) => dispatch({
            type: ADD_ACCOUNT,
            name: name,
            description: description,
            shopId: shopId,
            pageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy
        })
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ModalAdd));
