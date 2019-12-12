import React from "react";
import { connect } from 'react-redux';
import { Table, Button, Spin, Input, InputNumber, Popconfirm, Form } from "antd";
import { getPromotionCodesList } from '../actions/actions'
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
class PromotionCodesContent extends React.Component {
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
    this.props.getPromotionCodesList();
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

  isEditing = record => record.Id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.list];
      const index = newData.findIndex(item => key === item.Id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ list: newData, editingKey: '' });
        //Record to be updated according to the index(row) selected.
        if (!newData[index].isNewObject)
          apiCall.UpdatePromoCodes(newData[index])
        else {
          delete newData[index].Id;
          apiCall.AddPromoCodes(newData[index])
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
      if (key === 'Id')
        return newObject[key] = (Math.random() % 100 + 1);
      else
        return newObject[key] = '';
    })
    newObject.isNewObject = true;
    return newObject;
  }

  handleAdd = () => {
    const { mockData, list } = this.state;
    const formattedObject = this.resetObject(mockData);
    list.unshift(formattedObject);
    this.setState({
      list: [...list],
    });
  };

  render() {
    const { loading } = this.props;
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
                    onClick={() => this.save(form, record.Id)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.Id)}>
                <Button type='ghost'>Cancel</Button>
              </Popconfirm>
            </span>
          ) : (
              <Button type='ghost' disabled={editingKey !== ''} onClick={() => this.edit(record.Id)}>
                Edit
            </Button>
            );
        },
      },
      {
        title: 'Code',
        dataIndex: 'Promcode',
        key: 'Promcode',
        render: text => <span>{text}</span>,
      },
      {
        title: 'RefBy',
        dataIndex: 'RefBy',
        key: 'RefBy',
      },
      {
        title: 'Active',
        dataIndex: 'Active',
        render: text => <span>{text ? 'true' : 'false'}</span>,
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
          inputType:
            (col.dataIndex === 'Promcode' ||
              col.dataIndex === 'RefBy' ||
              col.dataIndex === 'Active') ? 'text' : 'bool',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        })
      };
    });
    return (
      <>
        <h1>Promotion Codes</h1>
        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
          {list.length > 0 &&
            <div style={{ paddingBottom: 50 }}>
              <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, float: 'left' }}>Add a row</Button>
            </div>
          }
          {list.length > 0 &&
            <>
              <EditableContext.Provider value={this.props.form}>
                <Table
                  components={components}
                  bordered
                  rowKey={record => record.Id}
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
const EditableFormTable = Form.create()(PromotionCodesContent);

const mapStateToProps = (state) => {
  const { posReducer } = state;
  if (posReducer !== null && posReducer.promoCodesList && posReducer.promoCodesList.length > 0)
    return {
      list: posReducer.promoCodesList,
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
    getPromotionCodesList: () => dispatch(getPromotionCodesList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);
