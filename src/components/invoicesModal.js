import React from 'react'
import { Modal, Form, Input, Button, Checkbox, DatePicker } from 'antd';
import { apiCall } from '../Services/API';

class InvoicesModal extends React.Component {
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


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {

        console.log('Received values of form: ', values);
        await apiCall.AddPromoCodes(values);
        this.props.getModalStatus(false);
      }
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        await apiCall.AddInvoiceData(values);
        this.props.getModalStatus(false);
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      cancel: true,
      ok: false
    })
    this.props.getModalStatus(false);
  };

  render() {
    const { confirmLoading } = this.state;
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="Add Record"
          visible={visible}
          confirmLoading={confirmLoading}
          footer={[
            <>
              <Button type="primary" key="back" onClick={this.handleOk}>
                Save
                      </Button>
              <Button type="danger" key="back" onClick={this.handleCancel}>
                Cancel
                                 </Button>
            </>
          ]}
        >
          <Form layout="inline" labelCol={4}
            wrapperCol={14} onSubmit={this.handleSubmit}>
            <Form.Item label="Company Name" >
              {getFieldDecorator('companyName', {
                rules: [{ required: true, message: 'Please input your Company Name!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Company Name"
                />,
              )}
            </Form.Item>
            <Form.Item label="First Name">
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'Please input your First Name!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="First Name"
                />,
              )}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'Please input your Last Name!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Last Name"
                />,
              )}
            </Form.Item>
            <Form.Item label="Country">
              {getFieldDecorator('country', {
                rules: [{ required: true, message: 'Please input your Country!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Country"
                />,
              )}
            </Form.Item>
            <Form.Item label="Total Price">
              {getFieldDecorator('totalPrice', {
                rules: [{ required: true, message: 'Please input your Total Price!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="Total Price"
                />,
              )}
            </Form.Item>
            <Form.Item label="Currency">
              {getFieldDecorator('currencyCode', {
                rules: [{ required: true, message: 'Please input your Currency!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Currency"
                />,
              )}
            </Form.Item>
            <Form.Item label="Quantity">
              {getFieldDecorator('quantity', {
                rules: [{ required: true, message: 'Please input your Quantity!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="Quantity"
                />,
              )}
            </Form.Item>
            <Form.Item label="Total Tax">
              {getFieldDecorator('totalTax', {
                rules: [{ required: true, message: 'Please input your Total Tax!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="Total Tax"
                />,
              )}
            </Form.Item>
            <Form.Item label="SalesTypeId">
              {getFieldDecorator('salesTypeId', {
                rules: [{ required: true, message: 'Please input your SalesTypeId!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="SalesTypeId"
                />,
              )}
            </Form.Item>
            <Form.Item label="Revenue Date" hasFeedback validateStatus="success">
              {getFieldDecorator('revenueDate', {
                rules: [{ required: true, message: 'Please input your Revenue Date!' }],
              })(
                <DatePicker style={{ width: '100%' }} />
              )}
            </Form.Item>
            <Form.Item label="Item Name">
              {getFieldDecorator('itemName', {
                rules: [{ required: true, message: 'Please input your Item Name!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Item Name"
                />,
              )}
            </Form.Item>
            <Form.Item label="Units">
              {getFieldDecorator('units', {
                rules: [{ required: true, message: 'Please input your Units!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="Units"
                />,
              )}
            </Form.Item>
            <Form.Item label="Orders">
              {getFieldDecorator('orders', {
                rules: [{ required: true, message: 'Please input your Orders!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="Orders"
                />,
              )}
            </Form.Item>
            <Form.Item label="Promo Code">
              {getFieldDecorator('promoCode', {
                rules: [{ required: true, message: 'Please input your Promo Code!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Promo Code"
                />,
              )}
            </Form.Item>

            <Form.Item label="RefBy">
              {getFieldDecorator('refBy', {
                rules: [{ required: true, message: 'Please input your RefBy!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="RefBy"
                />,
              )}
            </Form.Item>

          </Form>
        </Modal>
      </div >
    );
  }
}

const InvoicesModalWrapper = Form.create({ name: 'form_in_modal' })(InvoicesModal);
export default InvoicesModalWrapper
