import {
  AppBar, Toolbar, Typography, Button, Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState, FC, useCallback } from 'react';
import axios from 'axios';

export interface IStickyAppBarProps {
  showLogout?: boolean;
}

const StickyAppBar: FC<IStickyAppBarProps> = ({
  showLogout = true,
}) => {
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const onLogout = async () => {
    setLoggingOut(true);
    setHasError(false);
    try {
      await axios.post('/api/eventx/logout');
      window.location.assign('/login');
    } catch (e) {
      setHasError(true);
    } finally {
      setLoggingOut(false);
    }
  };

  const handleErrorClose = useCallback(() => {
    setHasError(false);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          EventX eSaaS Tool
        </Typography>
        {showLogout && <Button disabled={loggingOut} onClick={onLogout} color="inherit">Logout</Button>}
      </Toolbar>
      <Snackbar open={hasError} autoHideDuration={3000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          Unable to log out!
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default StickyAppBar;
