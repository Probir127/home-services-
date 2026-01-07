import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// API endpoints
export const getSiteConfig = () => api.get('/config/');
export const getHomePage = () => api.get('/homepage/');
export const getServices = () => api.get('/services/');
export const getServicesByCategory = (category) => api.get(`/services/${category}/`);
export const getServiceDetail = (category, slug) => api.get(`/services/${category}/${slug}/`);
export const submitQuoteRequest = (data) => api.post('/quote-request/', data);
export const submitContactMessage = (data) => api.post('/contact/', data);

export default api;
