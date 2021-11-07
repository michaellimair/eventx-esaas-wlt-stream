import { FormEventHandler, useState, useCallback } from 'react';
import axios from 'axios';
import StickyAppBar from 'components/StickyAppBar';
import {
  Box, Button, Paper, Snackbar, TextField, Typography,
} from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import nookies from 'nookies';
import { Alert } from '@material-ui/lab';
import TEDxFooter from 'components/TEDxFooter';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasError(false);
    try {
      await axios.post('/api/eventx/login', {
        email,
        password,
      });
      window.location.assign('/events');
    } catch (err) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const handleErrorClose = useCallback(() => {
    setHasError(false);
  }, []);

  return (
    <>
      <StickyAppBar showLogout={false} />
      <Paper style={{
        width: '90%', maxWidth: 600, margin: '24px auto 32px', padding: 24,
      }}
      >
        <form onSubmit={onFormSubmit}>
          <TextField margin="normal" fullWidth type="email" label="Email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField margin="normal" fullWidth type="password" label="Password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>Login</Button>
          </Box>
        </form>
      </Paper>
      <TEDxFooter />
      <Snackbar open={hasError} autoHideDuration={3000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          Unable to log in!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (cookies.esaas_access_token) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {},
  };
};
