import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ContextProvider } from './context/AppContext'
import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider } from '@clerk/clerk-react'

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey='pk_test_YW11c2VkLW1vbGUtNjUuY2xlcmsuYWNjb3VudHMuZGV2JA' afterSignOutUrl={"/sign-in"}>
    <ContextProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ContextProvider>
  </ClerkProvider>
)
