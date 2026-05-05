import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import NotificationList from '../components/NotificationList';
import { fetchNotifications } from '../api/notifications';

export default function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [limit, setLimit] = useState(10);
  const [typeFilter, setTypeFilter] = useState('all');

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
        const params = { limit: limit };
        if (typeFilter !== 'all') {
          params.notification_type = typeFilter;
        }
        
        const data = await fetchNotifications(params);
        setNotifications(data);
      } catch (err) {
        setError('Failed to load priority notifications.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [limit, typeFilter]);

  const handleMarkViewed = (id) => {
    setViewedState(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Priority Inbox
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your most important notifications filtered by type and limit.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="type-filter-label">Notification Type</InputLabel>
            <Select
              labelId="type-filter-label"
              value={typeFilter}
              label="Notification Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>

          <TextField 
            label="Limit" 
            type="number" 
            size="small" 
            value={limit} 
            onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 10))}
            sx={{ width: 100 }}
            InputProps={{ inputProps: { min: 1, max: 100 } }}
          />
        </Box>
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
