import React from "react";
import { Layout } from "antd";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import MiscellaneousSideMenu from './miscellaneousSideMenu';
import CurrencyRatesContent from './currencyRatesContent'

const { Content } = Layout;

class CurrencyRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Layout>
          <MiscellaneousSideMenu navKey="2" />
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
              <CurrencyRatesContent />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default CurrencyRates;
