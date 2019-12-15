import React from "react";
import { connect } from 'react-redux';
import { Table, Button, Spin, Input, InputNumber, Popconfirm, Form } from "antd";
import { getCurrencyRatesList, getYearList } from '../actions/actions'
import CurrencyRatesModal from './currencyRatesModal'
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
class CurrencyRatesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      searchText: "",
      editingKey: '',
      mockData: {},
      isAddRecord: false,
      visible: false,
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
  }

  fetch = (params = {}) => { };

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

  isEditing = record => record.CurrencyId === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields(async (error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.list];
      const index = newData.findIndex(item => key === item.CurrencyId);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ list: newData, editingKey: '' });
        //Record to be updated according to the index(row) selected.
        if (!newData[index].isNewObject)
          await apiCall.UpdateCurrencyRates(newData[index])
        await this.props.getCurrencyRatesList();
      } else {
        newData.push(row);
        this.setState({ list: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  async delete(obj) {
    await apiCall.DeleteCurrencyRates(obj);
    await this.props.getCurrencyRatesList();
  }

  resetObject = (obj) => {
    let newObject = {};
    Object.keys(obj).map(key => {
      if (key === 'CurrencyId')
        return newObject[key] = (Math.random() % 100 + 1) * 1000;
      else
        return newObject[key] = '';
    })
    newObject.isNewObject = true;
    return newObject;
  }

  handleAdd = () => {
    this.setState({
      isAddRecord: true,
      visible: true,
    });
  };

  setModalStatus = status => {
    this.setState({
      visible: status,
    });
    this.props.getCurrencyRatesList();
  };

  render() {
    const { loading, yearList } = this.props;
    const { list, isAddRecord, visible = '' } = this.state;
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = [
      {
        title: 'operation',
        dataIndex: 'operation',
        width: 200,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Button type='primary'
                    onClick={() => this.save(form, record.CurrencyId)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.CurrencyId)}>
                <Button type='primary'>Cancel</Button>
              </Popconfirm>
            </span>
          ) : (
              <>
                <Button type='primary' disabled={editingKey !== ''} onClick={() => this.edit(record.CurrencyId)}>
                  Edit
            </Button>&nbsp;
                <Button type='danger' disabled={editingKey !== ''} onClick={() => this.delete(record)}>
                  Delete
         </Button>
              </>
            );
        },
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

    const editableColumns = columns.map(col => {
      if (col.dataIndex === 'operation') {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        })
      };
    });
    return (
      <>
        <h1>Currency Rates</h1>
        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
          {isAddRecord && (
            <CurrencyRatesModal
              getModalStatus={this.setModalStatus}
              visible={visible}
              yearsList={yearList}
            />
          )}
          {list.length > 0 &&
            <div style={{ paddingBottom: 50 }}>
              <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, float: 'left', backgroundColor: 'green' }}>
                Add Record </Button>
            </div>
          }
          {list.length > 0 &&
            <>
              <EditableContext.Provider value={this.props.form}>
                <Table
                  components={components}
                  bordered
                  rowKey={record => record.CurrencyId}
                  dataSource={list}
                  columns={editableColumns}
                  loading={loading}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: this.cancel,
                  }}
                  sorting={true}
                />
              </EditableContext.Provider>
            </>
          }
        </Spin>
      </>
    );
  }
}
const EditableFormTable = Form.create()(CurrencyRatesContent);

const mapStateToProps = (state) => {
  const { posReducer } = state;
  if (posReducer !== null
    && posReducer.yearsList
    && posReducer.yearsList.length > 0
    && posReducer.currencyRatesList
    && posReducer.currencyRatesList.length > 0)
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

export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);
