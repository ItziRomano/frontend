import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box,
  Link
} from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, firstName, lastName);
    } catch (err) {
      setError('Failed to register. Email may already be in use.');
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
              Register
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Link 
              component="button" 
              onClick={() => navigate('/login')}
              underline="hover"
            >
              Already have an account? Login
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;