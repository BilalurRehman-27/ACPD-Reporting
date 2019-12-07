import React from "react";
import { connect } from 'react-redux';
import { Table, Button, Spin, Icon, message } from "antd";
import GenericSearchCriteria from './genericSearchCriteria';
import { getAffiliatedSalesReports, getYearList, getProfBodyList, downloadAffiliateReport } from '../actions/actions'

class AffiliateReportContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      profList: [],
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
  handleClick = async () => {
    const searchResult = await this.setSearchCriteria.current.validateFields();
    this.props.getAffiliatedSalesReports(searchResult);
  }
  handleExport = async () => {
    const responseData = await this.props.downloadAffiliateReport();
    message.success(responseData);
  }
  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    this.props.getAffiliatedSalesReports();
    this.props.getYearList();
    this.props.getProfBodyList();
  };
  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      const { list, yearList, profList } = this.props
      const pagination = { ...this.state.pagination };
      pagination.total = list.length;

      this.setState({
        loading: false,
        list: list,
        pagination,
        yearList: yearList,
        profList: profList
      });
    }
  }
  render() {
    const { loading } = this.props;
    const { list, pagination, yearList, profList } = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "ProfBody",
      },
      {
        title: "Description",
        dataIndex: "Description",
        width: 250,
      },
      {
        title: "Year",
        dataIndex: "Year",
      },
      {
        title: "April",
        dataIndex: "April",
      },

      {
        title: "May",
        dataIndex: "May",
      },
      {
        title: "June",
        dataIndex: "June",
      },
      {
        title: "July",
        dataIndex: "July",
      },
      {
        title: "Aug",
        dataIndex: "Aug",
      },
      {
        title: "Sept",
        dataIndex: "Sept",
      },
      {
        title: "Oct",
        dataIndex: "Oct",
      },
      {
        title: "Nov",
        dataIndex: "Nov",
      },
      {
        title: "Dec",
        dataIndex: "Dec",
      },
      {
        title: "Jan",
        dataIndex: "Jan",
      },
      {
        title: "Feb",
        dataIndex: "Feb",
      },
      {
        title: "Mar",
        dataIndex: "Mar",
      },
      {
        title: "Total",
        dataIndex: "Total",
      },
    ];
    return (
      <>
        <h1>Affiliate Report Dashboard</h1>
        <div style={{ 'textAlign': 'right' }}>
          <Button
            type="ghost"
            htmlType="submit"
            style={{ "backgroundColor": "#4c4c4c33" }}
            onClick={this.handleExport}
            title='Export to Excel'>
            <Icon type="file-excel" theme="filled" />
            Download Excel
          </Button>
        </div>

        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
          <GenericSearchCriteria
            ref={this.setSearchCriteria}
            yearsList={yearList}
            nameList={profList} />
          <div style={{ marginLeft: '85%', marginBottom: '2%' }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleClick}>
              Search
          </Button>
          </div>
          <Table
            columns={columns}
            rowKey={record => record.Id}
            dataSource={list}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </Spin>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { posReducer } = state;
  if (posReducer !== null && posReducer.data !== null && posReducer.yearsList && posReducer.profList)
    return {
      list: posReducer.data,
      loading: posReducer.loading,
      error: posReducer.error,
      yearList: posReducer.yearsList ? posReducer.yearsList : null,
      profList: posReducer.profList ? posReducer.profList : null,
    };
  return {
    list: null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAffiliatedSalesReports: searchCriteria => dispatch(getAffiliatedSalesReports(searchCriteria)),
    getYearList: () => dispatch(getYearList()),
    getProfBodyList: () => dispatch(getProfBodyList()),
    downloadAffiliateReport: () => dispatch(downloadAffiliateReport()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateReportContent);
