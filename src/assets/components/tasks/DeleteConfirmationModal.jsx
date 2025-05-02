import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography
  } from '@mui/material';
  
  const DeleteConfirmationModal = ({ open, onClose, onConfirm, taskDescription }) => {
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '16px'
          }
        }}
      >
        <DialogTitle className="modal-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText className="modal-text">
            Are you sure you want to delete the task: 
            <Typography component="span" color="primary" className="task-description">
              {` "${taskDescription}"`}
            </Typography>?
          </DialogContentText>
          <DialogContentText className="modal-warning">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="modal-actions">
          <Button 
            onClick={onClose} 
            color="primary"
            variant="outlined"
            className="cancel-button"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            color="error" 
            variant="contained"
            className="confirm-button"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DeleteConfirmationModal;