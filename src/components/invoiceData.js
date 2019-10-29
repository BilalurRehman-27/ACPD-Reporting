import React from "react";
import { Layout } from "antd";
import "../App.css";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import InvoiceContent from "./invoicesContent";

const { Content } = Layout;

class InvoiceData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Layout>
          <Layout>
            <HeaderMenu />
            <Content
              style={{
                margin: "24px 16px",
                padding: 15,
                background: "#fff",
                minHeight: 450,
                textAlign: "center"
              }}
            >
              <InvoiceContent />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default InvoiceData;
