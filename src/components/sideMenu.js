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
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[navigationKey]}
          onClick={this.handleClick}
        >
          <Menu.Item key="0">
            <Icon type="dashboard" />
            <span className="nav-text"> Monthly Reports</span>
            <NavLink to="/monthlyReport" />
          </Menu.Item>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text"> Direct sales</span>
            <NavLink to="/directSales" />
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">Summary (DS) </span>
            <NavLink to="/summaryDS" />
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">Invoices</span>
            <NavLink to="/invoices" />
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
            <span className="nav-text">Summary (Invoices)</span>
            <NavLink to="/summaryInvoices" />
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideMenu;
