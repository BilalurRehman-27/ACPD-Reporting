import React from "react";
import { Layout } from "antd";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import SideMenu from "./sideMenu";
import SummaryDirectSalesContent from './summaryDSContent'
import { Redirect } from "react-router-dom";
const { Content } = Layout;

class SummaryDirectSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isSessionValid = localStorage.getItem('Access_Token');
    if (!isSessionValid) return <Redirect to="/" />;
    return (
      <>
        <Layout>
          <SideMenu navKey="2" />
          <Layout>
            <HeaderMenu />
            <Content
              style={{
                margin: "24px 16px",
                padding: 15,
                background: "#fff",
                minHeight: "100vh",
                textAlign: "center"
              }}
            >
              <SummaryDirectSalesContent />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default SummaryDirectSales;
