import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Button, Spin, Form } from 'antd';
import MonthlySaleSearchCriteria from './monthlySalesSearchCriteria';
import {
  getInvoicesData,
  getYearList,
  getCurrencyList,
  getSalesTypeList,
  getCountryList,
  getProfBodyList,
  getCourseList,
} from '../actions/actions';
import InvoicesModal from './invoicesModal';
import { apiCall } from '../Services/API';

class InvoicesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      editedObject: {},
      shouldPopupOpen: false,
      isEdit: false,
      visible: false,
    };
    this.setSearchCriteria = React.createRef();
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

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getYearList();
    this.props.getCurrencyList();
    this.props.getSalesTypeList();
    this.props.getCountryList();
    this.props.getProfBodyList();
    this.props.getCourseList();
  }

  fetch = (params = {}) => {};

  handleClick = async () => {
    const searchResult = await this.setSearchCriteria.current.validateFields();
    this.props.getInvoicesData(searchResult);
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
        mockData: list[list.length - 1],
        pagination,
      });
    }
  }

  edit(key) {
    this.setState({
      editedObject: key,
      isEdit: true,
      visible: true,
      shouldPopupOpen: true,
    });
  }

  handleAdd = () => {
    this.setState({
      shouldPopupOpen: true,
      visible: true,
      isEdit: false,
    });
  };

  setModalStatus = async (status, shouldRefresh) => {
    if (shouldRefresh) {
      const searchResult = await this.setSearchCriteria.current.validateFields();
      this.props.getInvoicesData(searchResult);
    }
    this.setState({
      visible: status,
    });
  };

  async delete(obj) {
    await apiCall.DeleteInvoiceData(obj);
    await this.handleClick();
  }

  render() {
    const {
      loading,
      currencyList,
      yearList,
      salesTypeList,
      countryList,
      profBodyList,
      courseList,
    } = this.props;
    const {
      list,
      shouldPopupOpen,
      visible = false,
      editedObject,
      isEdit,
    } = this.state;

    const columns = [
      {
        title: 'Action',
        width: '150px',
        render: record => (
          <div key={record.InvoiceNumber}>
            <Button
              size='small'
              type='primary'
              onClick={() => this.edit({ record })}
            >
              Edit
            </Button>{' '}
            &nbsp;{' '}
            <Button
              size='small'
              type='danger'
              onClick={() => this.delete(record)}
            >
              Delete
            </Button>
          </div>
        ),
      },
      {
        key: 'InvoiceNumber',
        title: 'Invoice Number',
        width: '150px',
        dataIndex: 'InvoiceNumber',
        sorter: true,
        render: name => {
          return `${name}`;
        },
      },
      {
        key: 'FirstName',
        title: 'First Name',
        dataIndex: 'FirstName',
        sorter: true,
        render: name => {
          return `${name}`;
        },
      },
      {
        key: 'LastName',
        title: 'Last Name',
        dataIndex: 'LastName',
        sorter: true,
        render: lastName => {
          return `${lastName}`;
        },
      },
      {
        key: 'Revenue',
        title: 'Revenue',
        dataIndex: 'Revenue',
      },
      {
        title: 'SalesType',
        dataIndex: 'SalesTypeId',
        key: 'SalesTypeId',
        render: saleType => {
          const salTypeValue =
            salesTypeList &&
            salesTypeList.filter(val => {
              return val.TypeId === saleType;
            });
          return salTypeValue && salTypeValue[0].Name;
        },
      },
      {
        key: 'OrderDate',
        title: 'Date',
        dataIndex: 'OrderDate',
        render: date => {
          return moment(date).format('Do MMMM YYYY');
        },
      },
      {
        key: 'ItemName',
        title: 'Item Name',
        dataIndex: 'InvoicesItems',
        render: items =>
          items.map((item, index) => {
            return (
              <span key={index}>
                {item.ItemName}
                {items.length > 1 ? <hr /> : ''}
              </span>
            );
          }),
        width: '150px',
      },
      {
        title: 'Ref By',
        dataIndex: 'RefBy',
        ellipsis: true,
      },
    ];

    return (
      <>
        <h1> Invoices</h1>
        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
          {shouldPopupOpen && (
            <InvoicesModal
              getModalStatus={this.setModalStatus}
              visible={visible}
              yearsList={yearList}
              data={editedObject}
              isEdit={isEdit}
              salesTypeList={salesTypeList}
              countryList={countryList}
              currencyList={currencyList}
              profBodyList={profBodyList}
              courseList={courseList}
            />
          )}
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
          <div style={{ paddingBottom: 50 }}>
            <Button
              onClick={this.handleAdd}
              type='primary'
              style={{ marginBottom: 16, float: 'left' }}
            >
              Add Record
            </Button>
          </div>
          {list.length > 0 && (
            <Table
              scroll={{ x: 1300 }}
              columns={columns}
              rowKey='InvoiceNumber'
              dataSource={list}
              loading={loading}
              onChange={this.handleTableChange}
            />
          )}
        </Spin>
      </>
    );
  }
}

const EditableFormTable = Form.create()(InvoicesContent);

const mapStateToProps = state => {
  const { posReducer } = state;
  if (
    posReducer !== null &&
    posReducer.data !== null &&
    posReducer.yearsList &&
    posReducer.currencyList &&
    posReducer.courseList &&
    posReducer.profList
  )
    return {
      list: posReducer.data,
      yearList: posReducer.yearsList ? posReducer.yearsList : null,
      currencyList: posReducer.currencyList ? posReducer.currencyList : null,
      salesTypeList: posReducer.salesTypeList ? posReducer.salesTypeList : null,
      countryList: posReducer.countryList ? posReducer.countryList : null,
      profBodyList: posReducer.profList ? posReducer.profList : null,
      courseList: posReducer.courseList ? posReducer.courseList : null,
      loading: posReducer.loading,
      error: posReducer.error,
    };
  return {
    list: null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getInvoicesData: searchCriteria =>
      dispatch(getInvoicesData(searchCriteria)),
    getYearList: () => dispatch(getYearList()),
    getSalesTypeList: () => dispatch(getSalesTypeList()),
    getCurrencyList: () => dispatch(getCurrencyList()),
    getCountryList: () => dispatch(getCountryList()),
    getProfBodyList: () => dispatch(getProfBodyList()),
    getCourseList: () => dispatch(getCourseList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);
