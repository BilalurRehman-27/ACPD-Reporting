import { apiCall } from '../Services/API';
export const GET_DIRECT_SALES = 'GET_DIRECT_SALES';
export const GET_DIRECT_SALES_SUCCESS = 'GET_DIRECT_SALES_SUCCESS';
export const GET_DIRECT_SALES_ERROR = 'GET_DIRECT_SALES_ERROR';

export const GET_SUMMARY_DIRECT_SALES = 'GET_DIRECT_SALES';
export const GET_SUMMARY_DIRECT_SALES_SUCCESS =
  'GET_SUMMARY_DIRECT_SALES_SUCCESS';
export const GET_SUMMARY_DIRECT_SALES_ERROR = 'GET_SUMMARY_DIRECT_SALES_ERROR';

export const GET_INVOICE_SALES = 'GET_INVOICE_SALES';
export const GET_INVOICE_SALES_SUCCESS = 'GET_INVOICE_SALES_SUCCESS';
export const GET_INVOICE_SALES_ERROR = 'GET_INVOICE_SALES_ERROR';

export const GET_SUMMARY_INVOICE_SALES = 'GET_INVOICE_SALES';
export const GET_SUMMARY_INVOICE_SALES_SUCCESS =
  'GET_SUMMARY_INVOICE_SALES_SUCCESS';
export const GET_SUMMARY_INVOICE_SALES_ERROR =
  'GET_SUMMARY_INVOICE_SALES_ERROR';

export const GET_AFFILIATED_SALES = 'GET_AFFILIATED_SALES';
export const GET_AFFILIATED_SALES_SUCCESS = 'GET_AFFILIATED_SALES_SUCCESS';
export const GET_AFFILIATED_SALES_ERROR = 'GET_AFFILIATED_SALES_ERROR';

export const GET_YEAR_LIST = 'GET_YEAR_LIST';
export const GET_YEAR_LIST_SUCCESS = 'GET_YEAR_LIST_SUCCESS';
export const GET_YEAR_LIST_ERROR = 'GET_YEAR_LIST_ERROR';

export const GET_PROF_LIST = 'GET_PROF_LIST';
export const GET_PROF_LIST_SUCCESS = 'GET_PROF_LIST_SUCCESS';
export const GET_PROF_LIST_ERROR = 'GET_PROF_LIST_ERROR';

export const GET_AFFILIATE_REPORT = 'GET_AFFILIATE_REPORT';
export const GET_AFFILIATE_REPORT_SUCCESS = 'GET_AFFILIATE_REPORT_SUCCESS';
export const GET_AFFILIATE_REPORT_ERROR = 'GET_AFFILIATE_REPORT_ERROR';

export const GET_AUTHOR_ROYALTY_REPORT = 'GET_AUTHOR_ROYALTY_REPORT';
export const GET_AUTHOR_ROYALTY_REPORT_SUCCESS =
  'GET_AUTHOR_ROYALTY_REPORT_SUCCESS';
export const GET_AUTHOR_ROYALTY_REPORT_ERROR =
  'GET_AUTHOR_ROYALTY_REPORT_ERROR';

export const GET_AUTHOR_LIST = 'GET_AUTHOR_LIST';
export const GET_AUTHOR_LIST_SUCCESS = 'GET_AUTHOR_LIST_SUCCESS';
export const GET_AUTHOR_LIST_ERROR = 'GET_AUTHOR_LIST_ERROR';

export const GET_AUTHOR_ROYALTY_SALES = 'GET_AUTHOR_ROYALTY_SALES';
export const GET_AUTHOR_ROYALTY_SALES_SUCCESS =
  'GET_AUTHOR_ROYALTY_SALES_SUCCESS';
export const GET_AUTHOR_ROYALTY_SALES_ERROR = 'GET_AUTHOR_ROYALTY_SALES_ERROR';

export const GET_CURRENCY_LIST = 'GET_CURRENCY_LIST';
export const GET_CURRENCY_LIST_SUCCESS = 'GET_CURRENCY_LIST_SUCCESS';
export const GET_CURRENCY_LIST_ERROR = 'GET_CURRENCY_LIST_ERROR';

