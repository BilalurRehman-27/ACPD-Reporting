import React from "react";
import { Button, Icon, Upload, message, Layout } from "antd";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import InvoiceSideMenu from './invoiceSideMenu';

const { Content } = Layout;

class UploadCSVInvoice extends React.Component {
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
      action: 'http://52.151.114.149/ACPDReporting/api/DirectSales/file/upload',
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
      <>
        <Layout>
          <InvoiceSideMenu navKey="3" />
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
              <h1>Upload Invoice ( CSV Only)</h1>
              <hr></hr>
              <Upload {...props}
                accept=".csv"
                showUploadList={true}
              >
                <Button>
                  <Icon type="upload" /> Click to Upload</Button>
              </Upload>
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default UploadCSVInvoice;
