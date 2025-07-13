import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CalcHistoryProvider } from './context/HistoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalcHistoryProvider>
      <App />
    </CalcHistoryProvider>
  </StrictMode>,
)
