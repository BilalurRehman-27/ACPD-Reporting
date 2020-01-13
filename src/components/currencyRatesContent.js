import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Spin } from 'antd';
import { getCurrencyRatesList, getYearList } from '../actions/actions';
import CurrencyRatesModal from './currencyRatesModal';
import { apiCall } from '../Services/API';

class CurrencyRatesContent extends React.Component {
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
    this.props.getCurrencyRatesList();
  }

  fetch = (params = {}) => {};

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      console.log(this.props.list);
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

  async delete(obj) {
    await apiCall.DeleteCurrencyRates(obj);
    await this.props.getCurrencyRatesList();
  }

  handleAdd = () => {
    this.setState({
      shouldPopupOpen: true,
      visible: true,
      isEdit: false,
    });
  };

  setModalStatus = (status, shouldRefresh) => {
    if (shouldRefresh) {
      this.props.getCurrencyRatesList();
    }
    this.setState({
      visible: status,
    });
  };

  render() {
    const { loading, yearList } = this.props;
    const { pagination } = this.state;
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
        render: record => (
          <>
            <Button type='primary' onClick={() => this.edit({ record })}>
              Edit
            </Button>{' '}
            &nbsp;{' '}
            <Button type='danger' onClick={() => this.delete(record)}>
              Delete
            </Button>
          </>
        ),
      },
      {
        title: 'Month',
        dataIndex: 'Month',
        key: 'Month',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Year',
        dataIndex: 'Year',
        key: 'Year',
      },
      {
        title: 'Rate',
        dataIndex: 'Rate',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Quarter',
        dataIndex: 'Quarter',
        render: text => <span>{text}</span>,
      },
    ];
    return (
      <>
        <h1>Currency Rates</h1>
        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
          {shouldPopupOpen && (
            <CurrencyRatesModal
              getModalStatus={this.setModalStatus}
              visible={visible}
              yearsList={yearList}
              data={editedObject}
              isEdit={isEdit}
            />
          )}

          {list.length > 0 && (
            <div style={{ paddingBottom: 50 }}>
              <Button
                onClick={this.handleAdd}
                type='primary'
                style={{
                  marginBottom: 16,
                  float: 'left',
                  backgroundColor: 'green',
                }}
              >
                Add Record{' '}
              </Button>
            </div>
          )}
          {list.length > 0 && (
            <>
              <Table
                rowKey={record => record.CurrencyId}
                dataSource={list}
                columns={columns}
                loading={loading}
                pagination={pagination}
                onChange={this.handleTableChange}
              />
            </>
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
    posReducer.yearsList &&
    posReducer.yearsList.length > 0 &&
    posReducer.currencyRatesList &&
    posReducer.currencyRatesList.length > 0
  )
    return {
      yearList: posReducer.yearsList ? posReducer.yearsList : null,
      list: posReducer.currencyRatesList,
      loading: posReducer.loading,
      error: posReducer.error,
    };
  return {
    list: null,
    loading: posReducer.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCurrencyRatesList: () => dispatch(getCurrencyRatesList()),
    getYearList: () => dispatch(getYearList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyRatesContent);
