import axios from 'axios'

// const API_URL = 'http://localhost:5000/api/v1/auth'
const API_URL = `${import.meta.env.VITE_API_URL}/auth`

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