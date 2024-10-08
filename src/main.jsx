import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContext from "./components/AppContext.jsx"
import App from './components/App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </StrictMode>,
)
