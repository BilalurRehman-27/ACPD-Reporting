import React from 'react'
import { Modal, Form, Input, Button, Checkbox } from 'antd';
import { apiCall } from '../Services/API';

class PromotionalRatesModal extends React.Component {
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
        await apiCall.AddPromoCodes(values);
        this.props.getModalStatus(false);
      }
    });
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
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            null,
          ]}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item label="Code">
              {getFieldDecorator('promcode', {
                rules: [{ required: true, message: 'Please input your Code!' }],
              })(
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Code"
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
            <Form.Item>
              {getFieldDecorator('active', {
                initialValue: true,
              })(
                <Checkbox>Status</Checkbox>
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

const PromotionalRatesModalWrapper = Form.create({ name: 'form_in_modal' })(PromotionalRatesModal);
export default PromotionalRatesModalWrapper
