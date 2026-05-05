import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, MenuItem, TextField, Button, Select } from '@mui/material';
import NotificationList from '../components/NotificationList';
import { fetchNotifications } from '../api/notifications';

export default function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Local state for the filter inputs
  const [tempLimit, setTempLimit] = useState(25);
  const [tempType, setTempType] = useState('all');

  // Applied state that triggers the fetch
  const [appliedLimit, setAppliedLimit] = useState(25);
  const [appliedType, setAppliedType] = useState('all');

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
        const params = { limit: appliedLimit };
        if (appliedType !== 'all') {
          params.notification_type = appliedType;
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
  }, [appliedLimit, appliedType]);

  const handleMarkViewed = (id) => {
    setViewedState(prev => ({ ...prev, [id]: true }));
  };

  const handleApplyFilters = () => {
    setAppliedLimit(tempLimit);
    setAppliedType(tempType);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} sx={{ color: '#0f172a', mb: 3 }}>
        Notifications
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
        p: 2, 
        borderRadius: 3, 
        mb: 4,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        gap: 4
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 200 }}>
          <Typography variant="caption" fontWeight={600} sx={{ color: '#475569', mb: 0.5, letterSpacing: '0.5px' }}>
            NOTIFICATION TYPE
          </Typography>
          <Select
            variant="standard"
            disableUnderline
            value={tempType}
            onChange={(e) => setTempType(e.target.value)}
            sx={{ fontWeight: 500, color: '#4338ca' }}
          >
            <MenuItem value="all">All Notifications</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </Box>

        <Box sx={{ width: '1px', height: 40, backgroundColor: '#e2e8f0' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography variant="caption" fontWeight={600} sx={{ color: '#475569', mb: 0.5, letterSpacing: '0.5px' }}>
            LIMIT
          </Typography>
          <TextField 
            variant="standard"
            InputProps={{ disableUnderline: true }}
            type="number" 
            value={tempLimit} 
            onChange={(e) => setTempLimit(Math.max(1, parseInt(e.target.value) || 25))}
            sx={{ input: { fontWeight: 500, p: 0 } }}
          />
        </Box>

        <Button 
          variant="contained" 
          disableElevation
          onClick={handleApplyFilters}
          sx={{ 
            borderRadius: 2, 
            px: 4, 
            py: 1.2, 
            backgroundColor: '#4338ca',
            '&:hover': { backgroundColor: '#3730a3' }
          }}
        >
          Apply Filters
        </Button>
      </Box>

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
