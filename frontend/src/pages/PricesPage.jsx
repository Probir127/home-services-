import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { getPricingPackages } from '../services/api';

const PricesPage = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        window.scrollTo(0, 0);
        document.title = 'Priser | GRB Servicebyrå';

        const fetchPrices = async () => {
            try {
                const data = await getPricingPackages();
                setPrices(data);
            } catch (error) {
                console.error('Error fetching prices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative py-24 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/prices-hero.png"
                        alt="Cleaning background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-aos="fade-up">
                        Priser
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Transparent prissättning utan dolda avgifter. Använd RUT-avdraget för 50% rabatt.
                    </p>
                </div>
            </section>

            {/* Pricing Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {prices.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <div className="text-3xl font-bold text-amber-600 mb-1">{item.price}</div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">{item.description}</p>

                                    <ul className="space-y-3 mb-8">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-gray-600">
                                                <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to={item.cta_link || "/begar-offert"}
                                        className="block w-full text-center px-6 py-3 rounded-xl border-2 border-amber-600 text-amber-600 font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300"
                                    >
                                        {item.cta_text || "Begär exakt pris"}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RUT Info */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 sm:p-12 border border-amber-100" data-aos="fade-up">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="md:col-span-2">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                    Hur fungerar RUT-avdraget?
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Som privatperson betalar du bara 50% av arbetskostnaden tack vare RUT-avdraget. Vi sköter all administration med Skatteverket.
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                                        Du måste vara över 18 år
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                                        Max 75 000 kr per person och år
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                                        Gäller arbetskostnad (ej material)
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white shadow-xl shadow-amber-500/10">
                                    <div>
                                        <div className="text-4xl font-bold text-amber-600">50%</div>
                                        <div className="text-sm text-gray-500">Rabatt</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default PricesPage;
