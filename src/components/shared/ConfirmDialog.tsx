import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface ConfirmDialogProps {
  title: string;
  content: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm:
    | (() => void)
    | ((...args: any[]) => void)
    | (() => Promise<void>);
}

const ConfirmDialog = ({
  title,
  content,
  open,
  handleClose,
  handleConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
          autoFocus
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
