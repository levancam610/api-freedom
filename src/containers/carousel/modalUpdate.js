
import {Input,
    Label,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
} from "reactstrap";

import Select from "react-select";
import IntlMessages from "Util/IntlMessages";
import { CLOSE_MODAL_EDIT_ACCOUNTG, UPDATE_ACCOUNT} from "Constants/actionTypes";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import CustomSelectInput from "Components/CustomSelectInput";
class ModalUpdate extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: "",
            shop:  [
                {label:'Cakes',value:'Cakes',key:0},
                {label:'Cupcakes',value:'Cupcakes',key:1},
                {label:'Desserts',value:'Desserts',key:2},
            ],
            validation: {
                name: true,
                desc: true,
                shopId: true
            }
        }
    }
    handelChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
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
        console.log( event.target.shop.value);
        if(this.checkValidation(event.target.name.value, event.target.description.value, event.target.shop.value)){
            this.props.updateAccountGroup(
                this.props.data.editAccount.Id,
                event.target.name.value,
                event.target.description.value,
                Number(event.target.shop.value),
                this.props.data.editAccount.CreatedDate,
                this.props.data.PageSize,
                this.props.data.CurrentPage,
                this.props.data.orderBy
            );
        }
    }

    render(){
        const {Name, Description, ShopId, Id} = this.props.data.editAccount;
        const ShopName = this.props.data.editAccount.Shop==null ? "" : this.props.data.editAccount.Shop.Name;
        const {messages} = this.props.intl;
        var optionShop = this.props.data.listShop.length > 0 ?
            this.props.data.listShop.map((elem)=>{
                return {
                    label: elem.Name,
                    value: elem.Id,
                    key: elem.Id,
                }
            }) : null;
        var shop = {label: ShopName, value: ShopId, key: ShopId}
        console.log(shop);
        return(
            <Modal
                isOpen={this.props.data.modalEdit}
                toggle={this.props.closeModalEdit}
                wrapClassName="modal-right"
                backdrop="static"
            >
                <Form onSubmit={this.submitForm}>
                    <ModalHeader toggle={this.props.closeModalEdit}>
                        <IntlMessages id="modal.edit.accountGroup" />
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label className="labelAccount">
                                <IntlMessages id="label.name" />
                            </Label>
                            <Input defaultValue={Name} name="name" invalid={!this.state.validation.name}/>
                            <FormFeedback><IntlMessages id="validation.form.not.empty"/></FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label className="labelAccount">
                                <IntlMessages id="label.description" />
                            </Label>
                            <Input type="textarea" defaultValue={Description} name="description" invalid={!this.state.validation.desc} />
                            <FormFeedback><IntlMessages id="validation.form.not.empty"/></FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label className="labelAccount">
                                <IntlMessages id="label.shop" />
                            </Label>
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className={"react-select " + (!this.state.validation.shopId ? "select-validation-error" : "")}
                                classNamePrefix="react-select"
                                name="shop"
                                options={optionShop}
                                defaultValue={shop}
                                isClearable={true}
                                isSearchable={true}
                                placeholder = {messages["modal.select.shop.placeholder"]}

                            />
                            <FormFeedback className={!this.state.validation.shopId ? "validation-error" : ""}><IntlMessages id="validation.form.not.empty"/></FormFeedback>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="secondary"
                            outline
                            onClick={this.props.closeModalEdit}
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
        closeModalEdit: () => dispatch({
            type: CLOSE_MODAL_EDIT_ACCOUNTG
        }),
        updateAccountGroup: (id, name, description, shopId, CreateDate, pageSize, currentPage, orderBy) => dispatch({
            type: UPDATE_ACCOUNT,
            id: id,
            name: name,
            desc: description,
            shopId: shopId,
            createDate: CreateDate,
            selectPageSize: pageSize,
            currentPage: currentPage,
            orderBy: orderBy,
        })
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ModalUpdate));
