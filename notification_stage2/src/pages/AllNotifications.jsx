import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import NotificationList from '../components/NotificationList';
import { fetchNotifications } from '../api/notifications';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Persist viewed state in localStorage
  const [viewedState, setViewedState] = useState(() => {
    const saved = localStorage.getItem('viewedNotifications');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('viewedNotifications', JSON.stringify(viewedState));
  }, [viewedState]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleMarkViewed = (id) => {
    setViewedState(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          All Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay updated with everything happening on campus.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <NotificationList 
          notifications={notifications} 
          viewedState={viewedState} 
          onMarkViewed={handleMarkViewed} 
        />
      )}
    </Box>
  );
}
