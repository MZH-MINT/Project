import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Typography } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: (confirm: boolean) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this employee?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          No
        </Button>
        <Button onClick={() => onClose(true)} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
