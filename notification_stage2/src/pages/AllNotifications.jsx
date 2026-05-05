import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import NotificationList from '../components/NotificationList';
import { fetchNotifications } from '../api/notifications';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} sx={{ color: '#0f172a', mb: 4 }}>
        All Notifications
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
          <CircularProgress sx={{ color: '#4338ca' }} />
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
