import React from "react";
import { Layout } from "antd";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import SideMenu from "./sideMenu";
import SummaryInvoicesContent from './summaryInvoicesContent'

const { Content } = Layout;

class SummaryInvoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Layout>
          <SideMenu navKey="4" />
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
              <SummaryInvoicesContent />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default SummaryInvoices;
