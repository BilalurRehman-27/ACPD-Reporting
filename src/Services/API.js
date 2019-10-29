import axios from 'axios'
import qs from 'qs'
const LOGIN_URL = 'http://52.151.114.149/acpdreporting';
const DIRECT_SALES_BASE_URL = 'http://52.151.114.149/acpdreporting/api/DirectSales';

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
    return axios.post(LOGIN_URL + '/token', qs.stringify(requestLogin), config);
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
  }
}
export { apiCall };
