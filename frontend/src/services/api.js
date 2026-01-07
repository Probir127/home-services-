import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

const getCsrfToken = () => {
    const name = 'csrftoken';
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

api.interceptors.request.use(config => {
    if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
        const csrfToken = getCsrfToken();
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
    }
    return config;
}, error => Promise.reject(error));

export const getSiteConfig = async () => {
    try {
        const response = await api.get('/config/');
        return response.data;
    } catch (error) {
        console.error('Error fetching site config:', error);
        return null;
    }
};

export const getHomePageContent = async () => {
    try {
        const response = await api.get('/homepage/');
        return response.data;
    } catch (error) {
        console.error('Error fetching home page content:', error);
        return null;
    }
};

export const getServices = async (category = null) => {
    try {
        const url = category ? `/services/${category}/` : '/services/';
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};

export const getServiceBySlug = async (category, slug) => {
    try {
        const response = await api.get(`/services/${category}/${slug}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching service detail:', error);
        throw error;
    }
};

export const getPricingPackages = async () => {
    try {
        const response = await api.get('/pricing/');
        return response.data;
    } catch (error) {
        console.error('Error fetching pricing packages:', error);
        return [];
    }
};

export const submitQuoteRequest = async (data) => {
    const response = await api.post('/quote-request/', data);
    return response.data;
};

export const submitContactMessage = async (data) => {
    const response = await api.post('/contact/', data);
    return response.data;
};

export default api;
