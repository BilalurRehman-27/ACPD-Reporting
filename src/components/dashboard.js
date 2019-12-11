import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Layout, Icon } from "antd";
import 'antd/dist/antd.css';
import Logo from './logo.jsx';

const { Header, Content } = Layout;
const buttonsStyle = {
  height: 100,
  width: 220,
  marginRight: 20,
  marginTop: 30,
  backgroundColor: 'grey'
};

const buttonsStyle2 = {
  height: 100,
  width: 220,
  marginRight: 20,
  marginTop: 30
};
const buttonsStyle3 = {
  height: 100,
  width: 200,
  marginRight: 20,
  marginTop: 30,
  backgroundColor: 'burlywood'
};
const buttonsStyle4 = {
  height: 100,
  width: 200,
  marginRight: 20,
  marginTop: 30
};

const buttonsStyle5 = {
  height: 100,
  width: 200,
  marginRight: 20,
  marginTop: 30,
  backgroundColor: 'peru'
};
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReport: ""
    };
  }

  handleClick(report) {
    this.setState({
      selectedReport: report
    });
  }
  render() {
    const isSessionValid = localStorage.getItem('Access_Token');
    if (!isSessionValid) return <Redirect to="/" />;
    const { selectedReport } = this.state;
    switch (selectedReport) {
      case "monthlyReport":
        return <Redirect to="/directSales" />;
      case "affiliateReport":
        return <Redirect to="/affiliateReport" />;
      case "invoiceData":
        return <Redirect to="/uploadInvoiceData" />;
      case "royalAuthority":
        return <Redirect to="/authorRoyalties" />;
      case "misc":
        return <Redirect to="/promotionCodes" />;
      default:
    }
    return (
      <div>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <center>
              <Logo />
              <h1><b>Reporting Dashboard</b></h1>
            </center>
          </Header>
          <Content

            style={{
              margin: "24px 16px",
              padding: 15,
              background: "#fff",
              height: "calc(100vh - 15vh)",
              textAlign: "center"
            }}
          >
            <div>
              <Button
                style={buttonsStyle}
                size="large"
                type="primary"
                onClick={() => this.handleClick("monthlyReport")}
              >
                <Icon type="bug" theme="filled" />
                &nbsp;<b>Monthly Sales Reports</b>
              </Button>
              <Button
                style={buttonsStyle2}
                size="large"
                type="primary"
                onClick={() => this.handleClick("affiliateReport")}
              >
                <Icon type="compass" theme="filled" />
                &nbsp;<b>Affiliate Sales Report</b>
              </Button>
              <Button
                style={buttonsStyle3}
                size="large"
                type="dashed"
                onClick={() => this.handleClick("invoiceData")}
              >
                <Icon type="dingtalk-square" theme="filled" />
                &nbsp;<b>Invoice Data</b>
              </Button>
            </div>
            <Button style={buttonsStyle4} size="large" type="danger"
              onClick={() => this.handleClick("royalAuthority")}>
              <Icon type="insurance" theme="filled" />
              &nbsp;<b>Author Royalties</b>
            </Button>
            <Button style={buttonsStyle5} size="large" type="default"
              onClick={() => this.handleClick("misc")}>
              <Icon type="pushpin" theme="filled" />
              &nbsp;<b>Misc</b>
            </Button>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Dashboard;
