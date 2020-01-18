import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationKey: props.navKey
    };
  }

  render() {
    const { navigationKey } = this.state;
    return (
      <>
        <div className='logo' />
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[navigationKey]}
            onClick={this.handleClick}
          >
            <Menu.Item key="1">
              <Icon type="alipay-circle" theme="filled" />
              <span className="nav-text">Promotion Codes</span>
              <NavLink to="/promotionCodes" />
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="file-excel" theme="filled" />
              <span className="nav-text">Currency Rates </span>
              <NavLink to="/currencyRates" />
            </Menu.Item>
          </Menu>
        </Sider>
      </>
    );
  }
}

export default SideMenu;
