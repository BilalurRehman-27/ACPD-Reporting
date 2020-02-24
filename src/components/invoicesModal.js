import React from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Col,
  Row,
  Icon,
} from 'antd';
import { apiCall } from '../Services/API';
import moment from 'moment';

const { Option } = Select;

class InvoicesModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      localInvoiceItems: [],
      localUpdate: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.data &&
      props.data.record &&
      props.data.record.InvoicesItems !== state.localInvoiceItems &&
      !state.localUpdate
    ) {
      return {
        localInvoiceItems: props.data.record.InvoicesItems,
        localUpdate: false,
      };
    }
    return {
      localUpdate: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
      localUpdate: true,
    });
  };

  getCurrencyCode = currencyId => {
    switch (currencyId) {
      case 1:
        return 'GBP';

      case 2:
        return 'EUR';

      case 3:
        return 'AUD';

      case 4:
        return 'HKD';

      default:
        break;
    }
  };

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // this.setState({ confirmLoading: true });
        const invoiceItemsList = [];
        values.itemName &&
          values.itemName.map((name, index) => {
            debugger
            const invoiceItem = {
              RowNumber:
                values.InvoicesItems &&
                values.InvoicesItems[index] &&
                values.InvoicesItems[index].RowNumber
                  ? values.InvoicesItems[index].RowNumber
                  : 0,
              SalesTypeId: values.editedSalesTypeId
                ? values.editedSalesTypeId
                : values.salesTypeId,
              CurrencyId:
                values.InvoicesItems && values.InvoicesItems[0].CurrencyId
                  ? values.InvoicesItems[0].CurrencyId
                  : values.currencyId,
              CurrencyCode: this.getCurrencyCode(
                values.editedCurrencyId
                  ? values.editedCurrencyId
                  : values.currencyId
              ),
              InvoiceNumber: values.editedInvoiceNumber
                ? values.editedInvoiceNumber
                : values.invoiceNumber,
              ItemName: name,
              Units: values.units[index],
              Orders: values.orders[index],
              ItemCode:
                values.InvoicesItems &&
                values.InvoicesItems[index] &&
                values.InvoicesItems[index].ItemCode
                  ? values.InvoicesItems[index].ItemCode
                  : '',
            };
            invoiceItemsList.push(invoiceItem);
            return invoiceItem;
          });
        const mappedObject = {
          InvoiceNumber: values.editedInvoiceNumber
            ? values.editedInvoiceNumber
            : values.invoiceNumber,
          SalesTypeId: values.editedSalesTypeId
            ? values.editedSalesTypeId
            : values.salesTypeId,
          CurrencyId: values.editedCurrencyId
            ? values.editedCurrencyId
            : values.currencyId,
          Title: null,
          CompanyName: values.editedCompanyName
            ? values.editedCompanyName
            : values.companyName,
          FirstName: values.editedFirstName
            ? values.editedFirstName
            : values.firstName,
          LastName: values.editedLastName
            ? values.editedLastName
            : values.lastName,
          Country: values.editedCountry ? values.editedCountry : values.country,
          TotalPrice: values.editedTotalPrice
            ? values.editedTotalPrice
            : values.totalPrice,
          TotalTax: values.editedTotalTax
            ? values.editedTotalTax
            : values.totalTax,
          Revenue: values.editedRevenue ? values.editedRevenue : values.Revenue,
          OrderDate: values.editedCreatedDate
            ? values.editedCreatedDate
            : values.revenueDate,
          PromoCode: values.editedPromoCode
            ? values.editedPromoCode
            : values.promoCode,
          RefBy: values.editedRefBy ? values.editedRefBy : values.refBy,
          PayPalID: null,
          InvoicesItems: invoiceItemsList,
        };
        if (values.hasOwnProperty('editedFirstName')) {
          await apiCall.AddInvoiceData(mappedObject);
        } else {
          apiCall.UpdateInvoiceData(mappedObject);
        }
        // this.setState({ confirmLoading: false });
        this.props.form.resetFields();
        this.props.getModalStatus(false, true);
      }
    });
  };

  remove = k => {
    const { form } = this.props;
    const { localInvoiceItems } = this.state;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');

    if (keys.length === 0) {
      this.setState({
        localInvoiceItems: localInvoiceItems.filter(key => key.RowNumber !== k),
        localUpdate: true,
      });
    } else {
      // can use data-binding to set
      this.setState({
        localUpdate: true,
      });
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    }
  };

  handleAddItems = (props, item) => {
    const { form } = props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(Math.floor(Math.random() * 1000));
    // can use data-binding to set
    // important! notify form to detect changes
    this.setState({
      localUpdate: true,
    });
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleCancel = e => {
    console.log(e);
    const { form } = this.props;
    this.setState({
      visible: false,
      cancel: true,
      ok: false,
      localUpdate: true,
    });
    const keys = form.getFieldValue('keys');
    keys &&
      keys.map(k => {
        return this.remove(k);
      });
    this.props.getModalStatus(false, false);
  };

  renderInvoiceItems = (invoiceItems = []) => {
    const { form, courseList } = this.props;
    const { getFieldDecorator } = form;
    const formItems = invoiceItems.map((item, index) => (
      <>
        <Form.Item required={false} key={index}>
          <Col span={8}>
            <Form.Item label='Item Name'>
              {getFieldDecorator(`itemName[${index}]`, {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Item Name!',
                  },
                ],
                initialValue: item.ItemName,
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder='Select Item Name'
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {courseList.map((value, index) => (
                    <Option key={index} value={value.CourseName}>
                      {value.CourseName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label='Units'>
              {getFieldDecorator(`units[${index}]`, {
                rules: [
                  {
                    required: false,
                    message: 'Please input your Units!',
                  },
                ],
                initialValue: item.Units,
              })(<Input type='number' placeholder='Units' />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label='Orders'>
              {getFieldDecorator(`orders[${index}]`, {
                rules: [
                  {
                    required: false,
                    message: 'Please input your Orders!',
                  },
                ],
                initialValue: item.Orders,
              })(<Input type='number' placeholder='Orders' />)}
            </Form.Item>
          </Col>
          <Col span={6} style={{ display: 'none' }}>
            <Form.Item label='Item Code'>
              {getFieldDecorator(`itemCode[${index}]`, {
                rules: [
                  {
                    required: false,
                    message: 'Please input your Item Code!',
                  },
                ],
                initialValue: item.ItemCode,
              })(<Input type='text' placeholder='Item Code' />)}
            </Form.Item>
          </Col>
          {invoiceItems.length > 0 ? (
            <Icon
              className='dynamic-delete-button'
              type='minus-circle-o'
              theme='twoTone'
              onClick={() => this.remove(item.RowNumber)}
            />
          ) : null}
        </Form.Item>
      </>
    ));
    return formItems;
  };

  addInvoices = keys => {
    const { form, courseList } = this.props;
    const { getFieldDecorator } = form;
    getFieldDecorator('keys', { initialValue: [] });
    return keys.map((k, index) => (
      <Form.Item required={false} key={k}>
        <Col span={8}>
          <Form.Item label='Item Name'>
            {getFieldDecorator(`itemName[${k}]`, {
              rules: [
                {
                  required: true,
                  message: 'Please input your Item Name!',
                },
              ],
              initialValue: courseList[0].CourseName,
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder='Select Item Name'
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {courseList.map((value, index) => (
                  <Option key={index} value={value.CourseName}>
                    {value.CourseName}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='Units'>
            {getFieldDecorator(`units[${k}]`, {
              rules: [
                {
                  required: false,
                  message: 'Please input your Units!',
                },
              ],
              initialValue: '1',
            })(<Input type='number' placeholder='Units' />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='Orders'>
            {getFieldDecorator(`orders[${k}]`, {
              rules: [
                {
                  required: false,
                  message: 'Please input your Orders!',
                },
              ],
              initialValue: '1',
            })(<Input type='number' placeholder='Orders' />)}
          </Form.Item>
        </Col>
        {keys.length > 0 ? (
          <Icon
            className='dynamic-delete-button'
            type='minus-circle-o'
            theme='twoTone'
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
  };

  render() {
    const { confirmLoading, localInvoiceItems } = this.state;
    const {
      visible,
      isEdit,
      data,
      salesTypeList,
      countryList,
      currencyList,
      profBodyList,
      form,
    } = this.props;
    const { getFieldValue, getFieldDecorator } = form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys && keys.length > 0 && this.addInvoices(keys);
    return (
      <Modal
        title={isEdit ? 'Edit Record' : 'Add Record'}
        closable={false}
        width={'60%'}
        wrapClassName='vertical-center-modal'
        visible={visible}
        confirmLoading={confirmLoading}
        footer={[
          <>
            <Button
              type='primary'
              key='back'
              loading={confirmLoading}
              onClick={this.handleOk}
            >
              Save
            </Button>
            <Button type='danger' key='cancel' onClick={this.handleCancel}>
              Cancel
            </Button>
          </>,
        ]}
      >
        <Form className='ant-advanced-search-form' layout='inline'>
          {!isEdit ? (
            <>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label='Invoice Number'>
                    {getFieldDecorator('invoiceNumber', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Invoice Nuber!',
                        },
                      ],
                    })(<Input type='text' placeholder='Invoice Nuber' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='SalesType'>
                    {getFieldDecorator('salesTypeId', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select your SalesType!',
                        },
                      ],
                      initialValue: 2,
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
                <Col span={8}>
                  <Form.Item label='Company Name'>
                    {getFieldDecorator('companyName', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Company Name!',
                        },
                      ],
                    })(<Input type='text' placeholder='Company Name' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='First Name'>
                    {getFieldDecorator('firstName', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your First Name!',
                        },
                      ],
                    })(<Input type='text' placeholder='First Name' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Last Name'>
                    {getFieldDecorator('lastName', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Last Name!',
                        },
                      ],
                    })(<Input type='text' placeholder='Last Name' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Country'>
                    {getFieldDecorator('country', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Country!',
                        },
                      ],
                      initialValue: 'United Kingdom',
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Country'
                      >
                        {countryList &&
                          countryList.map((value, index) => (
                            <Option key={index} value={value.Name}>
                              {value.Name}
                            </Option>
                          ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Total Price'>
                    {getFieldDecorator('totalPrice', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Total Price!',
                        },
                      ],
                    })(<Input type='number' placeholder='Total Price' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Currency'>
                    {getFieldDecorator('currencyId', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Currency!',
                        },
                      ],
                      initialValue: 'GBP',
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
                <Col span={8}>
                  <Form.Item label='Total Tax'>
                    {getFieldDecorator('totalTax', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Total Tax!',
                        },
                      ],
                    })(<Input type='number' placeholder='Total Tax' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Order Date'>
                    {getFieldDecorator('revenueDate', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Order Date!',
                        },
                      ],
                    })(<DatePicker style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Promo Code'>
                    {getFieldDecorator('promoCode', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Promo Code!',
                        },
                      ],
                    })(<Input type='text' placeholder='Promo Code' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='RefBy'>
                    {getFieldDecorator('refBy', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your RefBy!',
                        },
                      ],
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Ref By'
                      >
                        {profBodyList.map((value, index) => (
                          <Option key={index} value={value.ProfBody}>
                            {value.ProfBody}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <div className='ant-col ant-form-item-label'>
                    <label htmlFor='form_in_modal_orders' title='Add'>
                      <b>Add Item</b>
                    </label>
                  </div>
                  <div className='ant-col ant-form-item-control-wrapper'>
                    <span className='ant-form-item-children'>
                      <Button
                        type='primary'
                        onClick={() => this.handleAddItems(this.props)}
                      >
                        <Icon type='plus-circle' theme='twoTone' />
                      </Button>
                    </span>
                  </div>
                </Col>
                {formItems}
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
                <Form.Item label='InvoicesItems' style={{ display: 'none' }}>
                  {getFieldDecorator('InvoicesItems', {
                    initialValue: data.record.InvoicesItems,
                  })}
                </Form.Item>
                <Col span={8}>
                  <Form.Item label='Invoice Number'>
                    {getFieldDecorator('editedInvoiceNumber', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Invoice Nuber!',
                        },
                      ],
                      initialValue: data.record.InvoiceNumber,
                    })(<Input type='text' placeholder='Invoice Nuber' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='SalesType'>
                    {getFieldDecorator('editedSalesTypeId', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your SalesTypeId!',
                        },
                      ],
                      initialValue: data.record.InvoicesItems[0].SalesTypeId,
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
                <Col span={8}>
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
                <Col span={8}>
                  <Form.Item label='First Name'>
                    {getFieldDecorator('editedFirstName', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your First Name!',
                        },
                      ],
                      initialValue: data.record.FirstName,
                    })(<Input type='text' placeholder='First Name' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Last Name'>
                    {getFieldDecorator('editedLastName', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Last Name!',
                        },
                      ],
                      initialValue: data.record.LastName,
                    })(<Input type='text' placeholder='Last Name' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Country'>
                    {getFieldDecorator('editedCountry', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Country!',
                        },
                      ],
                      initialValue: data.record.Country,
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Country'
                      >
                        {countryList &&
                          countryList.map((value, index) => (
                            <Option key={index} value={value.Name}>
                              {value.Name}
                            </Option>
                          ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Total Price'>
                    {getFieldDecorator('editedTotalPrice', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Total Price!',
                        },
                      ],
                      initialValue: data.record.TotalPrice,
                    })(<Input type='number' placeholder='Total Price' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Currency'>
                    {getFieldDecorator('editedCurrencyId', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Currency!',
                        },
                      ],
                      initialValue: data.record.InvoicesItems[0].CurrencyId,
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
                <Col span={8}>
                  <Form.Item label='Total Tax'>
                    {getFieldDecorator('editedTotalTax', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Total Tax!',
                        },
                      ],
                      initialValue: data.record.TotalTax,
                    })(<Input type='number' placeholder='Total Tax' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label='Order Date'
                    hasFeedback
                    validateStatus='success'
                  >
                    {getFieldDecorator('editedCreatedDate', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Order Date!',
                        },
                      ],
                      initialValue: moment(
                        new Date(data.record.OrderDate).toLocaleDateString(),
                        'MM-DD-YYYY'
                      ),
                    })(<DatePicker style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Promo Code'>
                    {getFieldDecorator('editedPromoCode', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your Promo Code!',
                        },
                      ],
                      initialValue: data.record.PromoCode,
                    })(<Input type='text' placeholder='Promo Code' />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='RefBy'>
                    {getFieldDecorator('editedRefBy', {
                      rules: [
                        {
                          required: false,
                          message: 'Please input your RefBy!',
                        },
                      ],
                      initialValue: data.record.RefBy,
                    })(
                      <Select
                        style={{ width: 170 }}
                        placeholder='Select Ref By'
                      >
                        {profBodyList.map((value, index) => (
                          <Option key={index} value={value.ProfBody}>
                            {value.ProfBody}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <div className='ant-col ant-form-item-label'>
                    <label htmlFor='form_in_modal_orders' title='Add'>
                      <b>Add Item</b>
                    </label>
                  </div>
                  <div className='ant-col ant-form-item-control-wrapper'>
                    <span className='ant-form-item-children'>
                      <Button
                        type='primary'
                        onClick={() => this.handleAddItems(this.props)}
                      >
                        <Icon type='plus-circle' theme='twoTone' />
                      </Button>
                    </span>
                  </div>
                </Col>
                {this.renderInvoiceItems(localInvoiceItems)}
                {this.addInvoices(keys)}
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
