
import {
  GET_DIRECT_SALES,
  GET_DIRECT_SALES_SUCCESS,
  GET_DIRECT_SALES_ERROR,
  GET_SUMMARY_DIRECT_SALES,
  GET_SUMMARY_DIRECT_SALES_SUCCESS,
  GET_SUMMARY_DIRECT_SALES_ERROR,
  GET_INVOICE_SALES,
  GET_INVOICE_SALES_SUCCESS,
  GET_INVOICE_SALES_ERROR,
  GET_SUMMARY_INVOICE_SALES,
  GET_SUMMARY_INVOICE_SALES_SUCCESS,
  GET_SUMMARY_INVOICE_SALES_ERROR,
  GET_AFFILIATED_SALES,
  GET_AFFILIATED_SALES_SUCCESS,
  GET_AFFILIATED_SALES_ERROR,
  GET_YEAR_LIST,
  GET_YEAR_LIST_SUCCESS,
  GET_YEAR_LIST_ERROR,
  GET_PROF_LIST,
  GET_PROF_LIST_SUCCESS,
  GET_PROF_LIST_ERROR,
  GET_AUTHOR_LIST,
  GET_AUTHOR_LIST_SUCCESS,
  GET_AUTHOR_LIST_ERROR,
  GET_AFFILIATE_REPORT,
  GET_AFFILIATE_REPORT_SUCCESS,
  GET_AFFILIATE_REPORT_ERROR,
  GET_AUTHOR_ROYALTY_SALES,
  GET_AUTHOR_ROYALTY_SALES_SUCCESS,
  GET_AUTHOR_ROYALTY_SALES_ERROR,
  GET_AUTHOR_ROYALTY_REPORT,
  GET_AUTHOR_ROYALTY_REPORT_SUCCESS,
  GET_AUTHOR_ROYALTY_REPORT_ERROR,
  GET_CURRENCY_LIST,
  GET_CURRENCY_LIST_SUCCESS,
  GET_CURRENCY_LIST_ERROR,
} from '../actions/actions'
const posReducerDefaultState = {
  loading: false,
  data: [],
  error: '',
};

export default (state = posReducerDefaultState, action = {}) => {
  switch (action.type) {
    case GET_DIRECT_SALES:
      return {
        ...state,
        loading: true,
      }
    case GET_DIRECT_SALES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_DIRECT_SALES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_SUMMARY_DIRECT_SALES:
      return {
        ...state,
        loading: true,
      };
    case GET_SUMMARY_DIRECT_SALES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_SUMMARY_DIRECT_SALES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_INVOICE_SALES:
      return {
        ...state,
        loading: true,
      }
    case GET_INVOICE_SALES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_INVOICE_SALES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_SUMMARY_INVOICE_SALES:
      return {
        ...state,
        loading: true,
      };
    case GET_SUMMARY_INVOICE_SALES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_SUMMARY_INVOICE_SALES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_AFFILIATED_SALES:
      return {
        ...state,
        loading: true,
      };
    case GET_AFFILIATED_SALES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_AFFILIATED_SALES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_YEAR_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_YEAR_LIST_SUCCESS:
      return {
        ...state,
        yearsList: action.payload,
        loading: false,
      };
    case GET_YEAR_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_PROF_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROF_LIST_SUCCESS:
      return {
        ...state,
        profList: action.payload,
        loading: false,
      };
    case GET_PROF_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_AUTHOR_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_AUTHOR_LIST_SUCCESS:
      return {
        ...state,
        authorList: action.payload,
        loading: false,
      };
    case GET_AUTHOR_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_AFFILIATE_REPORT:
      return {
        ...state,
        loading: true,
      };
    case GET_AFFILIATE_REPORT_SUCCESS:
      return {
        ...state,
        exportedData: action.payload,
        loading: false,
      };
    case GET_AFFILIATE_REPORT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_AUTHOR_ROYALTY_REPORT:
      return {
        ...state,
        loading: true,
      };
    case GET_AUTHOR_ROYALTY_REPORT_SUCCESS:
      return {
        ...state,
        exportedData: action.payload,
        loading: false,
      };
    case GET_AUTHOR_ROYALTY_REPORT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_AUTHOR_ROYALTY_SALES:
      return {
        ...state,
        loading: true,
      };
    case GET_AUTHOR_ROYALTY_SALES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_AUTHOR_ROYALTY_SALES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_CURRENCY_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_CURRENCY_LIST_SUCCESS:
      return {
        ...state,
        currencyList: action.payload,
        loading: false,
      };
    case GET_CURRENCY_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
