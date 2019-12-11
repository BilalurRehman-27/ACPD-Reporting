import React from "react";
import { Layout } from "antd";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import MiscellaneousSideMenu from './miscellaneousSideMenu';
import PromotionCodesContent from './promotionCodesContent'
const { Content } = Layout;

class PromotionCodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Layout>
          <MiscellaneousSideMenu navKey="1" />
          <Layout>
            <HeaderMenu />
            <Content
              style={{
                margin: "24px 16px",
                padding: 10,
                background: "#fff",
                minHeight: "100vh",
                textAlign: "center"
              }}
            >
              <PromotionCodesContent />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default PromotionCodes;
