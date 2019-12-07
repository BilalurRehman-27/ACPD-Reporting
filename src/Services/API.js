import axios from 'axios'
import qs from 'qs'
const BASE_URL = 'http://52.151.114.149/acpdreporting';
const DIRECT_SALES_BASE_URL = 'http://52.151.114.149/acpdreporting/api/DirectSales';
const INVOICES_BASE_URL = 'http://52.151.114.149/acpdreporting/api/invoice';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const apiCall = {
  GetLoginToken(name, password) {
    const requestLogin = {
      'grant_type': 'password',
      'username': name,
      'password': password
    }
    return axios.post(BASE_URL + '/token', qs.stringify(requestLogin), config);
  },
  GetMonthlyDirectSales(data) {
    return axios.get(DIRECT_SALES_BASE_URL + `/GetDirectSales?month=${data.month}&year=${data.year}&currency=${data.currency}`);
  },
  GetMonthlySummaryDirectSales(data) {
    switch (data.category) {
      case "1":
        return axios.get(DIRECT_SALES_BASE_URL + `/GetRevenueSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`);
      case "2":
        return axios.get(DIRECT_SALES_BASE_URL + `/GetOrderSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`);
      case "3":
        return axios.get(DIRECT_SALES_BASE_URL + `/GetUnitSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`);
      default:
        return null;
    }
  },
  GetInvoicesData(data) {
    return axios.get(INVOICES_BASE_URL + `/GetInvoiceData?month=${data.month}&year=${data.year}&currency=${data.currency}`);
  },
  GetMonthlySummaryInvoiceSales(data) {
    switch (data.category) {
      case "1":
        return axios.get(INVOICES_BASE_URL + `/GetRevenueSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`);
      case "2":
        return axios.get(INVOICES_BASE_URL + `/GetOrderSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`);
      case "3":
        return axios.get(INVOICES_BASE_URL + `/GetUnitSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`);
      default:
        return null;
    }
  },
  GetAffiliatedSalesReport(data) {
    if (data) {
      return axios.get(BASE_URL + `/api/AffiliateSales/GetAffiliateData?name=${data.name}&year=${data.year}`);
    }
    else {
      return axios.get(BASE_URL + `/api/AffiliateSales/GetAffiliateData`);
    }
  },
  GetAuthorRoyaltySalesReport(data) {

    if (data) {
      const { name, year } = data;
      if (name && year)
        return axios.get(BASE_URL + `/api/AuthorRoyalty/GetAuthorRoyalty?name=${data.name}&year=${data.year}`);
      if (name) {
        return axios.get(BASE_URL + `/api/AuthorRoyalty/GetAuthorRoyalty?name=${data.name}`);
      }
      if (year) {
        return axios.get(BASE_URL + `/api/AuthorRoyalty/GetAuthorRoyalty?year=${data.year}`);
      }
      else {
        return axios.get(BASE_URL + `/api/AuthorRoyalty/GetAuthorRoyalty`);
      }
    }
    else {
      return axios.get(BASE_URL + `/api/AuthorRoyalty/GetAuthorRoyalty`);
    }
  },
  GetYearList() {
    return axios.get(BASE_URL + `/api/lookup/GetYearList`)
  },
  GetProfList() {
    return axios.get(BASE_URL + `/api/lookup/GetProfBodyList`)
  },
  GetAuthorList() {
    return axios.get(BASE_URL + `/api/lookup/GetAuthorList`)
  },
  GetCurrencyList() {
    return axios.get(BASE_URL + `/api/lookup/GetCurrencyList`)
  },
  DownloadAffiliateReport() {
    return axios.get(BASE_URL + `/api/AffiliateSales/DownloadReport`)
  },
  DownloadAuthorRoyaltyReport() {
    return axios.get(BASE_URL + `/api/AuthorRoyalty/DownloadReport`)
  },
  DownloadDirectSalesMonthlyReport(data) {
    const downloadURL = BASE_URL + `/api/Invoice/MonthlyReport?month=${data.month}&year=${data.year}&currency=${data.currency}`;
    window.open(downloadURL, '_blank');
  }
}
export { apiCall };
