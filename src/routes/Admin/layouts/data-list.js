import React, { Component, Fragment } from "react";
import { injectIntl} from 'react-intl';
import {
  Row,
  Card,
  CustomInput,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  UncontrolledDropdown,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  CardBody,
  CardSubtitle,
  CardImg,
  Label,
  CardText,
  Badge,
    Modal

} from "reactstrap";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import classnames from "classnames";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";
import  firebase  from "firebase"
import Pagination from "Components/List/Pagination";
import mouseTrap from "react-mousetrap";

import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";
import { Upload, Icon,  Radio, message } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import 'antd/dist/antd.css';
function collect(props) {
  return { data: props.data };
}
const RadioGroup = Radio.Group;
message.config({
    top: 150,
});
const config = {
    apiKey: "AIzaSyD634xUquHDI7VftKFS_o8gKH8pvsJ3FLI",
    authDomain: "shopcode-cd861.firebaseapp.com",
    databaseURL: "https://shopcode-cd861.firebaseio.com",
    projectId: "shopcode-cd861",
    storageBucket: "shopcode-cd861.appspot.com",
    messagingSenderId: "387176100957"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: false
        },
        deleteFile: {
            enabled: true,
            endpoint: "/uploads"
        },
        request: {
            endpoint: "/uploads"
        }
    }
});
const apiUrl2 ="http://api.crealeaf.com/cakes/paging"
const apiUrl ="http://localhost:8080/api/clothesList"
const apiUrlCategory ="http://localhost:8080/api/category"
const apiUrlImageClothes="http://localhost:8080/api/clothesImage"
const categoryId = 1 //Quan
class DataListLayout extends Component {
    constructor(props) {
      super(props);
      this.toggleDisplayOptions = this.toggleDisplayOptions.bind(this);
      this.toggleSplit = this.toggleSplit.bind(this);
      this.dataListRender = this.dataListRender.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.getIndex = this.getIndex.bind(this);
      this.onContextMenuClick = this.onContextMenuClick.bind(this);


      this.state = {
          displayMode: "thumblist",
          pageSizes: [10, 20, 30, 50, 100],
          selectedPageSize: 10,
          categories: [
           /*   {label: 'Cakes', value: 1, key: 0},
              {label: 'Cupcakes', value: 2, key: 1},
              {label: 'Desserts', value: 3, key: 2},*/
          ],
          defaultOption: null,
          orderOptions: [
              {column: "title", label: "Product Name"},
              {column: "type.js", label: "Category"},
              {column: "status", label: "Status"}
          ],
          selectedOrderOption: {column: "name", label: "Name"},
          dropdownSplitOpen: false,
          modalOpen: false,
          modalImage: false,
          currentPage: 1,
          totalItemCount: 0,
          totalPage: 1,
          search: "",
          selectedItems: [],
          lastChecked: null,
          displayOptionsIsOpen: false,
          isLoading: false,
          List: [],
          name: "",
          price: 0,
          amount: 0,
          categoryId: 0,
          type: 1   ,
          gender:"Nam",
          previewVisible: false,
          previewImage: '',
          fileList: [/*{
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }*/],
          fileList2: [{
           /*   uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',*/
          }],
          fileImage:{},
          avatar: ""
      };
    }
    componentWillMount() {
      this.props.bindShortcut(["ctrl+a", "command+a"], () =>
        this.handleChangeSelectAll(false)
      );
      this.props.bindShortcut(["ctrl+d", "command+d"], () => {
        this.setState({
          selectedItems: []
        });
        return false;
      });
    }
    onSubmit = async () =>{
        var that = this;
        var file = this.state.fileImage;
        this.setState({show: true, progress: 0})
        var that = this;
        console.log(file.name);
        // Create the file metadata
        var metadata = {
            contentType: "image/*"
        };
        var storageRef = firebase.storage().ref();
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef
            .child("images/" + file.name)
            .put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                that.setState({progress: progress})
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log("Upload is paused");
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log("Upload is running");
                        break;
                }
            },
            function(error) {
                console.log(error);
            },
            function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log("File available at", downloadURL);
                    var data = {
                        Name: that.state.name,
                        CategoryId: that.state.categoryId,
                        Price: Number(that.state.price),
                        Amount: Number(that.state.amount),
                        Type: that.state.type,
                        Gender: that.state.gender,
                        Image: downloadURL
                    }
                    console.log(data);

                    /*  var data = {
                          link: downloadURL,
                          clothesId: that.state.IdClick
                      }
                      const api = "http://localhost:8080/api/clothes/uploadImage";
                      axios.post( api,JSON.stringify(data)).then(function(){
                          that.setState({show: false})
                          message.success('Tải lên thành công');
                      })
                          .catch(function(){
                              message.error("Đã có lỗi");
                          });*/
                });
            }
        );




    }
    toggleModal() {
      this.setState({
          modalOpen: !this.state.modalOpen
      });
    }
    toggleModal2 = ()=> {
        this.setState({
            modalImage: !this.state.modalImage
        });
    }
    toggleDisplayOptions() {
      this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
    }
    toggleSplit() {
      this.setState(prevState => ({
        dropdownSplitOpen: !prevState.dropdownSplitOpen
      }));
    }
    changeOrderBy(column) {
      this.setState(
        {
          selectedOrderOption: this.state.orderOptions.find(
            x => x.column === column
          )
        },
        () => this.dataListRender()
      );
    }
    changePageSize(size) {
      this.setState(
        {
          selectedPageSize: size,
          currentPage: 1
        },
        () => this.dataListRender()
      );
    }
    changeDisplayMode(mode) {
      this.setState({
        displayMode: mode
      });
      return false;
    }
    onChangePage(page) {
      this.setState(
        {
          currentPage: page
        },
        () => this.dataListRender()
      );
    }

    handleKeyPress(e) {
      if (e.key === "Enter") {
        this.setState(
          {
            search: e.target.value.toLowerCase()
          },
          () => this.dataListRender()
        );
      }
    }

    handleCheckChange(event, id) {
      if (
        event.target.tagName == "A" ||
        (event.target.parentElement &&
          event.target.parentElement.tagName == "A")
      ) {
        return true;
      }
      if (this.state.lastChecked == null) {
        this.setState({
          lastChecked: id
        });
      }

      let selectedItems = this.state.selectedItems;
      if (selectedItems.includes(id)) {
        selectedItems = selectedItems.filter(x => x !== id);
      } else {
        selectedItems.push(id);
      }
      this.setState({
        selectedItems
      });

      if (event.shiftKey) {
        var items = this.state.items;
        var start = this.getIndex(id, items, "id");
        var end = this.getIndex(this.state.lastChecked, items, "id");
        items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
        selectedItems.push(
          ...items.map(item => {
            return item.id;
          })
        );
        selectedItems = Array.from(new Set(selectedItems));
        this.setState({
          selectedItems
        });
      }
      document.activeElement.blur();
    }

    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    }
    handleChangeSelectAll(isToggle) {
      if (this.state.selectedItems.length >= this.state.List.length) {
        if (isToggle) {
          this.setState({
            selectedItems: []
          });
        }
      } else {
        this.setState({
          selectedItems: this.state.List.map(x => x.Id)
        });
      }
      document.activeElement.blur();
      return false;
    }
    componentDidMount() {
        console.log("kaka:"+this.state.fileList.length)
      this.dataListRender();
      this.getCategory();



    }
    getCategory = ()=>{
        var rs = [];

    }
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };
    handleChange = ({ fileList }) => this.setState({fileList: fileList });
    handleChange2 = ({ fileList }) => this.setState({fileList2: fileList });
    getfile = file =>{
        this.setState({fileImage: file});
    }

    uploadImageToFirebase = async (file) => {
        this.setState({show: true, progress: 0})
        var that = this;
        console.log(file.name);
        console.log("asdasd");

        // Create the file metadata
        var metadata = {
            contentType: "image/*"
        };
        var storageRef = firebase.storage().ref();
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef
            .child("images/" + file.name)
            .put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                that.setState({progress: progress})
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log("Upload is paused");
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log("Upload is running");
                        break;
                }
            },
            function(error) {
                console.log(error);
            },
            function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log("File available at", downloadURL);
                    console.log(that.state.IdClick);
                    var data = {
                        Name: file.name,
                        Link: downloadURL,
                        ClotheId: that.state.selectedItems[0]
                    }
                    console.log(data);

                });
            }
        );
    };
   onChange = event =>{
        this.setState({[event.target.name]: event.target.value});
    }
    onChangeSelect = value =>{
        this.setState({categoryId: value.value});
        //this.setState({defaultOption: value});
    }
    dataListRender() {

      const {selectedPageSize,currentPage,selectedOrderOption,search} = this.state;
      console.log(selectedPageSize);
        console.log(currentPage);
     /* axios.get(`${apiUrl2}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`)
      .then(res => {
        return res.data
          console.log(res)
      }).then(data=>{


        this.setState({
          totalPage: data.totalPage,
          items: data.data,
          selectedItems:[],
          totalItemCount : data.totalItem,
          isLoading:true
        });
      })*/

    }
    async Delete(id) {

         console.log("delete");

     }
    onContextMenuClick = async(e, data, target) => {
      console.log("onContextMenuClick - selected items",this.state.selectedItems)
      console.log("onContextMenuClick - action : ", data.action);
      switch (data.action) {
          case "delete":
              for(var i=0; i<this.state.selectedItems.length; i++){
                  console.log(this.state.selectedItems[i]);
                  var id = this.state.selectedItems[i];
                  await this.Delete(id);
              }
              this.dataListRender();
              break;
          case "edit":
              var id = this.state.selectedItems[0];
              this.setState({
                  modalOpen :true
              });
              break;
          case "image":
              var rs = [];
              var id = this.state.selectedItems[0];
              console.log(id);
             /* uid: '-1',
                  name: 'xxx.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',*/

      }


    };

    onContextMenu = (e, data) => {
      const clickedProductId = data.data;
      if (!this.state.selectedItems.includes(clickedProductId)) {
        this.setState({
          selectedItems :[clickedProductId]
        });
      }

      return true;
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { previewVisible, previewImage, fileList, fileList2 } = this.state;
      const startIndex= (this.state.currentPage-1)*this.state.selectedPageSize
      const endIndex= (this.state.currentPage)*this.state.selectedPageSize
      const {messages} = this.props.intl;
      return (
        !this.state.isLoading?
          <div className="loading"></div>
       :
        <Fragment>
          <div className="disable-text-selection">
            <Row>
              <Colxx xxs="12">
                <div className="mb-2">
                  <h1>
                    <IntlMessages id="menu.data-list" />
                  </h1>

                  <div className="float-sm-right">
                    <Button
                      color="primary"
                      size="lg"
                      className="top-right-button"
                      onClick={this.toggleModal}
                    >
                      <IntlMessages id="layouts.add-new" />
                    </Button>
                    {"  "}

                    <Modal
                        isOpen={this.state.modalImage}
                        toggle={this.toggleModal2}
                        backdrop="static"
                        zIndex={1005}

                    >
                        <ModalHeader toggle={this.toggleModal2}>
                            Image List
                        </ModalHeader>
                        <div className="clearfix">
                            <Upload
                                listType="picture-card"
                                fileList={fileList2}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange2}
                                data={this.uploadImageToFirebase}

                            >
                                {uploadButton}
                            </Upload>
                            <Modal
                                isOpen={previewVisible}
                                toggle={this.handleCancel}
                                backdrop="static"
                            >
                                <ModalHeader toggle={this.handleCancel}>
                                </ModalHeader>
                                <img alt="example" style={{ width: "100%" }} src={previewImage} />

                            </Modal>
                        </div>
                    </Modal>
                    <Modal
                      isOpen={this.state.modalOpen}
                      toggle={this.toggleModal}
                      wrapClassName="modal-right"
                      backdrop="static"
                    >
                      <ModalHeader toggle={this.toggleModal}>
                        <IntlMessages id="layouts.add-new-modal-title" />
                      </ModalHeader>
                      <ModalBody>
                        <Label className="mt-4">
                          <IntlMessages id="layouts.product-name" />
                        </Label>
                        <Input onChange={this.onChange} name="name"/>
                          <Label className="mt-4">
                              <IntlMessages id="layouts.price" />
                          </Label>
                          <Input type="number" onChange={this.onChange} name="price"/>
                          <Label className="mt-4">
                              <IntlMessages id="layouts.amount" />
                          </Label>
                          <Input type="number" onChange={this.onChange} name="amount"/>
                        <Label className="mt-4">
                          <IntlMessages id="layouts.category" />
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="categoryId"
                          onChange={this.onChangeSelect}
                          options={this.state.categories}
                        />
                        <Label className="mt-4">
                          <IntlMessages id="layouts.image"/>
                        </Label>
                          <div className="clearfix">
                              <Upload
                                  listType="picture-card"
                                  onPreview={this.handlePreview}
                                  onChange={this.handleChange}
                                  data={this.getfile}

                              >
                                  {fileList.length >= 1 ? null : uploadButton}
                              </Upload>
                                  <Modal
                                      isOpen={previewVisible}
                                      toggle={this.handleCancel}
                                      backdrop="static"
                                  >
                                      <ModalHeader toggle={this.handleCancel}>
                                      </ModalHeader>
                                  <img alt="example" style={{ width: "100%" }} src={previewImage} />

                              </Modal>
                          </div>

                          <Label className="mt-4">
                              <IntlMessages id="layouts.gender" />
                          </Label>
                          <div>
                              <RadioGroup name="gender" onChange={this.onChange} value={this.state.gender}>
                                  <Radio value="Nam">Nam</Radio>
                                  <Radio value="Nữ">Nữ</Radio>
                              </RadioGroup>
                          </div>
                        <Label className="mt-4">
                          <IntlMessages id="layouts.type" />
                        </Label>
                          <div>
                              <RadioGroup name="type" onChange={this.onChange} value={this.state.type}>
                                  <Radio value={1}>Quần</Radio>
                                  <Radio value={2}>Áo</Radio>
                              </RadioGroup>
                          </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          outline
                          onClick={this.toggleModal}
                        >
                          <IntlMessages id="layouts.cancel" />
                        </Button>
                        <Button color="primary" onClick={this.onSubmit}>
                          <IntlMessages id="layouts.submit" />
                        </Button>{" "}
                      </ModalFooter>
                    </Modal>
                    <ButtonDropdown
                      isOpen={this.state.dropdownSplitOpen}
                      toggle={this.toggleSplit}
                    >
                      <div className="btn btn-primary pl-4 pr-0 check-button">
                        <Label
                          for="checkAll"
                          className="custom-control custom-checkbox mb-0 d-inline-block"
                        >
                          <Input
                            className="custom-control-input"
                            type="checkbox"
                            id="checkAll"
                            checked={
                              this.state.selectedItems.length >=
                              this.state.List.length
                            }
                            onClick={() => this.handleChangeSelectAll(true)}
                          />
                          <span
                            className={`custom-control-label ${
                              this.state.selectedItems.length > 0 &&
                              this.state.selectedItems.length <
                                this.state.List.length
                                ? "indeterminate"
                                : ""
                            }`}
                          />
                        </Label>
                      </div>
                      <DropdownToggle
                        caret
                        color="primary"
                        className="dropdown-toggle-split pl-2 pr-2"
                      />
                      <DropdownMenu right>
                        <DropdownItem>
                          <IntlMessages id="layouts.delete" />
                        </DropdownItem>
                        <DropdownItem>
                          <IntlMessages id="layouts.another-action" />
                        </DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </div>

                  <BreadcrumbItems match={this.props.match} />
                </div>

                <div className="mb-2">
                  <Button
                    color="empty"
                    className="pt-0 pl-0 d-inline-block d-md-none"
                    onClick={this.toggleDisplayOptions}
                  >
                    <IntlMessages id="layouts.display-options" />{" "}
                    <i className="simple-icon-arrow-down align-middle" />
                  </Button>
                  <Collapse
                    isOpen={this.state.displayOptionsIsOpen}
                    className="d-md-block"
                    id="displayOptions"
                  >
                   <span className="mr-3 mb-2 d-inline-block float-md-left">
                    <a
                      className={`mr-2 view-icon ${
                        this.state.displayMode === "thumblist" ? "active" : ""
                        }`}
                      onClick={() => this.changeDisplayMode("thumblist")}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                    <path className="view-icon-svg" d="M17.5,3H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" />
                    <path className="view-icon-svg" d="M3,2V3H1V2H3m.12-1H.88A.87.87,0,0,0,0,1.88V3.12A.87.87,0,0,0,.88,4H3.12A.87.87,0,0,0,4,3.12V1.88A.87.87,0,0,0,3.12,1Z" />
                    <path className="view-icon-svg" d="M3,9v1H1V9H3m.12-1H.88A.87.87,0,0,0,0,8.88v1.24A.87.87,0,0,0,.88,11H3.12A.87.87,0,0,0,4,10.12V8.88A.87.87,0,0,0,3.12,8Z" />
                    <path className="view-icon-svg" d="M3,16v1H1V16H3m.12-1H.88a.87.87,0,0,0-.88.88v1.24A.87.87,0,0,0,.88,18H3.12A.87.87,0,0,0,4,17.12V15.88A.87.87,0,0,0,3.12,15Z" />
                    <path className="view-icon-svg" d="M17.5,10H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" />
                    <path className="view-icon-svg" d="M17.5,17H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" /></svg>
                    </a>
                    <a
                      className={`mr-2 view-icon ${
                        this.state.displayMode === "imagelist" ? "active" : ""
                        }`}
                      onClick={() => this.changeDisplayMode("imagelist")}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                    <path className="view-icon-svg" d="M7,2V8H1V2H7m.12-1H.88A.87.87,0,0,0,0,1.88V8.12A.87.87,0,0,0,.88,9H7.12A.87.87,0,0,0,8,8.12V1.88A.87.87,0,0,0,7.12,1Z" />
                    <path className="view-icon-svg" d="M17,2V8H11V2h6m.12-1H10.88a.87.87,0,0,0-.88.88V8.12a.87.87,0,0,0,.88.88h6.24A.87.87,0,0,0,18,8.12V1.88A.87.87,0,0,0,17.12,1Z" />
                    <path className="view-icon-svg" d="M7,12v6H1V12H7m.12-1H.88a.87.87,0,0,0-.88.88v6.24A.87.87,0,0,0,.88,19H7.12A.87.87,0,0,0,8,18.12V11.88A.87.87,0,0,0,7.12,11Z" />
                    <path className="view-icon-svg" d="M17,12v6H11V12h6m.12-1H10.88a.87.87,0,0,0-.88.88v6.24a.87.87,0,0,0,.88.88h6.24a.87.87,0,0,0,.88-.88V11.88a.87.87,0,0,0-.88-.88Z" /></svg>
                    </a>
                  </span>

                    <div className="d-block d-md-inline-block">
                      <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                        <DropdownToggle caret color="outline-dark" size="xs">
                          <IntlMessages id="layouts.orderby" />
                          {this.state.selectedOrderOption.label}
                        </DropdownToggle>
                        <DropdownMenu>
                          {this.state.orderOptions.map((order, index) => {
                            return (
                              <DropdownItem
                                key={index}
                                onClick={() => this.changeOrderBy(order.column)}
                              >
                                {order.label}
                              </DropdownItem>
                            );
                          })}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                        <input
                          type="text"
                          name="keyword"
                          id="search"
                          placeholder={messages["menu.search"]}
                          onKeyPress={e => this.handleKeyPress(e)}
                        />
                      </div>
                    </div>
                    <div className="float-md-right">
                      <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${
                        this.state.totalItemCount
                      } `}</span>
                      <UncontrolledDropdown className="d-inline-block">
                        <DropdownToggle caret color="outline-dark" size="xs">
                          {this.state.selectedPageSize}
                        </DropdownToggle>
                        <DropdownMenu right>
                          {this.state.pageSizes.map((size, index) => {
                            return (
                              <DropdownItem
                                key={index}
                                onClick={() => this.changePageSize(size)}
                              >
                                {size}
                              </DropdownItem>
                            );
                          })}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </Collapse>
                </div>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row>
              {this.state.List.map(product => {
                if (this.state.displayMode === "imagelist") {
                  return (
                    <Colxx
                      sm="6"
                      lg="4"
                      xl="3"
                      className="mb-3"
                      key={product.ID}
                    >
                      <ContextMenuTrigger
                        id="menu_id"
                        data={product.ID}
                        collect={collect}
                      >
                        <Card
                          onClick={event =>
                            this.handleCheckChange(event, product.ID)
                          }
                          className={classnames({
                            active: this.state.selectedItems.includes(
                              product.ID
                            )
                          })}
                        >
                          <div className="position-relative">
                            <NavLink
                              to={`?p=${product.ID}`}
                              className="w-40 w-sm-100"
                            >
                              <CardImg
                                top
                                alt={product.title}
                                src={product.img}
                              />
                            </NavLink>
                            <Badge
                              color={product.statusColor}
                              pill
                              className="position-absolute badge-top-left"
                            >
                              {product.status}
                            </Badge>
                          </div>
                          <CardBody>
                            <Row>
                              <Colxx xxs="2">
                                <CustomInput
                                  className="itemCheck mb-0"
                                  type="checkbox"
                                  id={`check_${product.ID}`}
                                  checked={this.state.selectedItems.includes(
                                    product.ID
                                  )}
                                  onChange={() => {}}
                                  label=""
                                />
                              </Colxx>
                              <Colxx xxs="10" className="mb-3">
                                <CardSubtitle>{product.title}</CardSubtitle>
                                <CardText className="text-muted text-small mb-0 font-weight-light">
                                  {product.date}
                                </CardText>
                              </Colxx>
                            </Row>
                          </CardBody>
                        </Card>
                      </ContextMenuTrigger>
                    </Colxx>
                  );
                } else /*if (this.state.displayMode === "thumblist")*/ {
                  return (
                    <Colxx xxs="12" key={product.ID} className="mb-3">
                      <ContextMenuTrigger
                        id="menu_id"
                        data={product.ID}
                        collect={collect}
                      >
                        <Card
                          onClick={event =>
                            this.handleCheckChange(event, product.ID)
                          }
                          className={classnames("d-flex flex-row", {
                            active: this.state.selectedItems.includes(
                              product.ID
                            )
                          })}
                        >
                          <NavLink
                            to={`?p=${product.ID}`}
                            className="d-flex"
                          >
                            <img
                              alt={product.Name}
                              src={product.Image}
                              className="list-thumbnail responsive border-0"
                            />
                          </NavLink>
                          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                              <NavLink
                                to={`?p=${product.ID}`}
                                className="w-40 w-sm-100"
                              >
                                <p className="list-item-heading mb-1 truncate">
                                  {product.ID}
                                </p>
                              </NavLink>
                              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {product.Gender}
                              </p>
                              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {product.Price}
                              </p>
                              <div className="w-15 w-sm-100">
                                <Badge color={product.statusColor} pill>
                                  {product.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_${product.ID}`}
                                checked={this.state.selectedItems.includes(
                                  product.ID
                                )}
                                onChange={() => {}}
                                label=""
                              />
                            </div>
                          </div>
                        </Card>
                      </ContextMenuTrigger>
                    </Colxx>
                  );
                } /*else {
                  return (
                    <Colxx xxs="12" key={product.id} className="mb-3">
                      <ContextMenuTrigger
                        id="menu_id"
                        data={product.id}
                        collect={collect}
                      >
                        <Card
                          onClick={event =>
                            this.handleCheckChange(event, product.id)
                          }
                          className={classnames("d-flex flex-row", {
                            active: this.state.selectedItems.includes(
                              product.id
                            )
                          })}
                        >
                          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                              <NavLink
                                to={`?p=${product.id}`}
                                className="w-40 w-sm-100"
                              >
                                <p className="list-item-heading mb-1 truncate">
                                  {product.title}
                                </p>
                              </NavLink>
                              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {product.category}
                              </p>
                              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {product.date}
                              </p>
                              <div className="w-15 w-sm-100">
                                <Badge color={product.statusColor} pill>
                                  {product.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_${product.id}`}
                                checked={this.state.selectedItems.includes(
                                  product.id
                                )}
                                onChange={() => {}}
                                label=""
                              />
                            </div>
                          </div>
                        </Card>
                      </ContextMenuTrigger>
                    </Colxx>
                  );
                }*/
              })}
              <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
                onChangePage={i => this.onChangePage(i)}
              />
            </Row>
          </div>

          <ContextMenu
            id="menu_id"
            onShow={e => this.onContextMenu(e, e.detail.data)}
          >
            <MenuItem
              onClick={this.onContextMenuClick}
              data={{ action: "edit" }}
            >
              <i className="simple-icon-note" /> <span>Edit</span>
            </MenuItem>
              <MenuItem
                  onClick={this.onContextMenuClick}
                  data={{ action: "image" }}
              >
                  <i className="simple-icon-trash" /> <span>Image</span>
              </MenuItem>
            <MenuItem
              onClick={this.onContextMenuClick}
              data={{ action: "delete" }}
            >
              <i className="simple-icon-trash" /> <span>Delete</span>
            </MenuItem>
          </ContextMenu>
        </Fragment>
      );
    }
  }
  export default injectIntl(mouseTrap(DataListLayout))
