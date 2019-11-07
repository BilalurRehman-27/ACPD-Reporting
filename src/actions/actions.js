import { apiCall } from '../Services/API';
export const GET_DIRECT_SALES = 'GET_DIRECT_SALES';
export const GET_DIRECT_SALES_SUCCESS = 'GET_DIRECT_SALES_SUCCESS';
export const GET_DIRECT_SALES_ERROR = 'GET_DIRECT_SALES_ERROR';

export const GET_SUMMARY_DIRECT_SALES = 'GET_DIRECT_SALES';
export const GET_SUMMARY_DIRECT_SALES_SUCCESS = 'GET_SUMMARY_DIRECT_SALES_SUCCESS';
export const GET_SUMMARY_DIRECT_SALES_ERROR = 'GET_SUMMARY_DIRECT_SALES_ERROR';

export const GET_INVOICE_SALES = 'GET_INVOICE_SALES';
export const GET_INVOICE_SALES_SUCCESS = 'GET_INVOICE_SALES_SUCCESS';
export const GET_INVOICE_SALES_ERROR = 'GET_INVOICE_SALES_ERROR';

export const GET_SUMMARY_INVOICE_SALES = 'GET_INVOICE_SALES';
export const GET_SUMMARY_INVOICE_SALES_SUCCESS = 'GET_SUMMARY_INVOICE_SALES_SUCCESS';
export const GET_SUMMARY_INVOICE_SALES_ERROR = 'GET_SUMMARY_INVOICE_SALES_ERROR';

// Monthly DirectSales
export const _requestDirectSales = () => {
  return {
    type: GET_DIRECT_SALES
  };
}
export const _getDirectSalesSuccess = (data) => {
  return {
    type: GET_DIRECT_SALES_SUCCESS,
    payload: data,
  }
}
export const _getDirectSalesError = (error) => {
  return {
    type: GET_DIRECT_SALES_ERROR,
    error,
  }
}
export const getDirectSales = (data) => {

  return dispatch => {
    dispatch(_requestDirectSales());
    apiCall.GetMonthlyDirectSales(data).then(data => {
      dispatch(_getDirectSalesSuccess(data.data))
    }).catch((error) => {
      dispatch(_getDirectSalesError(error))
    })
  }
}

// Summary Monthly DirectSales

export const _requestSummaryDirectSales = () => {
  return {
    type: GET_SUMMARY_DIRECT_SALES
  };
}
export const _getSummaryDirectSalesSuccess = (data) => {
  return {
    type: GET_SUMMARY_DIRECT_SALES_SUCCESS,
    payload: data,
  }
}
export const _getSummaryDirectSalesError = (error) => {
  return {
    type: GET_SUMMARY_DIRECT_SALES_ERROR,
    error,
  }
}
export const getSummaryDirectSales = (data) => {
  return dispatch => {
    dispatch(_requestSummaryDirectSales());
    apiCall.GetMonthlySummaryDirectSales(data).then(data => {
      dispatch(_getSummaryDirectSalesSuccess(data.data))
    }).catch((error) => {
      dispatch(_getSummaryDirectSalesError(error))
    })
  }
}

//Invoices
export const _requestInvoicesData = () => {
  return {
    type: GET_INVOICE_SALES
  };
}
export const _getInvoicesDataSuccess = (data) => {
  return {
    type: GET_INVOICE_SALES_SUCCESS,
    payload: data,
  }
}
export const _getInvoicesDataError = (error) => {
  return {
    type: GET_INVOICE_SALES_ERROR,
    error,
  }
}
export const getInvoicesData = (data) => {

  return dispatch => {
    dispatch(_requestInvoicesData());
    apiCall.GetInvoicesData(data).then(data => {
      dispatch(_getInvoicesDataSuccess(data.data))
    }).catch((error) => {
      dispatch(_getInvoicesDataError(error))
    })
  }
}

//Summary Invoices
export const _requestSummaryInvoiceSales = () => {
  return {
    type: GET_SUMMARY_INVOICE_SALES
  };
}
export const _getSummaryInvoiceSalesSuccess = (data) => {
  return {
    type: GET_SUMMARY_INVOICE_SALES_SUCCESS,
    payload: data,
  }
}
export const _getSummaryInvoiceSalesError = (error) => {
  return {
    type: GET_SUMMARY_INVOICE_SALES_ERROR,
    error,
  }
}
export const getSummaryInvoiceSales = (data) => {
  return dispatch => {
    dispatch(_requestSummaryInvoiceSales());
    apiCall.GetMonthlySummaryInvoiceSales(data).then(data => {
      dispatch(_getSummaryInvoiceSalesSuccess(data.data))
    }).catch((error) => {
      dispatch(_getSummaryInvoiceSalesError(error))
    })
  }
}
