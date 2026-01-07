import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getServiceCardImage, FALLBACK_IMAGE } from '../../config/serviceImages';

const ServiceCard = ({ service, index = 0 }) => {
    const category = service.category || 'private';
    const slug = service.slug || '';
    // Prioritize API image, then static config, then fallback
    const imageUrl = service.image_url || getServiceCardImage(slug) || FALLBACK_IMAGE.card;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
        >
            <Link to={`/services/${category}/${slug}`} className="block h-full relative group">
                {/* 3D Tilt Effect Container */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="h-full bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 relative z-10"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl opacity-0 group-hover:opacity-30 blur transition duration-500 group-hover:duration-200"></div>

                    {/* Card Content Container */}
                    <div className="relative h-full bg-white rounded-3xl overflow-hidden">
                        {/* Image Container */}
                        <div className="relative h-60 overflow-hidden">
                            <motion.img
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                src={imageUrl}
                                alt={service.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = FALLBACK_IMAGE.card;
                                }}
                            />
                            {/* Premium gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>

                            {/* Category Badge */}
                            <div className={`absolute top-5 left-5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md ${category === 'private'
                                ? 'bg-amber-500/90 text-white shadow-lg shadow-amber-500/30'
                                : 'bg-amber-600/90 text-white shadow-lg shadow-amber-600/30'
                                }`}>
                                {category === 'private' ? '✨ Privat' : '🏢 Företag'}
                            </div>

                            {/* Title on Image */}
                            <div className="absolute bottom-5 left-5 right-5">
                                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-2xl">
                                    {service.title}
                                </h3>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-7 flex flex-col justify-between h-[calc(100%-15rem)]">
                            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2 text-base">
                                {service.short_description || service.description || 'Professionell städtjänst med kvalitetsgaranti.'}
                            </p>

                            {/* CTA */}
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-amber-600 font-bold group-hover:text-amber-700 transition-colors text-sm uppercase tracking-wide">
                                    Läs mer
                                </span>
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 text-white"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};

export default ServiceCard;
