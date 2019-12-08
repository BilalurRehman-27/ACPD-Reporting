import React from "react";
import { connect } from 'react-redux';
import { Layout } from "antd";
import { getInvoicesData } from '../actions/actions'
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import InvoiceSideMenu from './invoiceSideMenu';
import InvoiceContent from './invoicesContent'

const { Content } = Layout;

class UploadInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      searchText: "",
    };
    this.setSearchCriteria = React.createRef();
  }

  render() {
    return (
      <>
        <Layout>
          <InvoiceSideMenu navKey="1" />
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
              <InvoiceContent />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { posReducer } = state;
  if (posReducer !== null)
    return {
      list: posReducer.data,
      loading: posReducer.loading,
      error: posReducer.error,
    };
  return {
    list: null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getInvoicesData: searchCriteria => dispatch(getInvoicesData(searchCriteria))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadInvoice);
