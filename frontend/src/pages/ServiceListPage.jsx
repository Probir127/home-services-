import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AOS from 'aos';
import ServiceCard from '../components/common/ServiceCard';
import { getServices } from '../services/api';

const ServiceListPage = () => {
    const { category } = useParams();
    const isPrivate = category === 'private' || !category;
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                // Fetch services based on category (private or company)
                const categorySlug = isPrivate ? 'private' : 'company';
                const data = await getServices(categorySlug);
                setServices(data);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
        AOS.init({ duration: 800, once: true });
        window.scrollTo(0, 0);
    }, [category, isPrivate]);

    const title = isPrivate ? 'Privata Tjänster' : 'Företagstjänster';
    const subtitle = isPrivate
        ? 'Alla våra städtjänster för ditt hem. Anpassade efter dina behov och önskemål.'
        : 'Professionella städtjänster för företag och fastighetsägare. Skräddarsydda lösningar.';

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="relative py-24 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={isPrivate ? "/images/private-hero.png" : "/images/company-hero.png"}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-aos="fade-up">
                        {title}
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        {subtitle}
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <ServiceCard key={service.slug} service={service} index={index} />
                            ))}
                        </div>
                    )}

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center p-8 sm:p-12 rounded-2xl bg-white shadow-lg border border-amber-100" data-aos="fade-up">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Hittar du inte det du söker?
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                            Vi är flexibla och kan ofta anpassa våra tjänster. Kontakta oss så hittar vi en lösning tillsammans.
                        </p>
                        <Link
                            to="/kontakt"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300"
                        >
                            Kontakta oss
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceListPage;
