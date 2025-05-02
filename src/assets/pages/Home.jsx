import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Box, Typography } from '@mui/material'

const Home = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks')
    } else {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <Box className="home-container">
      <Typography variant="h4" className="welcome-text">
        Welcome to the Todo App
      </Typography>
    </Box>
  )
}

export default Home