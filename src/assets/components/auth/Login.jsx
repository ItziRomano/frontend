import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Typography, Box } from '@mui/material'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch (err) {
      setError('Failed to login. Please check your credentials.')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
          <Box mt={2}>
            <Button
              onClick={() => navigate('/register')}
              color="secondary"
              fullWidth
            >
              Don't have an account? Register
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default Login