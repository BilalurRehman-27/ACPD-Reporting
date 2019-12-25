import React from "react";
import { connect } from 'react-redux';
import { Table, Button, Spin, Input, InputNumber, Popconfirm, Form } from "antd";
import MonthlySaleSearchCriteria from './monthlySalesSearchCriteria';
import { getInvoicesData, getYearList, getCurrencyList } from '../actions/actions'
import { apiCall } from '../Services/API';
import InvoicesModal from './invoicesModal'
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
    this.props.getInvoicesData(searchResult);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      const { list } = this.props
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


  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.list];
      const index = newData.findIndex(item => key === item.RowNumber);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ list: newData, editingKey: '' });
        //Record to be updated according to the index(row) selected.
        if (!newData[index].isNewObject)
          apiCall.UpdateInvoiceData(newData[index])
        else {
          apiCall.AddInvoiceData(newData[index])
          newData[index].isNewObject = false
        }
      } else {
        newData.push(row);
        this.setState({ list: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({
      editedObject: key,
      isEdit: true,
      visible: true,
      shouldPopupOpen: true
    });
  }


  handleAdd = () => {
    this.setState({
      shouldPopupOpen: true,
      visible: true,
      isEdit: false
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
    const { loading, currencyList, yearList } = this.props;
    const { list, shouldPopupOpen, visible = false, editedObject, isEdit } = this.state;

    const columns = [
      {
        title: 'Action',
        render: (record) =>
          <>
            <Button type='primary' onClick={() => this.edit({ record })}>
              Edit
            </Button>
          </>
      },
      {
        title: "Company Name",
        dataIndex: "CompanyName",
        sorter: true,
        render: name => {
          return `${name}`;
        },
      },
      {
        title: "First Name",
        dataIndex: "FirstName",
        sorter: true,
        render: name => {
          return `${name}`;
        },
      },
      {
        title: "Last Name",
        dataIndex: "LastName",
        sorter: true,
        render: lastName => {
          return `${lastName}`;
        },
      },
      {
        title: "Country",
        dataIndex: "Country",
      },
      {
        title: "Total Price",
        dataIndex: "TotalPrice",
      },
      {
        title: "Currency",
        dataIndex: "CurrencyCode",
      },
      {
        title: "Quantity",
        dataIndex: "Quantity",
      },
      {
        title: "Total Tax",
        dataIndex: "TotalTax",
      },
      {
        title: "SalesTypeId",
        dataIndex: "SalesTypeId",
      },
      {
        title: "Revenue Date",
        dataIndex: "CreatedDate",
        render: date => {
          return new Date(date).toLocaleDateString()
        }
      },
      {
        title: "Item Name",
        dataIndex: "OrderItemName",
      },
      {
        title: "Units",
        dataIndex: "Units",
      },
      {
        title: "Orders",
        dataIndex: "Orders",
      },
      {
        title: "Ref By",
        dataIndex: "RefBy",
        ellipsis: true,
      },
      {
        title: "Promo Code",
        dataIndex: "PromotionalCode",
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
            />
          )}
          <MonthlySaleSearchCriteria ref={this.setSearchCriteria}
            yearList={yearList}
            currencyList={currencyList}
          />
          <div style={{ marginLeft: '85%', marginBottom: '2%' }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleClick}>
              Search
          </Button>
          </div>
          {list.length > 0 &&
            <div style={{ paddingBottom: 50 }}>
              <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, float: 'left' }}>Add a row</Button>
            </div>
          }
          {list.length > 0 &&
            <>
              <Table
                bordered
                scroll={{ x: 1290 }}
                rowKey={record => record.RowNumber}
                dataSource={list}
                columns={columns}
                loading={loading}
                rowClassName="editable-row"
              />
            </>
          }
        </Spin>
      </>
    );
  }
}

const EditableFormTable = Form.create()(InvoicesContent);

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
    getInvoicesData: searchCriteria => dispatch(getInvoicesData(searchCriteria)),
    getYearList: () => dispatch(getYearList()),
    getCurrencyList: () => dispatch(getCurrencyList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);
