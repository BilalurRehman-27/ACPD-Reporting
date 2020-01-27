import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Spin, Icon, message } from 'antd';
import AuthorRoyaltySearchCriteria from './authorRoyaltySearchCriteria';
import {
  getAuthorRoyaltiesSale,
  getYearList,
  getAuthorList,
  downloadAuthorRoyalties,
} from '../actions/actions';

class AuthorRoyaltiesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      authorList: [],
      yearList: [],
    };
    this.setSearchCriteria = React.createRef();
  }

  componentDidMount() {
    this.fetch();
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
  handleClick = async () => {
    this.setState({ loading: true });
    const searchResult = await this.setSearchCriteria.current.validateFields();
    this.props.getAuthorRoyaltiesSale(searchResult);
  };
  handleExport = async () => {
    const searchResult = await this.setSearchCriteria.current.validateFields();
    await this.props.downloadAuthorRoyalties(searchResult);
    message.info('Please wait.. Your file will be downloaded shortly');
  };
  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    this.props.getAuthorRoyaltiesSale();
    this.props.getYearList();
    this.props.getAuthorList();
  };
  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      const { list, yearList, authorList } = this.props;
      const pagination = { ...this.state.pagination };
      pagination.total = list && list.length;

      this.setState({
        loading: false,
        list: list,
        pagination,
        yearList: yearList,
        authorList: authorList,
      });
    }
  }
  render() {
    const { list, pagination, yearList, authorList, loading } = this.state;
    const columns = [
      {
        title: 'Course',
        dataIndex: 'Course',
      },
      {
        title: 'Revenue',
        dataIndex: 'Revenue',
      },
      {
        title: 'UnitsPurchased',
        dataIndex: 'UnitsPurchased',
      },
    ];
    return (
      <>
        <h1>Royal Authorities Report Dashboard</h1>
        <div style={{ textAlign: 'right' }}>
          <Button
            type='ghost'
            htmlType='submit'
            style={{ backgroundColor: '#4c4c4c33' }}
            onClick={this.handleExport}
            title='Export to Excel'
            loading={loading}
          >
            Download Excel
            <Icon type='file-excel' theme='filled' />
          </Button>
        </div>

        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
          <AuthorRoyaltySearchCriteria
            ref={this.setSearchCriteria}
            yearsList={yearList}
            nameList={authorList}
          />
          <div style={{ marginLeft: '85%', marginBottom: '2%' }}>
            <Button type='primary' htmlType='submit' onClick={this.handleClick}>
              Search
            </Button>
          </div>
          {list.length > 0 && (
            <>
              <Table
                columns={columns}
                rowKey={record => record.ID}
                dataSource={list}
                pagination={pagination}
                loading={loading}
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
    posReducer.data &&
    posReducer.data.length !== 0 &&
    posReducer.yearsList &&
    posReducer.yearsList.length !== 0 &&
    posReducer.authorList &&
    posReducer.authorList.length !== 0
  )
    return {
      list: posReducer.data,
      loading: posReducer.loading,
      error: posReducer.error,
      yearList: posReducer.yearsList ? posReducer.yearsList : null,
      authorList: posReducer.authorList ? posReducer.authorList : null,
    };
  return {
    list: null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAuthorRoyaltiesSale: searchCriteria =>
      dispatch(getAuthorRoyaltiesSale(searchCriteria)),
    getYearList: () => dispatch(getYearList()),
    getAuthorList: () => dispatch(getAuthorList()),
    downloadAuthorRoyalties: async data =>
      dispatch(downloadAuthorRoyalties(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorRoyaltiesContent);
