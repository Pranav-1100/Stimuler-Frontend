import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Link,
  Container
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(45deg, #673AB7 30%, #03A9F4 90%)',
  overflow: 'hidden',
}));

const SlideBox = styled(Box)(({ theme }) => ({
  width: '80%',
  maxWidth: 800,
  height: 500,
  background: '#fff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
}));

const FormSide = styled(Box)(({ theme }) => ({
  width: '50%',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'transform 0.6s ease-in-out',
}));

const AnimatedBox = styled(Box)(({ sliding }) => ({
  position: 'absolute',
  top: 0,
  width: '200%',
  height: '100%',
  display: 'flex',
  transform: sliding ? 'translateX(-50%)' : 'translateX(0)',
  transition: 'transform 0.6s ease-in-out',
}));

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('https://stimuler-python.onrender.com/login', { email: username, password });
        localStorage.setItem('accessToken', response.data.access_token);
        navigate('/dashboard');
      } else {
        await axios.post('https://stimuler-python.onrender.com/register', { username, email, password });
        // Automatically log in after successful registration
        const loginResponse = await axios.post('https://stimuler-python.onrender.com/login', { email, password });
        localStorage.setItem('accessToken', loginResponse.data.access_token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      // Here you should handle the error, maybe show a message to the user
    }
  };

  return (
    <StyledContainer>
      <SlideBox>
        <AnimatedBox sliding={!isLogin}>
          <FormSide>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
            </form>
            <Button onClick={() => setIsLogin(false)}>
              Don't have an account? Sign Up
            </Button>
          </FormSide>
          <FormSide>
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>
                  </Typography>
                }
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                disabled={!agreeTerms}
              >
                Sign Up
              </Button>
            </form>
            <Button onClick={() => setIsLogin(true)}>
              Already have an account? Log In
            </Button>
          </FormSide>
        </AnimatedBox>
      </SlideBox>
    </StyledContainer>
  );
}

export default AuthForm;