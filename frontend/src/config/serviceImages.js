// Centralized service images - single source of truth for all service images across the app
// All images are high-quality, verified Unsplash images related to cleaning services

const SERVICE_IMAGES = {
    // Private Services
    hemstadning: {
        card: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1600&h=900&fit=crop&q=90',
    },
    flyttstadning: {
        card: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&h=900&fit=crop&q=90',
    },
    storstadning: {
        card: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1600&h=900&fit=crop&q=90',
    },
    visningsstadning: {
        card: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop&q=90',
    },
    fonsterputs: {
        card: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop&q=90',
    },
    // Business Services
    kontorsstadning: {
        card: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&q=90',
    },
    butiksstadning: {
        card: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600&h=900&fit=crop&q=90',
    },
    byggstadning: {
        card: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop&q=90',
    },
    trappstadning: {
        card: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop&q=90',
    },
    golvvard: {
        card: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
        hero: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&h=900&fit=crop&q=90',
    },
};

const FALLBACK_IMAGE = {
    card: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&h=400&fit=crop',
    hero: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1600&h=900&fit=crop&q=90',
};

// Helper functions
export const getServiceCardImage = (slug) => {
    return SERVICE_IMAGES[slug]?.card || FALLBACK_IMAGE.card;
};

export const getServiceHeroImage = (slug) => {
    return SERVICE_IMAGES[slug]?.hero || FALLBACK_IMAGE.hero;
};

export { SERVICE_IMAGES, FALLBACK_IMAGE };
export default SERVICE_IMAGES;