export const GET_SALES_TYPE_LIST = 'GET_SALES_TYPE_LIST';
export const GET_SALES_TYPE_LIST_SUCCESS = 'GET_SALES_TYPE_LIST_SUCCESS';
export const GET_SALES_TYPE_LIST_ERROR = 'GET_SALES_TYPE_LIST_ERROR';

export const GET_PROMOTION_CODES_LIST = 'GET_PROMOTION_CODES_LIST';
export const GET_PROMOTION_CODES_LIST_SUCCESS =
  'GET_PROMOTION_CODES_LIST_SUCCESS';
export const GET_PROMOTION_CODES_LIST_ERROR = 'GET_PROMOTION_CODES_LIST_ERROR';

export const GET_CURRENCY_RATES = 'GET_CURRENCY_RATES';
export const GET_CURRENCY_RATES_SUCCESS = 'GET_CURRENCY_RATES_SUCCESS';
export const GET_CURRENCY_RATES_ERROR = 'GET_CURRENCY_RATES_ERROR';

export const GET_COUNTRY_LIST = 'GET_COUNTRY_LIST';
export const GET_COUNTRY_LIST_SUCCESS = 'GET_COUNTRY_LIST_SUCCESS';
export const GET_COUNTRY_LIST_ERROR = 'GET_COUNTRY_LIST_ERROR';

// Monthly DirectSales
export const _requestDirectSales = () => {
  return {
    type: GET_DIRECT_SALES,
  };
};
export const _getDirectSalesSuccess = data => {
  return {
    type: GET_DIRECT_SALES_SUCCESS,
    payload: data,
  };
};
export const _getDirectSalesError = error => {
  return {
    type: GET_DIRECT_SALES_ERROR,
    error,
  };
};
export const getDirectSales = data => {
  return dispatch => {
    dispatch(_requestDirectSales());
    apiCall
      .GetMonthlyDirectSales(data)
      .then(data => {
        dispatch(_getDirectSalesSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getDirectSalesError(error));
      });
  };
};

// Summary Monthly DirectSales

export const _requestSummaryDirectSales = () => {
  return {
    type: GET_SUMMARY_DIRECT_SALES,
  };
};
export const _getSummaryDirectSalesSuccess = data => {
  return {
    type: GET_SUMMARY_DIRECT_SALES_SUCCESS,
    payload: data,
  };
};
export const _getSummaryDirectSalesError = error => {
  return {
    type: GET_SUMMARY_DIRECT_SALES_ERROR,
    error,
  };
};
export const getSummaryDirectSales = data => {
  return dispatch => {
    dispatch(_requestSummaryDirectSales());
    apiCall
      .GetMonthlySummaryDirectSales(data)
      .then(data => {
        dispatch(_getSummaryDirectSalesSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getSummaryDirectSalesError(error));
      });
  };
};

//Invoices
export const _requestInvoicesData = () => {
  return {
    type: GET_INVOICE_SALES,
  };
};
export const _getInvoicesDataSuccess = data => {
  return {
    type: GET_INVOICE_SALES_SUCCESS,
    payload: data,
  };
};
export const _getInvoicesDataError = error => {
  return {
    type: GET_INVOICE_SALES_ERROR,
    error,
  };
};
export const getInvoicesData = data => {
  return dispatch => {
    dispatch(_requestInvoicesData());
    apiCall
      .GetInvoicesData(data)
      .then(data => {
        dispatch(_getInvoicesDataSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getInvoicesDataError(error));
      });
  };
};

//Summary Invoices
export const _requestSummaryInvoiceSales = () => {
  return {
    type: GET_SUMMARY_INVOICE_SALES,
  };
};
export const _getSummaryInvoiceSalesSuccess = data => {
  return {
    type: GET_SUMMARY_INVOICE_SALES_SUCCESS,
    payload: data,
  };
};
export const _getSummaryInvoiceSalesError = error => {
  return {
    type: GET_SUMMARY_INVOICE_SALES_ERROR,
    error,
  };
};
export const getSummaryInvoiceSales = data => {
  return dispatch => {
    dispatch(_requestSummaryInvoiceSales());
    apiCall
      .GetMonthlySummaryInvoiceSales(data)
      .then(data => {
        dispatch(_getSummaryInvoiceSalesSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getSummaryInvoiceSalesError(error));
      });
  };
};

