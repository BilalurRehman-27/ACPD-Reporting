import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Layout } from "antd";
import 'antd/dist/antd.css';

const { Header, Content } = Layout;
const buttonsStyle = {
  height: 100,
  width: 200,
  marginRight: 20,
  marginTop: 30
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

      default:
    }
    return (
      <div>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <center>
              <h1>Reporting Dashboard</h1>
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
                Monthly Sales Reports
              </Button>
              <Button
                style={buttonsStyle}
                size="large"
                type="ghost"
                onClick={() => this.handleClick("affiliateReport")}
              >
                Affiliate Sales Report
              </Button>
              <Button
                style={buttonsStyle}
                size="large"
                type="dashed"
                onClick={() => this.handleClick("invoiceData")}
              >
                Invoice Data
              </Button>
            </div>
            <Button style={buttonsStyle} size="large" type="danger"
              onClick={() => this.handleClick("royalAuthority")}>
              Author Royalties
            </Button>
            <Button style={buttonsStyle} size="large" type="default">
              Misc
            </Button>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Dashboard;
