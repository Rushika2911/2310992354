import React from 'react';
import { Card, List, ListItem, ListItemText, Chip, Box, Typography, Divider, IconButton, Tooltip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const getIconForType = (type) => {
  switch (type.toLowerCase()) {
    case 'placement': return <WorkIcon />;
    case 'result': return <SchoolIcon />;
    case 'event': return <EventIcon />;
    default: return <EventIcon />;
  }
};

const getColorForType = (type) => {
  switch (type.toLowerCase()) {
    case 'placement': return 'primary';
    case 'result': return 'success';
    case 'event': return 'secondary';
    default: return 'default';
  }
};

export default function NotificationList({ notifications, viewedState, onMarkViewed }) {
  if (!notifications || notifications.length === 0) {
    return (
      <Card elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="body1" color="text.secondary">No notifications found.</Typography>
      </Card>
    );
  }

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <List disablePadding>
        {notifications.map((notif, index) => {
          const type = notif.Type || notif.type || 'Event';
          const message = notif.Message || notif.message || '';
          const id = notif.ID || notif.id;
          const isViewed = viewedState[id];

          return (
            <React.Fragment key={id || index}>
              <ListItem 
                alignItems="flex-start" 
                sx={{ 
                  py: 2.5, 
                  px: 3,
                  backgroundColor: isViewed ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
                  transition: 'background-color 0.3s ease'
                }}
              >
                <Box sx={{ mr: 2, mt: 0.5 }}>
                  <Chip 
                    icon={getIconForType(type)} 
                    label={type.toUpperCase()} 
                    color={getColorForType(type)} 
                    size="small" 
                    sx={{ fontWeight: 'bold' }}
                    variant={isViewed ? "outlined" : "filled"}
                  />
                </Box>
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontWeight={isViewed ? "regular" : "bold"} sx={{ color: isViewed ? 'text.secondary' : 'text.primary' }}>
                      {message}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                      {notif.Timestamp || notif.timestamp || new Date().toLocaleString()}
                    </Typography>
                  }
                />
                <Box sx={{ ml: 2, alignSelf: 'center' }}>
                  <Tooltip title={isViewed ? "Viewed" : "Mark as viewed"}>
                    <IconButton onClick={() => onMarkViewed(id)} color={isViewed ? "default" : "primary"}>
                      {isViewed ? <CheckCircleIcon color="disabled" /> : <CheckCircleOutlinedIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
              {index < notifications.length - 1 && <Divider component="li" />}
            </React.Fragment>
          );
        })}
      </List>
    </Card>
  );
}
