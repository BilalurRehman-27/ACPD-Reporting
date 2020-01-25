import axios from "axios";
import qs from "qs";
const BASE_URL = "http://52.151.114.149/acpdreporting";
const DIRECT_SALES_BASE_URL =
  "http://52.151.114.149/acpdreporting/api/DirectSales";
const INVOICES_BASE_URL = "http://52.151.114.149/acpdreporting/api/invoice";
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

var months = {
  "1": "Jan",
  "2": "Feb",
  "3": "Mar",
  "4": "Apr",
  "5": "May",
  "6": "Jun",
  "7": "Jul",
  "8": "Aug",
  "9": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
};

const apiCall = {
  GetLoginToken(name, password) {
    const requestLogin = {
      grant_type: "password",
      username: name,
      password: password
    };
    return axios.post(BASE_URL + "/token", qs.stringify(requestLogin), config);
  },
  GetMonthlyDirectSales(data) {
    return axios.get(
      DIRECT_SALES_BASE_URL +
        `/GetDirectSales?month=${data.month}&year=${data.year}&currency=${data.currency}`,
      {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.Access_Token,
          "Content-Type": "application/json"
        }
      }
    );
  },
  GetMonthlySummaryDirectSales(data) {
    switch (data.category) {
      case "1":
        return axios.get(
          DIRECT_SALES_BASE_URL +
            `/GetRevenueSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`
        );
      case "2":
        return axios.get(
          DIRECT_SALES_BASE_URL +
            `/GetOrderSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`
        );
      case "3":
        return axios.get(
          DIRECT_SALES_BASE_URL +
            `/GetUnitSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`
        );
      default:
        return null;
    }
  },
  GetInvoicesData(data) {
    return axios.get(
      INVOICES_BASE_URL +
        `/GetInvoiceOrderData?month=${data.month}&year=${data.year}&currency=${data.currency}`
    );
  },
  GetMonthlySummaryInvoiceSales(data) {
    switch (data.category) {
      case "1":
        return axios.get(
          INVOICES_BASE_URL +
            `/GetRevenueSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`
        );
      case "2":
        return axios.get(
          INVOICES_BASE_URL +
            `/GetOrderSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`
        );
      case "3":
        return axios.get(
          INVOICES_BASE_URL +
            `/GetUnitSummary?month=${data.month}&year=${data.year}&currency=${data.currency}`
        );
      default:
        return null;
    }
  },
  GetAffiliatedSalesReport(data) {
    if (data) {
      return axios.get(
        BASE_URL +
          `/api/AffiliateSales/GetAffiliateData?name=${data.name}&year=${data.year}`
      );
    } else {
      return axios.get(BASE_URL + `/api/AffiliateSales/GetAffiliateData`);
    }
  },
  GetAuthorRoyaltySalesReport(data) {
    if (data) {
      const { frommonth, fromyear, tomonth, toyear } = data;
      return axios.get(
        BASE_URL +
          `/api/AuthorRoyalty/GetAuthorRoyalty?frommonth=${frommonth}&fromyear=${fromyear}&tomonth=${tomonth}&toyear=${toyear}`
      );
    } else {
      return axios.get(BASE_URL + `/api/AuthorRoyalty/GetAuthorRoyalty`);
    }
  },
  GetYearList() {
    return axios.get(BASE_URL + `/api/lookup/GetYearList`);
  },
  GetProfList() {
    return axios.get(BASE_URL + `/api/lookup/GetProfBodyList`);
  },
  GetAuthorList() {
    return axios.get(BASE_URL + `/api/lookup/GetAuthorList`);
  },
  GetCurrencyList() {
    return axios.get(BASE_URL + `/api/lookup/GetCurrencyList`);
  },
  GetSalesTypeList() {
    return axios.get(BASE_URL + `/api/lookup/GetSalesTypeList`);
  },
  GetCountryList() {
    return axios.get(BASE_URL + `/api/lookup/GetCountryList`);
  },
  DownloadAffiliateReport() {
    const downloadURL = BASE_URL + `/api/AffiliateSales/DownloadReport`;
    window.open(downloadURL, "_blank");
    return axios.get(BASE_URL + `/api/AffiliateSales/DownloadReport`);
  },
  DownloadAuthorRoyaltyReport(data) {
    if (data) {
      var fileType = "application/vnd.ms-excel";
      const { frommonth, fromyear, tomonth, toyear } = data;
      var name = "AuthorRoyalty" + fromyear + "-" + toyear + ".xlsx";
      return axios
        .get(
          BASE_URL +
            `/api/AuthorRoyalty/DownloadReport?frommonth=${frommonth}&fromyear=${fromyear}
              &tomonth=${tomonth}&toyear=${toyear}`,
          {
            params: {},
            responseType: "blob",
            method: "GET",
            withCredentials: true,
            credentials: "include",
            headers: {
              Authorization: "bearer " + localStorage.Access_Token,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          var blob = new Blob([response.data], { type: fileType });

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, name);
          } else {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.download = name;
            document.body.appendChild(link);
            link.click();
          }
        })
        .then(data => {
          this.setState({
            mainLoading: false
          });
        })
        .catch(console.log);
    } else {
      return axios.get(BASE_URL + `/api/AuthorRoyalty/GetAuthorRoyalty`);
    }
  },
  DownloadDirectSalesMonthlyReport(data) {
    // const downloadURL =
    //   BASE_URL +
    //   `/api/Invoice/MonthlyReport?month=${data.month}&year=${data.year}&currency=${data.currency}`;
    // window.open(downloadURL, '_blank');
    var fileType = "application/vnd.ms-excel";
    var name =
      months[data.month] + "-" + data.year + "-" + data.currency + ".xlsx";
    axios(
      INVOICES_BASE_URL +
        `/MonthlyReport?month=${data.month}&year=${data.year}&currency=${data.currency}`,
      {
        params: {},
        responseType: "blob",
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: "bearer " + localStorage.Access_Token,
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        var blob = new Blob([response.data], { type: fileType });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, name);
        } else {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.download = name;
          document.body.appendChild(link);
          link.click();
        }
      })
      .then(data => {
        this.setState({
          mainLoading: false
        });
      })
      .catch(console.log);
  },
  UpdateInvoiceData(data) {
    return axios.post(BASE_URL + "/api/invoice/UpdateInvoiceData", data);
  },
  AddInvoiceData(data) {
    return axios.post(BASE_URL + "/api/invoice/UpdateInvoiceData", data);
  },
  GetPromotionCodesList() {
    return axios.get(BASE_URL + "/api/lookup/GetPromotionalRefList");
  },
  GetCurrencyRatesList() {
    return axios.get(BASE_URL + "/api/lookup/GetCurrencyConversionList");
  },
  UpdatePromoCodes(data) {
    return axios.post(BASE_URL + "/api/lookup/UpdatePromotionalRef", data);
  },
  AddPromoCodes(data) {
    return axios.post(BASE_URL + "/api/lookup/UpdatePromotionalRef", data);
  },
  UpdateCurrencyRates(data) {
    return axios.post(BASE_URL + "/api/lookup/UpdateCurrencyConversion", data);
  },
  AddCurrencyRates(data) {
    return axios.post(BASE_URL + "/api/lookup/UpdateCurrencyConversion", data);
  },
  DeleteCurrencyRates(data) {
    const { CurrencyId } = data;
    return axios.get(
      BASE_URL + `/api/lookup/DeleteCurrencyConversion?id=${CurrencyId}`
    );
  },
  DeleteInvoiceData(data) {
    const { InvoicesItems } = data;
    return axios.get(
      INVOICES_BASE_URL +
        `/DeleteInvoice?rowNumber=${InvoicesItems[0].RowNumber}&saleTypeId=${InvoicesItems[0].SalesTypeId}&currencyId=${InvoicesItems[0].CurrencyId}&invoiceNumber=${InvoicesItems[0].InvoiceNumber}`
    );
  },

  DownloadInvoiceReport(data) {
    const downloadURL =
      INVOICES_BASE_URL +
      `/MonthlyReport?month=${data.month}&year=${data.year}&currency=${data.currency}`;
    window.open(downloadURL, "_blank");
    return axios.get(
      INVOICES_BASE_URL +
        `/GetInvoiceOrderData?month=${data.month}&year=${data.year}&currency=${data.currency}`
    );
  }
};
export { apiCall };
