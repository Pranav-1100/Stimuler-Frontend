import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

function Register() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <RegisterForm />
        <Link href="/login" variant="body2">
          {"Already have an account? Sign In"}
        </Link>
      </Box>
    </Container>
  );
}

export default Register;