import React from "react";
import { Form, Select } from 'antd';

const { Option } = Select;

class SearchCriteria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { isSummaryContent } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Form layout="inline" style={{ margin: '2%' }} onSubmit={this.handleSubmit}>
          <Form.Item label="Month">
            {getFieldDecorator('month', {
              rules: [{ required: true, message: 'Please select valid month!' }],
            })(
              <Select style={{ width: 170 }}
                placeholder="Select Month"
              >
                <Option value="1">January</Option>
                <Option value="2">February</Option>
                <Option value="3">March</Option>
                <Option value="4">April</Option>
                <Option value="5">May</Option>
                <Option value="6">June</Option>
                <Option value="7">July</Option>
                <Option value="8">August</Option>
                <Option value="9">September</Option>
                <Option value="10">October</Option>
                <Option value="11">November</Option>
                <Option value="12">December</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="Year">
            {getFieldDecorator('year', {
              rules: [{ required: true, message: 'Please select year!' }],
            })(
              <Select style={{ width: 170 }}
                placeholder="Select Year"
              >
                <Option value="2001">2001</Option>
                <Option value="2002">2002</Option>
                <Option value="2003">2003</Option>
                <Option value="2004">2004</Option>
                <Option value="2005">2005</Option>
                <Option value="2006">2006</Option>
                <Option value="2007">2007</Option>
                <Option value="2008">2008</Option>
                <Option value="2009">2009</Option>
                <Option value="2010">2010</Option>
                <Option value="2011">2011</Option>
                <Option value="2012">2012</Option>
                <Option value="2013">2013</Option>
                <Option value="2014">2014</Option>
                <Option value="2015">2015</Option>
                <Option value="2016">2016</Option>
                <Option value="2017">2017</Option>
                <Option value="2018">2018</Option>
                <Option value="2019">2019</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="Currency">
            {getFieldDecorator('currency', {
              rules: [{ required: true, message: 'Please select currency!' }],
            })(
              <Select style={{ width: 170 }}
                placeholder="Select currency"
              >
                <Option value="GBP">GBP</Option>
                <Option value="dollar">Dollar</Option>
                <Option value="pounds">Pounds</Option>
              </Select>,
            )}
          </Form.Item>
          {isSummaryContent && <Form.Item label="Category">
            {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Please select category!' }],
            })(
              <Select style={{ width: 170 }}
                placeholder="Select category"
              >
                <Option value="1">Revenue</Option>
                <Option value="2">Order</Option>
                <Option value="3">Summary</Option>
              </Select>,
            )}
          </Form.Item>}
          {/*
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Search
          </Button>
          </Form.Item> */}
        </Form>
      </>
    )
  }
}

const SearchCriteriaWrapper = Form.create({ name: 'coordinated' })(SearchCriteria);
export default SearchCriteriaWrapper
