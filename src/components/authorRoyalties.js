import React from "react";
import { Layout } from "antd";
import "../App.css";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import AuthorRoyaltiesContent from "./authorRoyaltiesContent";

const { Content } = Layout;

class AuthorRoyalties extends React.Component {
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
              <AuthorRoyaltiesContent />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default AuthorRoyalties;
