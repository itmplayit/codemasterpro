import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SiteSettingsProvider } from './context/SiteSettingsContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <SiteSettingsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SiteSettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </HelmetProvider>
)
