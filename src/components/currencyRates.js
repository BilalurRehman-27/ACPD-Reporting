import React from "react";
import { Table, Layout } from "antd";
import HeaderMenu from "./header";
import FooterMenu from "./footer";
import MiscellaneousSideMenu from './miscellaneousSideMenu';

const { Content } = Layout;

class CurrencyRates extends React.Component {
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

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    return (
      <>
        <Layout>
          <MiscellaneousSideMenu navKey="2" />
          <Layout>
            <HeaderMenu />
            <Content
              style={{
                margin: "24px 16px",
                padding: 15,
                background: "#fff",
                minHeight: "100vh",
                textAlign: "center"
              }}
            >
              <h1>Currency Rates</h1>
              <hr></hr>
              <Table columns={columns} dataSource={data} />
            </Content>
            <FooterMenu />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default CurrencyRates;
