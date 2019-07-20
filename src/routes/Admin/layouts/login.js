import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "Components/CustomBootstrap";
import { connect } from "react-redux";
import { loginUser } from "Redux/actions";
import { css } from 'glamor';
let form = css({
  color: 'red',
  position: 'unset',
  overFlowY: 'unset',
  height: 'unset',
})
let logo = css({
  backgroundImage: "url(../../assets/img/logo/logo2.png)",
  backgroundRepeat: "no-repeat",
  height: '45px',
  width: '160px',
  margin: '0 auto',
  backgroundSize: 'contain',

})
class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  /*onUserLogin() {
    console.log(this.state.email);
    console.log(this.state.password);
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.loginUser(this.state, this.props.history);
    }
  }*/
  onUserLogin = (event) => {

    event.preventDefault();
    let email = event.target.username.value;
    let password = event.target.password.value;
    let user = {email: email, password: password}
    if(email!="" && password!=""){
      this.props.loginUser(user, this.props.history);
    }

  }
  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">FREEDOM STREETWEAR</p>
                    <p className="white mb-0">
                      Chức năng đăng nhập hiện tại chỉ dành cho quản trị viên.
                      <br />
                      Chúng tôi xin lỗi vì sự bất tiện này
                      {/*<br />
                      If you are not a member, please{" "}
                      <NavLink to={`/register`} className="white">
                        Đăng kí
                      </NavLink>
                      .*/}
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <div>
                        <div  {...logo}></div>
                      </div>
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.login-title" />
                    </CardTitle>
                    <Form onSubmit={this.onUserLogin}>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="text"  name="username"/>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="password" name ="password" />
                        <IntlMessages
                          id="user.password"
                        />
                      </Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/forgot-password`}>
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          type="submit"
                        >
                          <IntlMessages id="user.login-button" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(LoginLayout);
