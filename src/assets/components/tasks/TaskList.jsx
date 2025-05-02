import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import taskService from '../../services/taskService'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import { Button, Container, Typography, Box, List } from '@mui/material'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await taskService.getTasks()
        setTasks(tasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchTasks()
  }, [])

  const handleCreate = async (description) => {
    try {
      const newTask = await taskService.createTask(description)
      setTasks([newTask, ...tasks])
      setShowForm(false)
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleUpdate = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, updates)
      setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ))
      setEditingTask(null)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId)
      setTasks(tasks.filter(task => task.id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <Container maxWidth="md">
      <Box mt={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">My Tasks</Typography>
          <Button variant="outlined" color="secondary" onClick={logout}>
            Logout
          </Button>
        </Box>

        {!showForm && !editingTask && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setShowForm(true)}
            fullWidth
          >
            Add New Task
          </Button>
        )}

        {(showForm || editingTask) && (
          <TaskForm
            onSubmit={editingTask ? 
              (data) => handleUpdate(editingTask.id, data) : 
              handleCreate
            }
            onCancel={() => {
              setShowForm(false)
              setEditingTask(null)
            }}
            initialData={editingTask}
          />
        )}

        <List>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => setEditingTask(task)}
              onDelete={handleDelete}
              onToggleComplete={(isCompleted) => 
                handleUpdate(task.id, { isCompleted })
              }
            />
          ))}
        </List>
      </Box>
    </Container>
  )
}

export default TaskList