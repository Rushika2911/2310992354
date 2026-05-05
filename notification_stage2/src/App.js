import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Box, Button } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AllNotifications from './pages/AllNotifications';
import PriorityNotifications from './pages/PriorityNotifications';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={3}>
            <Toolbar>
              <NotificationsActiveIcon sx={{ mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Campus Hub
              </Typography>
              <Button color="inherit" component={Link} to="/">
                All Notifications
              </Button>
              <Button color="inherit" component={Link} to="/priority">
                Priority Inbox
              </Button>
            </Toolbar>
          </AppBar>

          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<AllNotifications />} />
              <Route path="/priority" element={<PriorityNotifications />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
