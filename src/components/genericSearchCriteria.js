import React from 'react';
import { Form, Select, Radio, DatePicker } from 'antd';

const { Option } = Select;

class GenericCriteria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = values.push({
          selectedRange: this.state.value,
        });
        console.log('Received values of form: ', values);
      } else {
        console.log('Received values of form: ', err);
      }
    });
  };

  render() {
    const { value } = this.state;
    const { yearsList, nameList } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='container'>
        <Form
          layout='inline'
          style={{ margin: '2%' }}
          onSubmit={this.handleSubmit}
        >
          {yearsList && yearsList.length && (
            <>
              <Form.Item label='Plesae select report'>
                {getFieldDecorator('reportRange', {
                  rules: [{ required: false }],
                  initialValue: 1,
                })(
                  <Radio.Group onChange={this.onChange}>
                    <Radio value={1}>Month</Radio>
                    <Radio value={2}>Date</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <br />
              <br />
              {value === 1 && (
                <>
                  <Form.Item label='Year From'>
                    {getFieldDecorator('fromyear', {
                      rules: [
                        { required: false, message: 'Please select year!' },
                      ],
                      initialValue: new Date().getFullYear().toString(),
                    })(
                      <Select style={{ width: 170 }} placeholder='Select Year'>
                        {yearsList.map((value, index) => (
                          <Option key={index} value={value}>
                            {value}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label='Month From'>
                    {getFieldDecorator('frommonth', {
                      rules: [
                        { required: false, message: 'Please select month!' },
                      ],
                      initialValue: new Date().toLocaleDateString('en', {
                        month: 'numeric',
                      }),
                    })(
                      <Select style={{ width: 170 }} placeholder='Select Month'>
                        <Option value='1'>January</Option>
                        <Option value='2'>February</Option>
                        <Option value='3'>March</Option>
                        <Option value='4'>April</Option>
                        <Option value='5'>May</Option>
                        <Option value='6'>June</Option>
                        <Option value='7'>July</Option>
                        <Option value='8'>August</Option>
                        <Option value='9'>September</Option>
                        <Option value='10'>October</Option>
                        <Option value='11'>November</Option>
                        <Option value='12'>December</Option>
                      </Select>
                    )}
                  </Form.Item>
                  <br />
                  <br />
                  <Form.Item label='Year To'>
                    {getFieldDecorator('toyear', {
                      rules: [
                        { required: false, message: 'Please select year!' },
                      ],
                      initialValue: new Date().getFullYear().toString(),
                    })(
                      <Select style={{ width: 170 }} placeholder='Select Year'>
                        {yearsList.map((value, index) => (
                          <Option key={index} value={value}>
                            {value}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label='Month To'>
                    {getFieldDecorator('tomonth', {
                      rules: [
                        { required: false, message: 'Please select month!' },
                      ],
                      initialValue: new Date().toLocaleDateString('en', {
                        month: 'numeric',
                      }),
                    })(
                      <Select style={{ width: 170 }} placeholder='Select Month'>
                        <Option value='1'>January</Option>
                        <Option value='2'>February</Option>
                        <Option value='3'>March</Option>
                        <Option value='4'>April</Option>
                        <Option value='5'>May</Option>
                        <Option value='6'>June</Option>
                        <Option value='7'>July</Option>
                        <Option value='8'>August</Option>
                        <Option value='9'>September</Option>
                        <Option value='10'>October</Option>
                        <Option value='11'>November</Option>
                        <Option value='12'>December</Option>
                      </Select>
                    )}
                  </Form.Item>
                  <br />
                  <br />
                </>
              )}
              {value === 2 && (
                <>
                  <Form.Item label='From Month'>
                    {getFieldDecorator('fromMonth', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input Date!',
                        },
                      ],
                    })(<DatePicker style={{ width: '100%' }} />)}
                  </Form.Item>
                  <br />
                  <br />
                  <Form.Item label='To Month'>
                    {getFieldDecorator('toMonth', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input Date!',
                        },
                      ],
                    })(<DatePicker style={{ width: '100%' }} />)}
                  </Form.Item>
                  <br />
                  <br />
                </>
              )}
              {nameList && nameList.length && (
                <Form.Item label='Professional Body'>
                  {getFieldDecorator('name', {
                    rules: [{ required: false }],
                    initialValue: nameList[0].ProfBody,
                  })(
                    <Select style={{ width: 170 }} placeholder='Select Name'>
                      {nameList.map((value, index) => (
                        <Option key={index} value={value.ProfBody}>
                          {value.ProfBody}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              )}
            </>
          )}
        </Form>
      </div>
    );
  }
}

const GenericCriteriaWrapper = Form.create({ name: 'coordinated' })(
  GenericCriteria
);
export default GenericCriteriaWrapper;
