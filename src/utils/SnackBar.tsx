import { Alert, Snackbar } from '@mui/material';
import React from 'react';

type SnackBarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info' | undefined;
};

export const snackBar = (props: SnackBarProps) => {
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={() => props.setOpen(false)}>
      <Alert onClose={() => props.setOpen(false)} severity={props.severity} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};
