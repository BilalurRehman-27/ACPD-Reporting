import React from "react";
import { Form, Select } from 'antd';

const { Option } = Select;

class GenericCriteria extends React.Component {
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
      else {
        console.log('Received values of form: ', err);
      }
    });
  };

  render() {
    const { yearsList, nameList } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Form layout="inline" style={{ margin: '2%' }} onSubmit={this.handleSubmit}>
          {yearsList.length && <Form.Item label="Year">
            {getFieldDecorator('year', {
              rules: [{ required: false, message: 'Please select year!' }],
            })(
              <Select style={{ width: 170 }} placeholder="Select Year">
                {yearsList.map((value, index) => <Option key={index} value={value}>{value}</Option>)}
              </Select>)}
          </Form.Item>}
          {nameList.length && <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [{ required: false, message: 'Please select name!' }],
            })(
              <Select style={{ width: 170 }} placeholder="Select Name">
                {nameList.map((value, index) => <Option key={index} value={value.ProfBody}>{value.ProfBody}</Option>)}
              </Select>)}
          </Form.Item>}
        </Form>
      </>
    )
  }
}

const GenericCriteriaWrapper = Form.create({ name: 'coordinated' })(GenericCriteria);
export default GenericCriteriaWrapper





