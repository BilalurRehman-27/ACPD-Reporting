import React from "react";
import { Redirect } from "react-router-dom";
import { Layout, Button, Icon } from "antd";

const { Header } = Layout;

class HeaderDesign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomeRouteClicked: false,
      isLoggedOutSuccessful: false
    };
  }

  handleClick = () => {
    this.setState({
      isHomeRouteClicked: true
    });
  };

  handleLogoutClick = () => {
    localStorage.removeItem('uid');
    this.setState({
      isLoggedOutSuccessful: true
    })
  }
  render() {
    const { isHomeRouteClicked, isLoggedOutSuccessful } = this.state;
    if (isHomeRouteClicked) {
      return <Redirect to="/dashboard" />;
    }
    if (isLoggedOutSuccessful)
      return <Redirect to="/" />;
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Button
            onClick={this.handleLogoutClick}
            size="default"
            type="danger"
            style={{ float: "right", margin: 10 }}
          >
            <Icon type="logout" />
            Logout
          </Button>
          <Button
            onClick={this.handleClick}
            size="default"
            type="primary"
            style={{ float: "right", margin: 10 }}
          >
            <Icon type="backward" theme="filled" />
            Go to Dashboard
          </Button>

        </Header>
      </Layout>
    );
  }
}

export default HeaderDesign;
