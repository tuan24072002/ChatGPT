import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ContextProvider } from './context/AppContext'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </ContextProvider>
)
