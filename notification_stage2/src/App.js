import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  AppBar, Toolbar, Typography, CssBaseline, Box, Avatar, IconButton, 
  Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import AllNotifications from './pages/AllNotifications';
import PriorityNotifications from './pages/PriorityNotifications';

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4338ca', // Royal blue from design
    },
    background: {
      default: '#f8fafc', // Light lavender/gray background
      paper: '#ffffff',
    },
    success: { main: '#10b981' }, // Green for Placement
    warning: { main: '#f59e0b' }, // Orange for Event
    info: { main: '#3b82f6' }, // Blue for Result
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});

function Layout({ children }) {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '#' },
    { text: 'Notifications', icon: <NotificationsNoneOutlinedIcon />, path: '/priority', active: true },
    { text: 'Placements', icon: <WorkOutlinedIcon />, path: '#' },
    { text: 'Results', icon: <SchoolOutlinedIcon />, path: '#' },
    { text: 'Schedule', icon: <CalendarMonthOutlinedIcon />, path: '#' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fff', color: '#000', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', mr: 4, display: 'flex', alignItems: 'center' }}>
              Campus Hub
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link to="/" style={{ textDecoration: 'none', color: location.pathname === '/' ? '#4338ca' : '#64748b', fontWeight: location.pathname === '/' ? 600 : 500, borderBottom: location.pathname === '/' ? '2px solid #4338ca' : 'none', paddingBottom: '20px', paddingTop: '20px' }}>
                All Notifications
              </Link>
              <Link to="/priority" style={{ textDecoration: 'none', color: location.pathname === '/priority' ? '#4338ca' : '#64748b', fontWeight: location.pathname === '/priority' ? 600 : 500, borderBottom: location.pathname === '/priority' ? '2px solid #4338ca' : 'none', paddingBottom: '20px', paddingTop: '20px' }}>
                Priority Inbox
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" color="primary"><NotificationsIcon /></IconButton>
            <IconButton size="small" color="primary"><SettingsIcon /></IconButton>
            <Avatar sx={{ width: 32, height: 32, ml: 1, bgcolor: 'primary.main' }}>R</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#fff', borderRight: 'none', boxShadow: '1px 0 3px rgba(0,0,0,0.02)' },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            <SchoolIcon fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'primary.main' }}>Campus Hub</Typography>
            <Typography variant="caption" color="text.secondary">Academic Excellence</Typography>
          </Box>
        </Box>
        
        <List sx={{ px: 2 }}>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                component={Link} 
                to={item.path}
                sx={{ 
                  borderRadius: 2, 
                  backgroundColor: item.active ? 'rgba(67, 56, 202, 0.05)' : 'transparent',
                  color: item.active ? 'primary.main' : 'text.secondary'
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: item.active ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body2" fontWeight={item.active ? 600 : 500}>{item.text}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2 }}>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2, backgroundColor: 'primary.main', color: '#fff', '&:hover': { backgroundColor: 'primary.dark' } }}>
              <ListItemText primary={<Typography variant="body2" fontWeight={600} textAlign="center">View Profile</Typography>} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: 2, color: 'text.secondary' }}>
              <ListItemIcon sx={{ minWidth: 40 }}><LogoutIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4, pt: 12 }}>
        {children}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<AllNotifications />} />
            <Route path="/priority" element={<PriorityNotifications />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
