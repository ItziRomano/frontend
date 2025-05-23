import axios from 'axios'

// const API_URL = 'http://localhost:5000/api/v1/tasks'
const API_URL = `${import.meta.env.VITE_API_URL}/tasks`



const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const createTask = async (description) => {
  const response = await axios.post(API_URL, { description }, getAuthHeader())
  return response.data
}

const getTasks = async () => {
  const response = await axios.get(API_URL, getAuthHeader())
  return response.data
}

const updateTask = async (taskId, { description, isCompleted }) => {
  const response = await axios.put(
    `${API_URL}/${taskId}`,
    { description, isCompleted },
    getAuthHeader()
  )
  return response.data
}

const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`, getAuthHeader())
}

export default { createTask, getTasks, updateTask, deleteTask }