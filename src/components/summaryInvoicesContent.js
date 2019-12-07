import React from "react";
import { connect } from 'react-redux';
import { Table, Button, Spin, Icon, message } from "antd";
import MonthlySaleSearchCriteria from './monthlySalesSearchCriteria';
import { getSummaryInvoiceSales, getYearList, getCurrencyList } from '../actions/actions'

class SummaryInvoicesContent extends React.Component {
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

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getYearList();
    this.props.getCurrencyList();
  }


  fetch = (params = {}) => { };

  handleClick = async () => {
    const searchResult = await this.setSearchCriteria.current.validateFields();
    this.props.getSummaryInvoiceSales(searchResult);
  }

  handleExport = async () => {
    // const searchResult = await this.setSearchCriteria.current.validateFields();
    // this.props.getSummaryInvoiceSales(searchResult);
    message.warn("Work in progress");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      console.log(this.props.list);
      const { list } = this.props
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = list.length;
      this.setState({
        loading: false,
        list: list,
        pagination
      });
    }
  }
  render() {
    const { loading, currencyList, yearList } = this.props;
    const { list, pagination } = this.state;
    const columns = [
      {
        title: "Country",
        dataIndex: "Country",
      },
      {
        title: "AAT",
        dataIndex: "AAT",
        render: (value) => {
          return value ? value : '-';
        }
      },
      {
        title: "ACCA",
        dataIndex: "ACCA",
        render: (value) => {
          return value ? value : '-';
        }
      },
      {
        title: "AIA",
        dataIndex: "AIA",
        render: (value) => {
          return value ? value : '-';
        }
      },
      {
        title: "CA ANZ",
        dataIndex: "CA ANZ",
        render: (value) => {
          return value ? value : '-';
        }
      },
      {
        title: "CAI",
        dataIndex: "CAI",
        render: (value) => {
          return value ? value : '-';
        }
      },
      {
        title: "CAIT",
        dataIndex: "CAIT",
        render: (value) => {
          return value ? value : '-';
        }
      },
      {
        title: "ICSA",
        dataIndex: "ICSA",
        render: (value) => {
          return value ? value : '-';
        }
      },
      {
        title: "IFA",
        dataIndex: "IFA",
        render: (value) => {
          return value ? value : '-';
        }
      },
      {
        title: "No Code",
        dataIndex: "No Code",
        render: (value) => {
          return value ? value : '-';
        }
      },
      {
        title: "Other",
        dataIndex: "Other",
        render: (value) => {
          return value ? value : '-';
        }
      },
    ];
    return (
      <>
        <h1> Summary Invoices</h1>
        <div style={{ 'textAlign': 'right' }}>
          <Button
            type="ghost"
            htmlType="submit"
            style={{ "backgroundColor": "#4c4c4c33" }}
            onClick={this.handleExport}
            title='Export to Excel'>
            <Icon type="file-excel" theme="filled" />
            Download Excel
          </Button>
        </div>

        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
          <MonthlySaleSearchCriteria
            ref={this.setSearchCriteria}
            yearList={yearList}
            currencyList={currencyList}
            isSummaryContent={true} />
          <div style={{ marginLeft: '85%', marginBottom: '2%' }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleClick}>
              Search
          </Button>
          </div>
          {list.length > 0 &&
            <Table
              columns={columns}
              rowKey={record => record.OrderId}
              dataSource={list}
              pagination={pagination}
              loading={loading}
              onChange={this.handleTableChange}
            />}
        </Spin>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { posReducer } = state;
  if (posReducer !== null && posReducer.data !== null && posReducer.yearsList && posReducer.currencyList)
    return {
      list: posReducer.data,
      yearList: posReducer.yearsList ? posReducer.yearsList : null,
      currencyList: posReducer.currencyList ? posReducer.currencyList : null,
      loading: posReducer.loading,
      error: posReducer.error,
    };
  return {
    list: null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSummaryInvoiceSales: searchCriteria => dispatch(getSummaryInvoiceSales(searchCriteria)),
    getYearList: () => dispatch(getYearList()),
    getCurrencyList: () => dispatch(getCurrencyList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryInvoicesContent);
