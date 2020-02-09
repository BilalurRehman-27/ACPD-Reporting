import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Spin, Icon, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { getPromotionCodesList } from '../actions/actions';
import PromotionalRatesModal from './promotionalRatesModal';

class PromotionCodesContent extends React.Component {
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
      searchText: '',
      searchedColumn: '',
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              this.handleSearch(selectedKeys, confirm, dataIndex)
            }
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type='primary'
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            size='small'
            style={{ width: 90, marginRight: 8 }}
          >
            Search
        </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
        </Button>
        </div>
      ),
    filterIcon: filtered => (
      <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

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
    this.props.getPromotionCodesList();
  }

  fetch = (params = {}) => { };

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

  setModalStatus = (status, shouldRefresh) => {
    if (shouldRefresh) {
      this.props.getPromotionCodesList();
    }
    this.setState({
      visible: status,
    });
  };

  render() {
    const { loading } = this.props;
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
            </Button>
          </>
        ),
      },
      {
        title: 'Code',
        dataIndex: 'Promcode',
        key: 'Promcode',
        render: text => <span>{text}</span>,
        ...this.getColumnSearchProps('Promcode'),
      },
      {
        title: 'RefBy',
        dataIndex: 'RefBy',
        key: 'RefBy',
        ...this.getColumnSearchProps('RefBy'),
      },
      {
        title: 'Active',
        dataIndex: 'Active',
        render: text => <span>{text ? 'true' : 'false'}</span>,
      },
    ];

    return (
      <>
        <h1>Promotion Codes</h1>
        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
          {shouldPopupOpen && (
            <PromotionalRatesModal
              getModalStatus={this.setModalStatus}
              visible={visible}
              data={editedObject}
              isEdit={isEdit}
            />
          )}
          {list.length > 0 && (
            <div key={list.length} style={{ paddingBottom: 50 }}>
              <Button
                onClick={this.handleAdd}
                type='primary'
                style={{
                  marginBottom: 16,
                  float: 'left',
                  backgroundColor: 'green',
                }}
              >
                Add Record
              </Button>
            </div>
          )}
          {list.length > 0 && (
            <Table
              key={record => record.Id}
              bordered
              dataSource={list}
              columns={columns}
              loading={loading}
              rowClassName='editable-row'
              sorting={true}
              pagination={pagination}
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
    posReducer.promoCodesList &&
    posReducer.promoCodesList.length > 0
  )
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PromotionCodesContent);
