import React from "react";
import { Table } from "antd";
import reqwest from "reqwest";

class InvoicesContent extends React.Component {
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
    reqwest({
      url: "https://randomuser.me/api",
      method: "get",
      data: {
        results: 10,
        ...params
      },
      type: "json"
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination
      });
    });
  };

  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "",        
        render: () => {
          return 1;
        },
        fixed: "left"
      },
      {
        title: "Company",
        dataIndex: "name",        
        render: name => {
          return 'Company Name';
        },
        fixed: "left", 
        width:80       
      },
      {
        title: "First Name",
        dataIndex: "name",        
        render: name => {
          return `${name.title} ${name.first}`;
        },
        fixed: "left",
        width: 80
      },
      {
        title: "Last Name",
        dataIndex: "name",        
        render: name => {
          return `${name.title} ${name.last}`;
        },
        fixed: "left",
        width: 80
      },
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
        title: "Total Price",
        dataIndex: "gender",
        render: () => {
          return "100.00";
        }
      },

      {
        title: "Total Tax",
        dataIndex: "gender",
        render: () => {
          return "17.0";
        }
      },
      {
        title: "Revenue",
        dataIndex: "gender",
        render: () => {
          return "50.0";
        }
      },
      {
        title: "Created Date",
        dataIndex: "gender",
        render: () => {
          return new Date().toLocaleDateString();
        }
      },
      {
        title: "Item Name",
        dataIndex: "gender",
        render: () => {
          return "Alternative Test";
        }
      },
      {
        title: "Quantity",
        dataIndex: "gender",
        render: () => {
          return "1";
        }
      },
      {
        title: "Orders",
        dataIndex: "gender",
        render: () => {
          return "1";
        }
      },
      {
        title: "Promo Code",
        dataIndex: "gender",
        render: () => {
          return "Acca101";
        }
      },
      {
        title: "Ref By",
        dataIndex: "gender",
        render: () => {
          return "Bilal";
        }
      },
      {
        title: "Gender",
        dataIndex: "gender",
        filters: [
          { text: "Male", value: "male" },
          { text: "Female", value: "female" }
        ]
      },
      {
        title: "Email",
        dataIndex: "email",
        fixed: "right"
      }
    ];
    return (
      <>
        <h1> Invoices</h1>
        <hr />
        <Table
          scroll={{ x: 1300 }}
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

export default InvoicesContent;
