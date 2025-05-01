import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthPage from './pages/AuthPage.jsx'
import App from './App'
import ManageUsers from './pages/ManageUsers.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/users' element={<ManageUsers />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
