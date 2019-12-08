import React from "react";
import { connect } from 'react-redux';
import { Button, Icon, Upload, message, Layout } from "antd";
import { getInvoicesData } from '../actions/actions'
import HeaderMenu from "./header";
import FooterMenu from "./footer";

const { Content } = Layout;

class InvoicesContent extends React.Component {
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
    const props = {
      name: 'file',
      type: 'POST',
      action: 'http://52.151.114.149/acpdreporting/api/invoice/UpdateInvoiceData',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryoCoWNN0H9G5MODKB',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <><Layout>
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
            <h1>Upload Invoice ( Excel & CSV Only)</h1>
            <hr></hr>
            <Upload {...props}
              accept=".xlsx, .csv"
              showUploadList={true}
            >
              <Button>
                <Icon type="upload" /> Click to Upload
    </Button>
            </Upload>
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesContent);