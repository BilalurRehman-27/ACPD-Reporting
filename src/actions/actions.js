import { apiCall } from '../Services/API';
export const GET_DIRECT_SALES = 'GET_DIRECT_SALES';
export const GET_DIRECT_SALES_SUCCESS = 'GET_DIRECT_SALES_SUCCESS';
export const GET_DIRECT_SALES_ERROR = 'GET_DIRECT_SALES_ERROR';

export const GET_SUMMARY_DIRECT_SALES = 'GET_DIRECT_SALES';
export const GET_SUMMARY_DIRECT_SALES_SUCCESS = 'GET_SUMMARY_DIRECT_SALES_SUCCESS';
export const GET_SUMMARY_DIRECT_SALES_ERROR = 'GET_SUMMARY_DIRECT_SALES_ERROR';


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
