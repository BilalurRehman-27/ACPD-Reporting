
import {
  GET_DIRECT_SALES,
  GET_DIRECT_SALES_SUCCESS,
  GET_DIRECT_SALES_ERROR,
  GET_SUMMARY_DIRECT_SALES,
  GET_SUMMARY_DIRECT_SALES_SUCCESS,
  GET_SUMMARY_DIRECT_SALES_ERROR,
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
    default:
      return state;
  }
};
