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

  handleOk = async (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const mappedObject = {
          CurrencyId: values.currencyID ? values.currencyID : 0,
          Month: values.editedMonth ? values.editedMonth : values.month,
          Year: values.editedYear ? values.editedYear : values.year,
          Rates: values.editedRate ? values.editedRate : values.rate,
          Quarter: values.editedQuarter ? values.editedQuarter : values.quarter
        }
        if (values.hasOwnProperty('editedYear')) {
          await apiCall.UpdateCurrencyRates(mappedObject);
        }
        else {
          await apiCall.AddCurrencyRates(mappedObject)
        }
        this.props.form.resetFields();
        this.props.getModalStatus(false, true);

      }
    });
  };

  handleCancel = () => {
    this.props.getModalStatus(false, false);
  };

  getMonth = key => {
    switch (key) {
      case 1:
        return 'January'
      case 2:
        return 'February'
      case 3:
        return 'March'
      case 4:
        return 'April'
      case 5:
        return 'May'
      case 6:
        return 'June'
      case 7:
        return 'July'
      case 8:
        return 'August'
      case 9:
        return 'September'
      case 10:
        return 'October'
      case 11:
        return 'November'
      case 12:
        return 'December'
      default:
        break;
    }
  }

  render() {
    const { confirmLoading } = this.state;
    const { visible, yearsList, data, isEdit } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title={isEdit ? "Edit Record" : "Add Record"}
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
          <Form layout="vertical">
            {!isEdit ?
              <>
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
                      type="text"
                      placeholder="Quarter"
                    />,
                  )}
                </Form.Item>
              </> :
              <>
                <Form.Item label="CurrencyID" style={{ display: 'none' }}>
                  {getFieldDecorator('currencyID', {
                    initialValue: data.record.CurrencyId,
                  })}
                </Form.Item>
                <Form.Item label="Month">
                  {getFieldDecorator('editedMonth', {
                    rules: [{ required: true, message: 'Please select valid Month!' }],
                    initialValue: this.getMonth(data.record.Month),
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
                <Form.Item label="Year">
                  {getFieldDecorator('editedYear', {
                    rules: [{ required: true, message: 'Please select Year!', isEdit: true }],
                    initialValue: data.record.Year.toString()
                  })(
                    <Select placeholder="Select Year">
                      {yearsList.map((value, index) => <Option key={index} value={value}>{value}</Option>)}
                    </Select>)}
                </Form.Item>
                <Form.Item label="Rate">
                  {getFieldDecorator('editedRate', {
                    rules: [{ required: true, message: 'Please input your Rate!' }],
                    initialValue: data.record.Rate.toString()
                  })(
                    <Input
                      type="number"
                      placeholder="Rate"

                    />,
                  )}
                </Form.Item>
                <Form.Item label="Quarter">
                  {getFieldDecorator('editedQuarter', {
                    rules: [{ required: false, message: 'Please input your Quarter!' }],
                    initialValue: data.record.Quarter
                  })(
                    <Input
                      type="text"
                      placeholder="Quarter"
                    />,
                  )}
                </Form.Item>
              </>
            }
          </Form>
        </Modal>
      </div>
    );
  }
}

const CurrencyRatesModalWrapper = Form.create({ name: 'form_in_modal' })(CurrencyRatesModal);
export default CurrencyRatesModalWrapper
