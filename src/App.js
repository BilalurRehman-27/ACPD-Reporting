import React from "react";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import MonthlyReports from "./components/monthlyReport";
import { Switch, Route } from "react-router-dom";
import DirectSales from "./components/directSales";
import SummaryDirectSales from "./components/summaryDS";
import Invoices from "./components/invoices";
import SummaryInvoices from "./components/summaryInvoices";
import AffiliateReport from "./components/affiliateReport";
import InvoiceData from "./components/invoiceData"
import Page404 from "./components/pageNotFound";
import AuthorRoyalties from './components/authorRoyalties'
import UploadInvoiceData from './components/uploadInvoiceData'
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/monthlyReport" component={MonthlyReports} />
        <Route path="/directSales" component={DirectSales} />
        <Route path="/summaryDS" component={SummaryDirectSales} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/summaryInvoices" component={SummaryInvoices} />
        <Route path="/affiliateReport" component={AffiliateReport} />
        <Route path="/authorRoyalties" component={AuthorRoyalties} />
        <Route path="/invoiceData" component={InvoiceData} />
        <Route path="/uploadInvoiceData" component={UploadInvoiceData} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
