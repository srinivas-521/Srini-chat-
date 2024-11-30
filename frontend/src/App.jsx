import React, { useEffect } from 'react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from "./pages/SignUpPage.jsx"
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader } from "lucide-react"
import {Toaster} from "react-hot-toast"
import Layout from './components/Layout.jsx'


function App() {

  const { authUser, checkAuth, isCheckingAuth , onlineUsers } = useAuthStore();

  

 

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className=" size-10 animate-spin" />
      </div>
    )
  }

  return (
    <Layout data-theme="retro">
      

      <Routes>

        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ?<LoginPage />:<Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={ authUser ? <ProfilePage />: <Navigate to="/login" />} />


      </Routes>

      <Toaster/>
      </Layout>
  )
}

export default App