import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Spin, Icon, message } from 'antd';
import { apiCall } from '../Services/API';
import MonthlySaleSearchCriteria from './monthlySalesSearchCriteria';
import {
  getDirectSales,
  getYearList,
  getCurrencyList,
} from '../actions/actions';

class DirectSalesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      currencyList: [],
      yearList: [],
    };
    this.setSearchCriteria = React.createRef();
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getYearList();
    this.props.getCurrencyList();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = (params = {}) => {};

  handleClick = async () => {
    const searchResult = await this.setSearchCriteria.current.validateFields();
    console.log(searchResult);
    this.props.getDirectSales(searchResult);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      const { list } = this.props;
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = list.length;
      this.setState({
        loading: false,
        list: list,
        pagination,
      });
    }
  }

  handleExport = async () => {
    const searchResult = await this.setSearchCriteria.current.validateFields();
    apiCall.DownloadDirectSalesMonthlyReport(searchResult);
    message.success('Done');
  };

  render() {
    const { loading, currencyList, yearList } = this.props;
    const { list, pagination } = this.state;
    const columns = [
      {
        title: 'First Name',
        dataIndex: 'FirstName',
        sorter: true,
        render: name => {
          return `${name}`;
        },
        fixed: 'left',
      },
      {
        title: 'Last Name',
        dataIndex: 'LastName',
        sorter: true,
        render: lastName => {
          return `${lastName}`;
        },
        fixed: 'left',
      },
      {
        title: 'Country',
        dataIndex: 'Country',
        render: country => {
          return `${country}`;
        },
      },
      {
        title: 'Total Price',
        dataIndex: 'TotalPrice',
      },

      {
        title: 'Total Tax',
        dataIndex: 'TotalTax',
      },
      {
        title: 'Revenue',
        dataIndex: 'Revenue',
      },
      {
        title: 'Created Date',
        dataIndex: 'CreatedDate',
        render: date => {
          return new Date(date).toLocaleDateString();
        },
      },
      {
        title: 'Item Name',
        dataIndex: 'OrderItemName',
      },
      {
        title: 'Sales Main Id',
        dataIndex: 'OrderId',
      },
      {
        title: 'Ref By',
        dataIndex: 'RefBy',
      },
      {
        title: 'Promo Code',
        dataIndex: 'PromotionalCode',
        fixed: 'right',
      },
    ];
    return (
      <>
        <h1> Direct Sales</h1>
        <div style={{ textAlign: 'right' }}>
          <Button
            type='ghost'
            htmlType='submit'
            style={{ backgroundColor: '#4c4c4c33' }}
            onClick={this.handleExport}
            title='Export to Excel'
          >
            <Icon type='file-excel' theme='filled' />
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
          />
          <div style={{ marginLeft: '85%', marginBottom: '2%' }}>
            <Button type='primary' htmlType='submit' onClick={this.handleClick}>
              Search
            </Button>
          </div>
          {list.length > 0 && (
            <Table
              scroll={{ x: 1300 }}
              columns={columns}
              rowKey={record => record.OrderId}
              dataSource={list}
              pagination={pagination}
              loading={loading}
              onChange={this.handleTableChange}
            />
          )}
        </Spin>
      </>
    );
  }
}
const mapStateToProps = state => {
  const { posReducer } = state;
  if (
    posReducer !== null &&
    posReducer.data !== null &&
    posReducer.yearsList &&
    posReducer.currencyList
  )
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
    getDirectSales: searchCriteria => dispatch(getDirectSales(searchCriteria)),
    getYearList: () => dispatch(getYearList()),
    getCurrencyList: () => dispatch(getCurrencyList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectSalesContent);
