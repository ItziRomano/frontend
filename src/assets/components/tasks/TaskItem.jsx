import { useState } from 'react'
import { 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Checkbox,
  Typography
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material' // Importación corregida
import DeleteConfirmationModal from './DeleteConfirmationModal'

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const handleToggleComplete = () => {
    onToggleComplete(!task.is_completed)
  }

  return (
    <>
      <ListItem className={`task-item ${task.is_completed ? 'completed' : ''}`}>
        <Checkbox
          checked={task.is_completed}
          onChange={handleToggleComplete}
          color="primary"
          className="task-checkbox"
        />
        <ListItemText
          primary={
            <Typography 
              className={`task-description ${task.is_completed ? 'completed-text' : ''}`}
            >
              {task.description}
            </Typography>
          }
          secondary={`Created: ${new Date(task.created_at).toLocaleString()}`}
          className="task-info"
        />
        <ListItemSecondaryAction className="task-actions">
          <IconButton 
            edge="end" 
            onClick={() => onEdit(task)}
            className="edit-button"
          >
            <Edit />
          </IconButton>
          <IconButton 
            edge="end" 
            onClick={() => setDeleteModalOpen(true)}
            className="delete-button"
          >
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          onDelete(task.id)
          setDeleteModalOpen(false)
        }}
        taskDescription={task.description}
      />
    </>
  )
}

export default TaskItem