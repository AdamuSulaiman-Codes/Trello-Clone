import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TrelloContextProvider from './store/Trello-Context.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrelloContextProvider>
      <App />
    </TrelloContextProvider>
  </StrictMode>,
)
