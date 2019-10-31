import React from "react";
import { Table } from "antd";
//import reqwest from "reqwest";

class SummaryInvoicesContent extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    searchText: ""
  };

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

  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    // reqwest({
    //   url: "https://randomuser.me/api",
    //   method: "get",
    //   data: {
    //     results: 10,
    //     ...params
    //   },
    //   type: "json"
    // }).then(data => {
    //   const pagination = { ...this.state.pagination };
    //   // Read total count from server
    //   // pagination.total = data.totalCount;
    //   pagination.total = 200;
    //   this.setState({
    //     loading: false,
    //     data: data.results,
    //     pagination
    //   });
    // });
  };

  render() {
    const columns = [
      {
        title: "Country",
        dataIndex: "gender",
        render: () => {
          return "Pakistan";
        }
        // filters: [
        //   { text: "Male", value: "male" },
        //   { text: "Female", value: "female" }
        // ],
      },
      {
        title: "ACCA",
        dataIndex: "gender",
        render: () => {
          return "100.00";
        }
      },

      {
        title: "CAI",
        dataIndex: "gender",
        render: () => {
          return "17.0";
        }
      },
      {
        title: "No Code",
        dataIndex: "gender",
        render: () => {
          return "50.0";
        }
      },
      {
        title: "Other",
        dataIndex: "gender",
        render: () => {
          return '-';
        }
      },
      {
        title: "",
        dataIndex: "email",
      }
    ];
    return (
      <>
        <h1> Summary Invoices</h1>
        <hr />
        <Table
          scroll={{ x: 1290 }}
          columns={columns}
          rowKey={record => record.login.uuid}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </>
    );
  }
}

export default SummaryInvoicesContent;