//Affiliate Sales
export const _requestAffiliatedSalesReports = () => {
  return {
    type: GET_AFFILIATED_SALES,
  };
};
export const _getAffiliatedSalesReportsSuccess = data => {
  return {
    type: GET_AFFILIATED_SALES_SUCCESS,
    payload: data,
  };
};
export const _getAffiliatedSalesReportsError = error => {
  return {
    type: GET_AFFILIATED_SALES_ERROR,
    error,
  };
};
export const getAffiliatedSalesReports = data => {
  return dispatch => {
    dispatch(_requestAffiliatedSalesReports());
    apiCall
      .GetAffiliatedSalesReport(data)
      .then(data => {
        dispatch(_getAffiliatedSalesReportsSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getAffiliatedSalesReportsError(error));
      });
  };
};

//Year List
export const _requestYearList = () => {
  return {
    type: GET_YEAR_LIST,
  };
};
export const _getYearListSuccess = data => {
  return {
    type: GET_YEAR_LIST_SUCCESS,
    payload: data,
  };
};
export const _getYearListError = error => {
  return {
    type: GET_YEAR_LIST_ERROR,
    error,
  };
};
export const getYearList = data => {
  return dispatch => {
    dispatch(_requestYearList());
    apiCall
      .GetYearList(data)
      .then(data => {
        dispatch(_getYearListSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getYearListError(error));
      });
  };
};

//Prof List
export const _requestProfList = () => {
  return {
    type: GET_PROF_LIST,
  };
};
export const _getProfListSuccess = data => {
  return {
    type: GET_PROF_LIST_SUCCESS,
    payload: data,
  };
};
export const _getProfListError = error => {
  return {
    type: GET_PROF_LIST_ERROR,
    error,
  };
};
export const getProfBodyList = data => {
  return dispatch => {
    dispatch(_requestProfList());
    apiCall
      .GetProfList(data)
      .then(data => {
        dispatch(_getProfListSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getProfListError(error));
      });
  };
};

//Author List
export const _requestAuthorList = () => {
  return {
    type: GET_AUTHOR_LIST,
  };
};
export const _getAuthorListSuccess = data => {
  return {
    type: GET_AUTHOR_LIST_SUCCESS,
    payload: data,
  };
};
export const _getAuthorListError = error => {
  return {
    type: GET_AUTHOR_LIST_ERROR,
    error,
  };
};
export const getAuthorList = data => {
  return dispatch => {
    dispatch(_requestAuthorList());
    apiCall
      .GetAuthorList(data)
      .then(data => {
        dispatch(_getAuthorListSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getAuthorListError(error));
      });
  };
};

//Export Affiliate Report
export const _requestDownloadAffiliateReport = () => {
  return {
    type: GET_AFFILIATE_REPORT,
  };
};
export const _getDownloadAffiliateReportSuccess = data => {
  return {
    type: GET_AFFILIATE_REPORT_SUCCESS,
    payload: data,
  };
};
export const _getDownloadAffiliateReportError = error => {
  return {
    type: GET_AFFILIATE_REPORT_ERROR,
    error,
  };
};
export const downloadAffiliateReport = () => {
  return dispatch => {
    dispatch(_requestDownloadAffiliateReport());
    apiCall
      .DownloadAffiliateReport()
      .then(data => {
        dispatch(_getDownloadAffiliateReportSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getDownloadAffiliateReportError(error));
      });
  };
};

export const _requestAuthorRoyaltiesSale = () => {
  return {
    type: GET_AUTHOR_ROYALTY_SALES,
  };
};
export const _getAuthorRoyaltiesSaleSuccess = data => {
  return {
    type: GET_AUTHOR_ROYALTY_SALES_SUCCESS,
    payload: data,
  };
};
export const _getAuthorRoyaltiesSaleError = error => {
  return {
    type: GET_AUTHOR_ROYALTY_SALES_ERROR,
    error,
  };
};
export const getAuthorRoyaltiesSale = data => {
  return dispatch => {
    dispatch(_requestAuthorRoyaltiesSale());
    apiCall
      .GetAuthorRoyaltySalesReport(data)
      .then(data => {
        dispatch(_getAuthorRoyaltiesSaleSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getAuthorRoyaltiesSaleError(error));
      });
  };
};

