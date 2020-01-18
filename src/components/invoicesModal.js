import React from 'react';
import { Modal, Form, Input, Button, DatePicker, Select, Col, Row } from 'antd';
import { apiCall } from '../Services/API';
import moment from 'moment';

const { Option } = Select;

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

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const mappedObject = {
          RowNumber: values.RowNumber ? values.RowNumber : 0,
          Invoices: values.Invoices ? values.Invoices : 0,
          CompanyName: values.editedCompanyName
            ? values.editedCompanyName
            : values.CompanyName,
          FirstName: values.editedFirstName
            ? values.editedFirstName
            : values.FirstName,
          LastName: values.editedLastName
            ? values.editedLastName
            : values.LastName,
          Country: values.editedCountry ? values.editedCountry : values.Country,
          TotalPrice: values.editedTotalPrice
            ? values.editedTotalPrice
            : values.TotalPrice,
          TotalTax: values.editedTotalTax
            ? values.editedTotalTax
            : values.TotalTax,
          Revenue: values.editedRevenue ? values.editedRevenue : values.Revenue,
          CreatedDate: values.editedCreatedDate
            ? values.editedCreatedDate
            : values.CreatedDate,
          OrderItemName: values.editedItemName
            ? values.editedItemName
            : values.OrderItemName,
          Quantity: values.editedQuantity
            ? values.editedQuantity
            : values.Quantity,
          Units: values.editedUnits ? values.editedUnits : values.Units,
          Orders: values.editedOrders ? values.editedOrders : values.Orders,
          PromotionalCode: values.editedPromotionalCode
            ? values.editedPromotionalCode
            : values.PromotionalCode,
          RefBy: values.editedRefBy ? values.editedRefBy : values.RefBy,
          PayPalID: values.editedPayPalID
            ? values.editedPayPalID
            : values.PayPalID,
          SalesTypeId: values.editedSalesTypeId
            ? values.editedSalesTypeId
            : values.SalesTypeId,
          CurrencyID: values.editedCurrencyID
            ? values.editedCurrencyID
            : values.CurrencyID,
          CurrencyCode: values.editedCurrencyCode
            ? values.editedCurrencyCode
            : values.CurrencyCode,
        };
        if (values.hasOwnProperty('editedFirstName')) {
          await apiCall.AddInvoiceData(mappedObject);
        } else {
          apiCall.UpdateInvoiceData(mappedObject);
        }
        this.props.form.resetFields();
        this.props.getModalStatus(false, true);
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      cancel: true,
      ok: false,
    });
    this.props.getModalStatus(false, false);
  };

  render() {
    const { confirmLoading } = this.state;
    const {
      visible,
      isEdit,
      data,
      salesTypeList,
      countryList,
      currencyList,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={isEdit ? 'Edit Record' : 'Add Record'}
        visible={visible}
        confirmLoading={confirmLoading}
        footer={[
          <>
            <Button type='primary' key='back' onClick={this.handleOk}>
              Save
            </Button>
            <Button type='danger' key='back' onClick={this.handleCancel}>
              Cancel
            </Button>
          </>,
        ]}
      >
        <Form className='ant-advanced-search-form' layout='inline'>
          {!isEdit ? (
            <>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label='Company Name'>
                    {getFieldDecorator('companyName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Company Name!',
                        },
                      ],
                    })(<Input type='text' placeholder='Company Name' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='First Name'>
                    {getFieldDecorator('firstName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your First Name!',
                        },
                      ],
                    })(<Input type='text' placeholder='First Name' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Last Name'>
                    {getFieldDecorator('lastName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Last Name!',
                        },
                      ],
                    })(<Input type='text' placeholder='Last Name' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Country'>
                    {getFieldDecorator('country', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Country!',
                        },
                      ],
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Country'
                      >
                        {countryList.map((value, index) => (
                          <Option key={index} value={value.Id}>
                            {value.Name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Total Price'>
                    {getFieldDecorator('totalPrice', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Total Price!',
                        },
                      ],
                    })(<Input type='number' placeholder='Total Price' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Currency'>
                    {getFieldDecorator('currencyCode', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Currency!',
                        },
                      ],
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Currency'
                      >
                        {currencyList.map((value, index) => (
                          <Option key={index} value={value.CurrencyId}>
                            {value.CurrencyName}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Quantity'>
                    {getFieldDecorator('quantity', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Quantity!',
                        },
                      ],
                    })(<Input type='number' placeholder='Quantity' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Total Tax'>
                    {getFieldDecorator('totalTax', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Total Tax!',
                        },
                      ],
                    })(<Input type='number' placeholder='Total Tax' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='SalesType'>
                    {getFieldDecorator('salesTypeId', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select your SalesType!',
                        },
                      ],
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Sales Type'
                      >
                        {salesTypeList.map((value, index) => (
                          <Option key={index} value={value.TypeId}>
                            {value.Name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Revenue Date'
                    hasFeedback
                    validateStatus='success'
                  >
                    {getFieldDecorator('revenueDate', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Revenue Date!',
                        },
                      ],
                    })(<DatePicker style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Item Name'>
                    {getFieldDecorator('itemName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Item Name!',
                        },
                      ],
                    })(<Input type='text' placeholder='Item Name' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Units'>
                    {getFieldDecorator('units', {
                      rules: [
                        { required: true, message: 'Please input your Units!' },
                      ],
                    })(<Input type='number' placeholder='Units' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Orders'>
                    {getFieldDecorator('orders', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Orders!',
                        },
                      ],
                    })(<Input type='number' placeholder='Orders' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Promo Code'>
                    {getFieldDecorator('promoCode', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Promo Code!',
                        },
                      ],
                    })(<Input type='text' placeholder='Promo Code' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='RefBy'>
                    {getFieldDecorator('refBy', {
                      rules: [
                        { required: true, message: 'Please input your RefBy!' },
                      ],
                    })(<Input type='text' placeholder='RefBy' />)}
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row gutter={24}>
                <Form.Item label='RowNumber' style={{ display: 'none' }}>
                  {getFieldDecorator('RowNumber', {
                    initialValue: data.record.RowNumber,
                  })}
                </Form.Item>
                <Form.Item label='Invoices' style={{ display: 'none' }}>
                  {getFieldDecorator('Invoices', {
                    initialValue: data.record.Invoices,
                  })}
                </Form.Item>
                <Col span={12}>
                  <Form.Item label='Company Name'>
                    {getFieldDecorator('editedCompanyName', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Company Name!',
                        },
                      ],
                      initialValue: data.record.CompanyName,
                    })(<Input type='text' placeholder='Company Name' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='First Name'>
                    {getFieldDecorator('editedFirstName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your First Name!',
                        },
                      ],
                      initialValue: data.record.FirstName,
                    })(<Input type='text' placeholder='First Name' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Last Name'>
                    {getFieldDecorator('editedLastName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Last Name!',
                        },
                      ],
                      initialValue: data.record.LastName,
                    })(<Input type='text' placeholder='Last Name' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Country'>
                    {getFieldDecorator('editedCountry', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Country!',
                        },
                      ],
                      initialValue: data.record.Country,
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Country'
                      >
                        {countryList.map((value, index) => (
                          <Option key={index} value={value.Id}>
                            {value.Name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Total Price'>
                    {getFieldDecorator('editedTotalPrice', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Total Price!',
                        },
                      ],
                      initialValue: data.record.TotalPrice,
                    })(<Input type='number' placeholder='Total Price' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Currency'>
                    {getFieldDecorator('editedCurrencyCode', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Currency!',
                        },
                      ],
                      initialValue: data.record.CurrencyCode,
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Currency'
                      >
                        {currencyList.map((value, index) => (
                          <Option key={index} value={value.CurrencyId}>
                            {value.CurrencyName}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Quantity'>
                    {getFieldDecorator('editedQuantity', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Quantity!',
                        },
                      ],
                      initialValue: data.record.Quantity,
                    })(<Input type='number' placeholder='Quantity' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Total Tax'>
                    {getFieldDecorator('editedTotalTax', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Total Tax!',
                        },
                      ],
                      initialValue: data.record.TotalTax,
                    })(<Input type='number' placeholder='Total Tax' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='SalesType'>
                    {getFieldDecorator('editedSalesTypeId', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your SalesTypeId!',
                        },
                      ],
                      initialValue: data.record.SalesTypeId,
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Sales Type'
                      >
                        {salesTypeList.map((value, index) => (
                          <Option key={index} value={value.TypeId}>
                            {value.Name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Revenue Date'
                    hasFeedback
                    validateStatus='success'
                  >
                    {getFieldDecorator('editedCreatedDate', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Revenue Date!',
                        },
                      ],
                      initialValue: moment(
                        new Date(data.record.OrderDate).toLocaleDateString(),
                        'DD/MM/YYYY'
                      ),
                    })(<DatePicker style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Item Name'>
                    {getFieldDecorator('editedItemName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Item Name!',
                        },
                      ],
                      initialValue: data.record.OrderItemName,
                    })(<Input type='text' placeholder='Item Name' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Units'>
                    {getFieldDecorator('editedUnits', {
                      rules: [
                        { required: true, message: 'Please input your Units!' },
                      ],
                      initialValue: data.record.Units,
                    })(<Input type='number' placeholder='Units' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Orders'>
                    {getFieldDecorator('editedOrders', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Orders!',
                        },
                      ],
                      initialValue: data.record.Orders,
                    })(<Input type='number' placeholder='Orders' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Promo Code'>
                    {getFieldDecorator('editedPromoCode', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Promo Code!',
                        },
                      ],
                      initialValue: data.record.PromoCode,
                    })(<Input type='text' placeholder='Promo Code' />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='RefBy'>
                    {getFieldDecorator('editedRefBy', {
                      rules: [
                        { required: true, message: 'Please input your RefBy!' },
                      ],
                      initialValue: data.record.RefBy,
                    })(<Input type='text' placeholder='RefBy' />)}
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Modal>
    );
  }
}

const InvoicesModalWrapper = Form.create({ name: 'form_in_modal' })(
  InvoicesModal
);
export default InvoicesModalWrapper;
