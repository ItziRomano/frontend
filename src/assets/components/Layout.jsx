import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from './auth/Login'
import Register from './auth/Register'
import TaskList from './tasks/TaskList'

const Layout = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/tasks" /> : <Login />
      } />
      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/tasks" /> : <Register />
      } />
      <Route path="/tasks" element={
        isAuthenticated ? <TaskList /> : <Navigate to="/login" />
      } />
      <Route path="/" element={
        <Navigate to={isAuthenticated ? '/tasks' : '/login'} />
      } />
    </Routes>
  )
}

export default Layout