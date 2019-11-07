import React from "react";
import { Layout } from "antd";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import SideMenu from "./sideMenu";
import InvoicesContent from './invoicesContent'

const { Content } = Layout;

class Invoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Layout>
          <SideMenu navKey="3" />
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
              <InvoicesContent />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default Invoices;
