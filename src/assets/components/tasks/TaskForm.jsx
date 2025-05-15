import { useState, useEffect } from 'react'
import { 
  TextField, 
  Button, 
  Box,
  Typography
} from '@mui/material'

const TaskForm = ({ onSubmit, onCancel, initialData }) => {
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description)
    }
  }, [initialData])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   onSubmit({ description })
  // }
  const handleSubmit = (e) => {
  e.preventDefault()
  if (initialData) {
    onSubmit({ description }) // Para editar
  } else {
    onSubmit(description) // Para crear
  }
}

  return (
    <Box mt={2} mb={4} p={2} className="task-form">
      <Typography variant="h6" gutterBottom className="form-title">
        {initialData ? 'Edit Task' : 'Add New Task'}
      </Typography>
      <form onSubmit={handleSubmit} className="form-container">
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="task-input"
        />
        <Box mt={2} display="flex" justifyContent="flex-end" className="form-actions">
          <Button 
            variant="outlined" 
            onClick={onCancel}
            className="cancel-button"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            className="submit-button"
          >
            {initialData ? 'Update' : 'Add'} Task
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default TaskForm