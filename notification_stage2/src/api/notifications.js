import { mockNotifications } from './mockData';

const BASE_URL = 'http://20.207.122.201/evaluation-service/notifications';

export const fetchNotifications = async (params = {}) => {
  try {
    const url = new URL(BASE_URL);
    Object.keys(params).forEach(key => {
      if (params[key]) url.searchParams.append(key, params[key]);
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.notifications || [];
  } catch (error) {
    console.warn('Failed to fetch from API, using mock data:', error);
    
    // Simulate API query params with mock data
    let filtered = [...mockNotifications];
    if (params.notification_type) {
      filtered = filtered.filter(n => n.Type.toLowerCase() === params.notification_type.toLowerCase());
    }
    
    // Sort by recent for mock data
    filtered.sort((a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime());
    
    if (params.limit) {
      filtered = filtered.slice(0, parseInt(params.limit, 10));
    }
    
    return filtered;
  }
};
