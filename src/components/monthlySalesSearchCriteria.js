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
    const { isSummaryContent, yearList, currencyList } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Form layout="inline" style={{ margin: '2%' }} onSubmit={this.handleSubmit}>
          <Form.Item label="Month">
            {getFieldDecorator('month', {
              rules: [{ required: false, message: 'Please select valid month!' }],
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
              </Select>
            )}
          </Form.Item>
          {yearList && yearList.length && <Form.Item label="Year">
            {getFieldDecorator('year', {
              rules: [{ required: false, message: 'Please select year!' }],
            })(
              <Select style={{ width: 170 }} placeholder="Select Year">
                {yearList.map((value, index) => <Option key={index} value={value}>{value}</Option>)}
              </Select>)}
          </Form.Item>}
          {currencyList && currencyList.length && <Form.Item label="Currency">
            {getFieldDecorator('currency', {
              rules: [{ required: false, message: 'Please select currency!' }],
            })(
              <Select style={{ width: 170 }}
                placeholder="Select currency"
              >
                {currencyList.map((value, index) => <Option key={value.CurrencyId} value={value.CurrencyCode}>{value.CurrencyName}</Option>)}
              </Select>,
            )}
          </Form.Item>}
          {isSummaryContent && <Form.Item label="Category">
            {getFieldDecorator('category', {
              initialValue: "1",
              rules: [{ required: false, message: 'Please select category!' }],
            })(
              <Select style={{ width: 170 }}
                placeholder="Select category"
              >
                <Option key="1" value="1">Revenue</Option>
                <Option key="2" value="2">Order</Option>
                <Option key="3" value="3">Summary</Option>
              </Select>,
            )}
          </Form.Item>}
        </Form>
      </>
    )
  }
}

const SearchCriteriaWrapper = Form.create({ name: 'coordinated' })(SearchCriteria);
export default SearchCriteriaWrapper
