import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import TrelloContextProvider from './store/Trello-Context.jsx'
import router from './routes/routes.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrelloContextProvider>
      <RouterProvider router={router}/>
    </TrelloContextProvider>
  </StrictMode>,
)