//Export Author Royalties Report
export const _requestDownloadAuthorRoyaltyReport = () => {
  return {
    type: GET_AUTHOR_ROYALTY_REPORT,
  };
};
export const _getDownloadAuthorRoyaltyReportSuccess = data => {
  return {
    type: GET_AUTHOR_ROYALTY_REPORT_SUCCESS,
    payload: data,
  };
};
export const _getDownloadAuthorRoyaltyReportError = error => {
  return {
    type: GET_AUTHOR_ROYALTY_REPORT_ERROR,
    error,
  };
};
export const downloadAuthorRoyalties = () => {
  return dispatch => {
    dispatch(_requestDownloadAuthorRoyaltyReport());
    apiCall
      .DownloadAuthorRoyaltyReport()
      .then(data => {
        dispatch(_getDownloadAuthorRoyaltyReportSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getDownloadAuthorRoyaltyReportError(error));
      });
  };
};

// Currency List
export const _requestCurrencyList = () => {
  return {
    type: GET_CURRENCY_LIST,
  };
};
export const _getCurrencyListSuccess = data => {
  return {
    type: GET_CURRENCY_LIST_SUCCESS,
    payload: data,
  };
};
export const _getCurrencyListError = error => {
  return {
    type: GET_CURRENCY_LIST_ERROR,
    error,
  };
};
export const getCurrencyList = () => {
  return dispatch => {
    dispatch(_requestCurrencyList());
    apiCall
      .GetCurrencyList()
      .then(data => {
        dispatch(_getCurrencyListSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getCurrencyListError(error));
      });
  };
};

// Sales Type List
export const _requestSalesTypeList = () => {
  return {
    type: GET_SALES_TYPE_LIST,
  };
};
export const _getSalesTypeListSuccess = data => {
  return {
    type: GET_SALES_TYPE_LIST_SUCCESS,
    payload: data,
  };
};
export const _getSalesTypeListError = error => {
  return {
    type: GET_SALES_TYPE_LIST_ERROR,
    error,
  };
};
export const getSalesTypeList = () => {
  return dispatch => {
    dispatch(_requestSalesTypeList());
    apiCall
      .GetSalesTypeList()
      .then(data => {
        dispatch(_getSalesTypeListSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getSalesTypeListError(error));
      });
  };
};

// Country List
export const _requestCountryList = () => {
  return {
    type: GET_COUNTRY_LIST,
  };
};
export const _getCountryListSuccess = data => {
  return {
    type: GET_COUNTRY_LIST_SUCCESS,
    payload: data,
  };
};
export const _getCountryListError = error => {
  return {
    type: GET_COUNTRY_LIST_ERROR,
    error,
  };
};
export const getCountryList = () => {
  return dispatch => {
    dispatch(_requestCountryList());
    apiCall
      .GetCountryList()
      .then(data => {
        dispatch(_getCountryListSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getCountryListError(error));
      });
  };
};

// PromotionCodes List
export const _requestPromotionCodesList = () => {
  return {
    type: GET_PROMOTION_CODES_LIST,
  };
};
export const _getPromotionCodesListSuccess = data => {
  return {
    type: GET_PROMOTION_CODES_LIST_SUCCESS,
    payload: data,
  };
};
export const _getPromotionCodesListError = error => {
  return {
    type: GET_PROMOTION_CODES_LIST_ERROR,
    error,
  };
};
export const getPromotionCodesList = () => {
  return dispatch => {
    dispatch(_requestPromotionCodesList());
    apiCall
      .GetPromotionCodesList()
      .then(data => {
        dispatch(_getPromotionCodesListSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getPromotionCodesListError(error));
      });
  };
};

// Currency List
export const _requestCurrencyRatesList = () => {
  return {
    type: GET_CURRENCY_RATES,
  };
};
export const _getCurrencyRatesListSuccess = data => {
  return {
    type: GET_CURRENCY_RATES_SUCCESS,
    payload: data,
  };
};
export const _getCurrencyRatesListError = error => {
  return {
    type: GET_CURRENCY_RATES_ERROR,
    error,
  };
};
export const getCurrencyRatesList = () => {
  return dispatch => {
    dispatch(_requestCurrencyRatesList());
    apiCall
      .GetCurrencyRatesList()
      .then(data => {
        dispatch(_getCurrencyRatesListSuccess(data.data));
      })
      .catch(error => {
        dispatch(_getCurrencyRatesListError(error));
      });
  };
};
