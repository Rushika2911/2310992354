# Notification System Design

## Priority Calculation
- Each notification has a type (placement, result, event) and a timestamp.
- Priority = weight (placement > result > event) + recency.
- Unread notifications are sorted by priority and top N are shown.

## Logging Middleware
- All logs (info, error) go through a custom middleware.
- Logs are stored in localStorage for demo purposes.

## Efficient Updates
- The component re-sorts and updates when new notifications arrive.