import React, { Component } from "react";
import {
    Button,
    CustomInput, Input, Label,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
} from "reactstrap";

import IntlMessages from "Util/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import {ADD_ROLE, MODAL_ADD_ROLE} from "Constants/actionTypes";
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
            ]
        }
    }
    handelChange = (event) => {
        console.log(event.target.name + "-" + event.target.value)
        var state = event.target.name;
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state.name);
    }

    submitForm = () => {
        this.props.addAccountGroup(this.state.name, this.state.description);
    }
    render(){
        console.log(this.props.data.modalOpen);
        console.log("hhihih");
        return(
            <Modal
                isOpen={this.props.data.modalOpen}
                toggle={this.props.openModalAdd}
                wrapClassName="modal-right"
                backdrop="static"
            >
                <ModalHeader toggle={this.props.openModalAdd}>
                    <IntlMessages id="layouts.add-new-modal-title" />
                </ModalHeader>
                <ModalBody>
                    <Label>
                        <IntlMessages id="layouts.product-name" />
                    </Label>
                    <Input value={this.state.name} name="name" onChange={this.handelChange}/>
                    <Label className="mt-4">
                        <IntlMessages id="layouts.description" />
                    </Label>
                    <Input type="textarea" value={this.state.description} name="description" onChange={this.handelChange} />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        outline
                        onClick={this.props.openModalAdd}
                    >
                        <IntlMessages id="layouts.cancel" />
                    </Button>
                    <Button color="primary" onClick={this.submitForm}>
                        <IntlMessages id="layouts.submit" />
                    </Button>{" "}
                </ModalFooter>
            </Modal>
        );
    }
}
const mapStateToProps = state => {
    console.log("levancam"+state);
    return {
        data: state.accountList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openModalAdd: () => dispatch({
            type: MODAL_OPEN,
        }),
        addAccountGroup: (name, description) => dispatch({
            type: ADD_ACCOUNT,
            name: name,
            description: description
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd);
