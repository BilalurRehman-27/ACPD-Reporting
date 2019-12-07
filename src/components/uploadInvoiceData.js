import React from "react";
import { connect } from 'react-redux';
import { Button, Icon, Upload, message } from "antd";
import { getInvoicesData } from '../actions/actions'

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
      action: 'http://52.151.114.149/acpdreporting/api/invoice/UpdateInvoiceData',
      headers: {
        'Content-Type': 'multipart/form-data'
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
        <h1> Invoices</h1>
        <hr />
        <Upload {...props}
          accept=".xlsx, .csv, .png"
          showUploadList={true}
        >
          <Button>
            <Icon type="upload" /> Click to Upload
    </Button>
        </Upload>
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
