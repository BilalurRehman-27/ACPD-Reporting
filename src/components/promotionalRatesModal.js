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

  handleOk = async (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const mappedObject = {
          Id: values.Id ? values.Id : 0,
          Promcode: values.editedPromcode ? values.editedPromcode : values.promcode,
          RefBy: values.editedRefBy ? values.editedRefBy : values.refBy,
          Active: values.hasOwnProperty('editedActive') ? values.editedActive : values.active,
        }
        await apiCall.UpdatePromoCodes(mappedObject)
        this.props.form.resetFields();
        this.props.getModalStatus(false, true);
      }
    });
  };

  handleCancel = () => {
    this.props.getModalStatus(false, false);
  };


  render() {
    const { confirmLoading } = this.state;
    const { visible, data, isEdit } = this.props;
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
          <Form layout="vertical" >
            {!isEdit ?
              <>
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
              </> :
              <>
                <Form.Item label="Id" style={{ display: 'none' }}>
                  {getFieldDecorator('Id', {
                    initialValue: data.record.Id,
                  })}
                </Form.Item>
                <Form.Item label="Code">
                  {getFieldDecorator('editedPromcode', {
                    rules: [{ required: true, message: 'Please input your Code!' }],
                    initialValue: data.record.Promcode,
                  })(
                    <Input
                      type="text"
                      placeholder="Code"
                    />,
                  )}
                </Form.Item>
                <Form.Item label="RefBy">
                  {getFieldDecorator('editedRefBy', {
                    rules: [{ required: true, message: 'Please input your RefBy!' }],
                    initialValue: data.record.RefBy,
                  })(
                    <Input
                      type="text"
                      placeholder="RefBy"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('editedActive', {
                    initialValue: data.record.Active,
                    valuePropName: 'checked'
                  })(
                    <Checkbox defaultValue={data.record.Active}>Status</Checkbox>
                  )}
                </Form.Item>
              </>}
          </Form>
        </Modal>
      </div>
    );
  }
}

const PromotionalRatesModalWrapper = Form.create({ name: 'form_in_modal' })(PromotionalRatesModal);
export default PromotionalRatesModalWrapper
