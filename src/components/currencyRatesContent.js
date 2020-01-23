import React from "react";
import { connect } from "react-redux";
import { Table, Button, Spin } from "antd";
import { getCurrencyRatesList, getYearList, getCurrencyList, } from "../actions/actions";
import CurrencyRatesModal from "./currencyRatesModal";
import { apiCall } from "../Services/API";

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
      visible: false
    };
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
    this.props.getCurrencyRatesList();
    this.props.getCurrencyList();
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
        pagination
      });
    }
  }

  edit(key) {
    this.setState({
      editedObject: key,
      isEdit: true,
      visible: true,
      shouldPopupOpen: true
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
      isEdit: false
    });
  };

  getMonth = key => {
    switch (key) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        break;
    }
  };

  setModalStatus = (status, shouldRefresh) => {
    if (shouldRefresh) {
      this.props.getCurrencyRatesList();
    }
    this.setState({
      visible: status
    });
  };

  render() {
    const { loading, yearList,currencyList } = this.props;
    const { pagination } = this.state;
    const {
      list,
      shouldPopupOpen,
      visible = false,
      editedObject,
      isEdit
    } = this.state;
    const columns = [
      {
        title: "Action",
        render: record => (
          <>
            <Button type="primary" onClick={() => this.edit({ record })}>
              Edit
            </Button>{" "}
            &nbsp;{" "}
            <Button type="danger" onClick={() => this.delete(record)}>
              Delete
            </Button>
          </>
        )
      },
      {
        title: "Month",
        dataIndex: "Month",
        key: "Month",
        render: text => <span>{this.getMonth(text)}</span>
      },
      {
        title: "Year",
        dataIndex: "Year",
        key: "Year"
      },
      {
        title: "Currency",
        dataIndex: "CurrencyCode",
        render: text => <span>{text}</span>
      },
      {
        title: "Rate",
        dataIndex: "Rate",
        render: text => <span>{text}</span>
      },
      {
        title: "Quarter",
        dataIndex: "Quarter",
        render: text => <span>{text}</span>
      }
    ];
    return (
      <>
        <h1>Currency Rates</h1>
        <hr />
        <Spin
          tip="Please wait !!! While we get the content..."
          spinning={loading}
        >
          {shouldPopupOpen && (
            <CurrencyRatesModal
              getModalStatus={this.setModalStatus}
              visible={visible}
              yearsList={yearList}
              data={editedObject}
              isEdit={isEdit}
              currencyList={currencyList}
            />
          )}

          {list.length > 0 && (
            <div style={{ paddingBottom: 50 }}>
              <Button
                onClick={this.handleAdd}
                type="primary"
                style={{
                  marginBottom: 16,
                  float: "left",
                  backgroundColor: "green"
                }}
              >
                Add Record{" "}
              </Button>
            </div>
          )}
          {list.length > 0 && (
            <>
              <Table
                key={record => record.ID}
                rowkey={record => record.ID}
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
    posReducer.currencyList &&
    posReducer.yearsList &&
    posReducer.yearsList.length > 0 &&
    posReducer.currencyRatesList &&
    posReducer.currencyRatesList.length > 0
  )
    return {
      yearList: posReducer.yearsList ? posReducer.yearsList : null,
      currencyList: posReducer.currencyList ? posReducer.currencyList : null,
      list: posReducer.currencyRatesList,
      loading: posReducer.loading,
      error: posReducer.error
    };
  return {
    list: null,
    loading: posReducer.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCurrencyRatesList: () => dispatch(getCurrencyRatesList()),
    getYearList: () => dispatch(getYearList()),
    getCurrencyList: () => dispatch(getCurrencyList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyRatesContent);
