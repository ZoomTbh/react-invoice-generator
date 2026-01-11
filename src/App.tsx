import InvoicePage from './components/InvoicePage'
import { Invoice } from './data/types'

function generateQuotationNumber(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  
  // Format: YYYYMMDD-HHMMSS (e.g., 20260110-143052)
  return `${year}${month}${day}-${hours}${minutes}${seconds}`
}

function App() {
  const savedInvoice = window.localStorage.getItem('invoiceData')
  let data = null

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice)
    }
  } catch (_e) {}

  // If no saved invoice, generate new quotation number based on timestamp
  if (!data) {
    const quotationNumber = generateQuotationNumber()
    data = { invoiceTitle: quotationNumber }
  }

  const onInvoiceUpdated = (invoice: Invoice) => {
    window.localStorage.setItem('invoiceData', JSON.stringify(invoice))
  }

  const onNewQuotation = () => {
    window.localStorage.removeItem('invoiceData')
    window.location.reload()
  }

  return (
    <div className="app">
      <h1 className="center fs-30">React Invoice Generator</h1>
      <button onClick={onNewQuotation} className="new-quotation-btn">
        + New Quotation
      </button>
      <InvoicePage data={data} onChange={onInvoiceUpdated} />
    </div>
  )
}

export default App
