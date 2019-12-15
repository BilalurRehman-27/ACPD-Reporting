import React from 'react'
import { Modal, Form, Input, Button, Select } from 'antd';
import { apiCall } from '../Services/API';

const { Option } = Select;

class CurrencyRatesModal extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    this.props.getModalStatus(false);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
    this.props.getModalStatus(false);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {

        console.log('Received values of form: ', values);
        await apiCall.AddCurrencyRates(values);
        this.props.getModalStatus(false);
      }
    });
  };

  render() {
    const { confirmLoading } = this.state;
    const { visible, yearsList } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="Add Record"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            null,
          ]}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item label="Month">
              {getFieldDecorator('month', {
                rules: [{ required: true, message: 'Please select valid Month!' }],
              })(
                <Select
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
            {yearsList && yearsList.length && <Form.Item label="Year">
              {getFieldDecorator('year', {
                rules: [{ required: true, message: 'Please select Year!' }],
              })(
                <Select placeholder="Select Year">
                  {yearsList.map((value, index) => <Option key={index} value={value}>{value}</Option>)}
                </Select>)}
            </Form.Item>}
            <Form.Item label="Rate">
              {getFieldDecorator('rate', {
                rules: [{ required: true, message: 'Please input your Rate!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="Rate"

                />,
              )}
            </Form.Item>
            <Form.Item label="Quarter">
              {getFieldDecorator('quarter', {
                rules: [{ required: true, message: 'Please input your Quarter!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Quarter"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Save
          </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const CurrencyRatesModalWrapper = Form.create({ name: 'form_in_modal' })(CurrencyRatesModal);
export default CurrencyRatesModalWrapper
