import React from "react";
import { Layout } from "antd";
import "../App.css";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import AffiliateReportContent from "./affiliateReportContent";
const { Content } = Layout;

class AffiliateReport extends React.Component {
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
                minHeight: "100vh",
                textAlign: "center"
              }}
            >
              <AffiliateReportContent />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default AffiliateReport;
