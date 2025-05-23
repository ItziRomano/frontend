import axios from 'axios'

const API_URL = 'https://backend-1-pway.onrender.com/api/auth'
// const API_URL = 'http://localhost:5000/api/auth'

const register = async (email, password, firstName, lastName) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    password,
    firstName,
    lastName
  })
  return response.data
}

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password
  })
  return response.data
}

export default { register, login }