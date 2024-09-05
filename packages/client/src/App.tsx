import { Route, Routes } from "react-router-dom";
import InvoicesPage from "./pages/InvoicesPage";
import RedirectTo from "./pages/RedirectTo";
import InvoicePage from "./pages/InvoicePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RedirectTo path="/invoices" />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/invoices/:invoiceId" element={<InvoicePage />} />
        <Route path="*" element={<p>Page does not exist</p>} />
      </Routes>
    </>
  );
}

export default App;
