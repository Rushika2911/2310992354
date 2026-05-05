import React from 'react';
import { Box, Typography, IconButton, Tooltip, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const getBadgeStyles = (type, isViewed) => {
  const t = type.toLowerCase();
  let baseColor, bgColor;
  
  if (t === 'placement') {
    baseColor = '#10b981'; // Green
    bgColor = isViewed ? 'rgba(16, 185, 129, 0.1)' : '#10b981';
  } else if (t === 'result') {
    baseColor = '#3b82f6'; // Blue
    bgColor = isViewed ? 'rgba(59, 130, 246, 0.1)' : '#3b82f6';
  } else {
    baseColor = '#f59e0b'; // Orange
    bgColor = isViewed ? 'rgba(245, 158, 11, 0.1)' : '#f59e0b';
  }

  return {
    backgroundColor: bgColor,
    color: isViewed ? baseColor : '#fff',
    border: isViewed ? `1px solid ${baseColor}40` : 'none',
    borderRadius: '16px',
    padding: '4px 12px',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'inline-block'
  };
};

export default function NotificationList({ notifications, viewedState, onMarkViewed }) {
  if (!notifications || notifications.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">No notifications found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {notifications.map((notif, index) => {
        const type = notif.Type || notif.type || 'Event';
        const message = notif.Message || notif.message || '';
        const id = notif.ID || notif.id;
        const isViewed = viewedState[id];

        // Format timestamp relative (e.g. "2 hours ago") - hardcoded mock behavior for UI sake
        const timeText = isViewed ? "Yesterday" : "2 hours ago";

        return (
          <Paper 
            key={id || index}
            elevation={0}
            sx={{ 
              p: 3,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'flex-start',
              position: 'relative',
              backgroundColor: isViewed ? 'rgba(250, 250, 252, 0.5)' : '#fff',
              border: '1px solid',
              borderColor: isViewed ? 'rgba(0,0,0,0.05)' : 'transparent',
              boxShadow: isViewed ? 'none' : '0 2px 10px rgba(0,0,0,0.04)',
              borderLeft: isViewed ? '1px solid rgba(0,0,0,0.05)' : '4px solid #4338ca',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {!isViewed && (
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4338ca', mt: 0.8, mr: 2, flexShrink: 0 }} />
            )}
            {isViewed && (
              <Box sx={{ width: 8, height: 8, mr: 2, flexShrink: 0 }} /> // Spacer to align text
            )}

            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box sx={getBadgeStyles(type, isViewed)}>
                  {type}
                </Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                  {notif.Timestamp ? new Date(notif.Timestamp).toLocaleDateString() : timeText}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ 
                fontSize: '1.05rem', 
                fontWeight: isViewed ? 500 : 600, 
                color: isViewed ? '#64748b' : '#0f172a',
                mb: 0.5
              }}>
                {message}
              </Typography>
              
              <Typography variant="body2" sx={{ color: isViewed ? '#94a3b8' : '#475569', lineHeight: 1.5 }}>
                {isViewed ? "This notification has been marked as read and archived." : "Action may be required for this notification. Please check the details carefully."}
              </Typography>
            </Box>

            <Box sx={{ ml: 2, mt: 1 }}>
              <Tooltip title={isViewed ? "Archived" : "Mark as read"}>
                <IconButton 
                  onClick={() => !isViewed && onMarkViewed(id)} 
                  sx={{ 
                    backgroundColor: isViewed ? 'transparent' : '#4338ca',
                    color: isViewed ? '#cbd5e1' : '#fff',
                    '&:hover': { backgroundColor: isViewed ? 'transparent' : '#3730a3' },
                    p: 1
                  }}
                >
                  {isViewed ? <MoveToInboxOutlinedIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        );
      })}

      <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
        <AutoAwesomeIcon sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 600 }}>You're all caught up!</Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8' }}>Check back later for more updates from your campus.</Typography>
      </Box>
    </Box>
  );
}
