import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AOS from 'aos';
import { getServiceBySlug } from '../services/api';
import { getServiceHeroImage, FALLBACK_IMAGE } from '../config/serviceImages';

const ServiceDetailPage = () => {
    const { category, slug } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        window.scrollTo(0, 0);

        const fetchService = async () => {
            try {
                setLoading(true);
                const data = await getServiceBySlug(category, slug);
                setService(data);
            } catch (err) {
                console.error("Failed to fetch service:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [slug, category]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Laddar...</p>
                </div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tjänsten hittades inte</h2>
                    <p className="text-gray-600 mb-6">Vi kunde inte hitta tjänsten du söker.</p>
                    <Link to="/" className="text-amber-600 hover:text-amber-700 font-semibold">
                        Gå tillbaka till startsidan
                    </Link>
                </div>
            </div>
        );
    }

    // Determine Hero Image: API image -> Config image -> Fallback
    const heroImage = service.image_url || getServiceHeroImage(slug) || FALLBACK_IMAGE.hero;

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${category === 'private' ? 'bg-amber-500/90 text-white' : 'bg-amber-600/90 text-white'
                        }`} data-aos="fade-down">
                        {category === 'private' ? 'Privat tjänst' : 'Företagstjänst'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" data-aos="fade-up">
                        {service.title}
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        {service.subtitle}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <div data-aos="fade-up">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Om tjänsten</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                            </div>

                            <div data-aos="fade-up" data-aos-delay="100">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Vad ingår?</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {service.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-amber-200 transition-colors">
                                            <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div data-aos="fade-up" data-aos-delay="200">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Fördelar</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    {service.benefits.map((benefit, index) => (
                                        <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                                            <div className="text-3xl mb-2 text-amber-600">✓</div>
                                            <p className="font-medium text-gray-800">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32 space-y-6">
                                <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-900/20" data-aos="fade-left">
                                    <h3 className="text-xl font-bold mb-2">Begär offert</h3>
                                    <p className="text-white/70 mb-6">Få ett prisförslag för {service.title} inom 24h.</p>
                                    <Link
                                        to="/begar-offert"
                                        state={{ service: service.slug }}
                                        className="block w-full text-center px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Få prisförslag nu
                                    </Link>
                                </div>

                                <div className="p-8 rounded-2xl border border-gray-200 bg-white" data-aos="fade-left" data-aos-delay="100">
                                    <h4 className="font-bold text-gray-900 mb-4">Behöver du hjälp direkt?</h4>
                                    <a href="tel:+46720300566" className="flex items-center gap-3 text-amber-600 hover:text-amber-700 transition-colors group">
                                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Ring oss</p>
                                            <p className="text-lg font-bold">072 030 05 66</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;
