import React from "react";
import { connect } from 'react-redux';
import { Table, Button, Spin } from "antd";
import MonthlySaleSearchCriteria from './monthlySalesSearchCriteria';
import { getDirectSales } from '../actions/actions'

class DirectSalesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      searchText: "",
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

  fetch = (params = {}) => { };

  handleClick = async () => {
    const searchResult = await this.setSearchCriteria.current.validateFields();
    console.log(searchResult);
    this.props.getDirectSales(searchResult);
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
        pagination
      });
    }
  }

  render() {
    const { loading } = this.props;
    const { list, pagination } = this.state;
    const columns = [
      {
        title: "ID",
        dataIndex: "OrderId",
        sorter: true,
        render: id => {
          return id;
        },
        fixed: "left"
      },
      {
        title: "First Name",
        dataIndex: "FirstName",
        sorter: true,
        render: name => {
          return `${name}`;
        },
        fixed: "left",
        width: 100
      },
      {
        title: "Last Name",
        dataIndex: "LastName",
        sorter: true,
        render: lastName => {
          return `${lastName}`;
        },
        fixed: "left",
        width: 100
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
        dataIndex: "TotalPrice",
      },

      {
        title: "Total Tax",
        dataIndex: "TotalTax",
      },
      {
        title: "Revenue",
        dataIndex: "Revenue",
      },
      {
        title: "Created Date",
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
        title: "Item Code",
        dataIndex: "OrderItemCode",
      },
      {
        title: "Quantity",
        dataIndex: "Quantity",

      },
      {
        title: "Orders",
        dataIndex: "Orders",
      },
      {
        title: "Promo Code",
        dataIndex: "PromotionalCode",

      },
      {
        title: "Status",
        dataIndex: "Status",

      },
      {
        title: "Currency",
        dataIndex: "CurrencyCode",
        fixed: "right"
      },
    ];
    return (
      <>
        <h1> Direct Sales</h1>
        <hr />
        <Spin
          tip='Please wait !!! While we get the content...'
          spinning={loading}
        >
          <MonthlySaleSearchCriteria ref={this.setSearchCriteria} />
          <div style={{ marginLeft: '85%', marginBottom: '2%' }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleClick}>
              Search
          </Button>
          </div>
          {list.length > 0 && <Table
            scroll={{ x: 1290 }}
            columns={columns}
            rowKey={record => record.OrderId}
            dataSource={list}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />}
        </Spin>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { posReducer } = state;
  if (posReducer !== null)
    return {
      list: posReducer.data,
      loading: posReducer.loading,
      error: posReducer.error,
    };
  return {
    list: null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDirectSales: searchCriteria => dispatch(getDirectSales(searchCriteria))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectSalesContent);
