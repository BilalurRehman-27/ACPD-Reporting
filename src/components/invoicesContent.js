import React from "react";
import { connect } from 'react-redux';
import { Table, Button, Spin, Input, InputNumber, Popconfirm, Form } from "antd";
import MonthlySaleSearchCriteria from './monthlySalesSearchCriteria';
import { getInvoicesData, getYearList, getCurrencyList } from '../actions/actions'
import { apiCall } from '../Services/API';

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class InvoicesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      searchText: "",
      editingKey: '',
      mockData: {},
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
      console.log(this.props.list);
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
  isEditing = record => record.RowNumber === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

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
    this.setState({ editingKey: key });
  }

  resetObject = (obj) => {
    let newObject = {};
    Object.keys(obj).map(key => {
      if (key === 'RowNumber')
        return newObject[key] = 0;
      else
        return newObject[key] = '';
    })
    newObject.isNewObject = true;
    return newObject;
  }

  handleAdd = () => {
    const { mockData, list } = this.state;
    const formattedObject = this.resetObject(mockData);
    this.setState({
      list: [...list, formattedObject],
    });
  };



  render() {
    const { loading, currencyList, yearList } = this.props;
    const { list } = this.state;
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = [
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Button type='ghost'
                    onClick={() => this.save(form, record.RowNumber)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.RowNumber)}>
                <Button type='ghost'>Cancel</Button>
              </Popconfirm>
            </span>
          ) : (
              <Button type='ghost' disabled={editingKey !== ''} onClick={() => this.edit(record.RowNumber)}>
                Edit
            </Button>
            );
        },
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

    const editableColumns = columns.map(col => {
      if (col.dataIndex === 'operation') {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: (col.dataIndex === 'TotalTax' ||
            col.dataIndex === 'TotalPrice' ||
            col.dataIndex === 'Revenue' ||
            col.dataIndex === 'Orders' ||
            col.dataIndex === 'Invoices' ||
            col.dataIndex === 'TotalPrice' ||
            col.dataIndex === 'TotalPrice') ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        })
      };
    });

    return (
      <>
        <h1> Invoices</h1>
        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
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
              <EditableContext.Provider value={this.props.form}>
                <Table
                  scroll={{ x: 1350 }}
                  components={components}
                  bordered
                  rowKey={record => record.RowNumber}
                  dataSource={list}
                  columns={editableColumns}
                  loading={loading}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: this.cancel,
                  }}
                />
              </EditableContext.Provider>
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
