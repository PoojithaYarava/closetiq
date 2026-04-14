import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
  Divider,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords must match.');
      return;
    }

    setSubmitting(true);
    try {
      const result = isLogin
        ? await login(formData.username, formData.password)
        : await register(formData.email, formData.username, formData.password);

      if (!result.success) {
        setError(result.message);
      } else {
        setInfo(isLogin ? 'Welcome back!' : 'Account created and logged in successfully.');
      }
    } catch (err) {
      setError('Unexpected error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #eaf4ff 0%, #fdfdff 60%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 460,
          p: 4,
          borderRadius: 4,
          border: '1px solid rgba(41, 98, 255, 0.08)',
          position: 'relative',
        }}
      >
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            ClosetIQ
          </Typography>
          <Typography color="text.secondary">
            Login or register to manage your wardrobe and discover outfit ideas.
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {info && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {info}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          {!isLogin && (
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 1, py: 1.4 }}
            disabled={submitting}
          >
            {submitting ? (isLogin ? 'Signing in…' : 'Registering…') : isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <Button
          fullWidth
          variant="text"
          onClick={() => {
            setError('');
            setInfo('');
            setIsLogin(!isLogin);
          }}
          sx={{ textTransform: 'none' }}
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
