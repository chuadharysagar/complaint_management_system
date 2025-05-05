import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom' // also fix this import
import AuthPage from './pages/AuthPage.jsx'
import App from './App'
import Layout from './pages/Layout.jsx'
import UsersList from './pages/UsersList.jsx'
import AddUsers from './components/AddUsers.jsx'
import UserContainer from './usercomponents/UserContainer.jsx'
import useAuthStore from './utils/useAuthStore.js'

function RootRoutes() {
  const { currentUser } = useAuthStore();

  return (
    <Routes>
      {currentUser?.role === 'user' ? (
        <Route path='/' element={<UserContainer />} />
      ) : (
        <Route path='/' element={<App />} />
      )}

      <Route element={<Layout />}>
        <Route path='/users' element={<UsersList />} />
        <Route path='/adduser' element={<AddUsers />} />
      </Route>

      <Route path='/auth' element={<AuthPage />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <RootRoutes />
    </StrictMode>
  </BrowserRouter>
);
