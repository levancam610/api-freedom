
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const { SubMenu }  = Menu;
const logoStyle = {
    position: "absolute",
    backgroundImage: "url(../../assets/img/logo/logo2.png)",
    backgroundRepeat: "no-repeat",
    height: '70px',
    width: '300px',
};
class MenuHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'home',
        };
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
        if(e.key=="login"){
            this.props.history.push("/login");
        }
    };

    render() {
        return (
            <div className="homeMenu">
                <div className="homeLogo" style={logoStyle}></div>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="home">
                        <Icon type="home" />
                        Trang chủ
                    </Menu.Item>
                    <SubMenu
                        title={
                            <span className="submenu-title-wrapper">
              <Icon type="ordered-list" />
              Sản phẩm
            </span>
                        }
                    >
                        <Menu.ItemGroup title="Áo">
                            <Menu.Item key="category:1">T-shirt</Menu.Item>
                            <Menu.Item key="category:2">Áo Longtee basic</Menu.Item>
                            <Menu.Item key="category:3">Áo thun tay dài</Menu.Item>
                            <Menu.Item key="category:4">Áo khoác Hoodie</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Quần">
                            <Menu.Item key="category:5">Jogger</Menu.Item>
                            <Menu.Item key="category:6">Khác</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item key="login">
                        <Icon type="login" />
                        Đăng nhập
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default MenuHome