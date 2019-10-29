import React from "react";
import { Layout } from "antd";
import "../App.css";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import SideMenu from "./sideMenu";

const { Content } = Layout;

class MonthlyReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Layout>
          <SideMenu navKey="0" />
          <Layout>
            <HeaderMenu />
            <Content
              style={{
                margin: "24px 16px",
                padding: 15,
                background: "#fff",
                minHeight: 450,
                textAlign: "center"
              }}>
              <div style={{ padding: 20, background: "#fff", minHeight: 340 }}>
                <h1>Monthly Reports Dashboard</h1>
              </div>
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MonthlyReport;
