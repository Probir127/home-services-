import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '../components/home/Hero';
import ServiceCard from '../components/common/ServiceCard';
import { Link } from 'react-router-dom';
import { getHomePageContent, getServices } from '../services/api';

const HomePage = () => {
    const [homeContent, setHomeContent] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });

        const fetchData = async () => {
            try {
                const [contentData, servicesData] = await Promise.all([
                    getHomePageContent(),
                    getServices()
                ]);
                setHomeContent(contentData);
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const privateServices = services.filter(s => s.category === 'private');
    const businessServices = services.filter(s => s.category === 'company');



    const features = [
        {
            icon: '🛡️',
            title: 'Kvalitetsgaranti',
            desc: 'Inte nöjd? Vi kommer tillbaka och åtgärdar utan extra kostnad.'
        },
        {
            icon: '✨',
            title: 'Erfarna städare',
            desc: 'Utbildad personal med gedigen erfarenhet och yrkesstolthet.'
        },
        {
            icon: '💰',
            title: '50% RUT-avdrag',
            desc: 'Vi hanterar allt pappersarbete. Du betalar halva priset.'
        },
        {
            icon: '🌱',
            title: 'Miljövänligt',
            desc: 'Vi använder miljöcertifierade produkter som är snälla mot naturen.'
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <Hero content={homeContent} />

            {/* Features Section */}
            <section className="py-24 bg-gradient-to-b from-amber-50/50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="inline-block px-4 py-2 bg-amber-100/50 text-amber-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-amber-200/50">
                            Varför välja oss
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
                            Städning i Världsklass
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Vi kombinerar professionalism med personlig service för att ge dig den bästa upplevelsen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="text-center p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 border border-slate-50"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="text-5xl mb-6 transform transition-transform duration-300 hover:scale-110">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About/Vision Section */}
            <section className="py-24 bg-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/30 -skew-x-12 transform origin-top-right z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div data-aos="fade-right">
                            <span className="inline-block px-4 py-2 bg-amber-100/50 text-amber-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-amber-200/50">
                                {homeContent?.about_snippet_title || 'Om Oss'}
                            </span>
                            <h2 className="text-4xl font-black text-slate-900 mb-6">
                                Grundades 2017
                            </h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                {homeContent?.about_snippet_text || 'GRB Servicebyrå AB grundades 2017 och sedan dess levererar vi olika tjänster inom städning. Visionen är att bli ett ledande varumärke inom städbranschen i Sverige genom stort engagemang och ständiga investeringar i våra tjänster och personal.'}
                            </p>
                            <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-lg shadow-amber-500/5">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <span className="text-amber-500">✨</span> Vår Vision
                                </h3>
                                <p className="text-slate-600 italic">
                                    "Vår vision är att bli ledande varumärke inom städbranschen i Sverige. Därför har vi stort engagemang och gör ständiga investeringar i våra tjänster och vår personal."
                                </p>
                            </div>
                        </div>
                        <div className="relative" data-aos="fade-left">
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-3xl rotate-3 opacity-20 blur-lg"></div>
                            <img
                                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80"
                                alt="Cleaning team"
                                className="relative rounded-3xl shadow-2xl transform hover:rotate-1 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-black text-slate-900 mb-6">Vad våra kunder säger</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                text: "Vi anlitar GRB Servicebyrå AB sedan 2017. De är jätteeffektiva, flexibla, tillgängliga och trevliga! Rekommenderas starkt.",
                                author: "Nöjd Kund"
                            },
                            {
                                text: "Vi är alltid nöjda med resultatet. De och deras personal är jättetrevliga. De har alltid trevligt bemötande och är väldigt flexibla. Kan varmt rekommendera.",
                                author: "Återkommande Kund"
                            },
                            {
                                text: "De städar hos oss nästan två år och vi är väldigt nöjda med deras städtjänst. Golvvård och fönsterputs på sommaren var jättebra.",
                                author: "Företagskund"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-amber-500 hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="text-amber-500 text-4xl mb-4 opacity-50">"</div>
                                <p className="text-slate-600 mb-6 leading-relaxed italic">{testimonial.text}</p>
                                <div className="font-bold text-slate-900 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{testimonial.author[0]}</div>
                                    {testimonial.author}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Private Services */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12" data-aos="fade-up">
                        <div>
                            <span className="inline-block px-4 py-2 bg-amber-100/50 text-amber-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-amber-200/50">
                                För Privatpersoner
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
                                Privata Tjänster
                            </h2>
                        </div>
                        <Link
                            to="/services/private"
                            className="mt-6 sm:mt-0 inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors group"
                        >
                            Se alla tjänster
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {privateServices.slice(0, 3).map((service, index) => (
                            <ServiceCard key={service.slug} service={service} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Business Services */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12" data-aos="fade-up">
                        <div>
                            <span className="inline-block px-4 py-2 bg-amber-500/10 text-amber-400 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
                                För Företag
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black text-white">
                                Företagstjänster
                            </h2>
                        </div>
                        <Link
                            to="/services/company"
                            className="mt-6 sm:mt-0 inline-flex items-center gap-2 text-amber-400 font-bold hover:text-amber-300 transition-colors group"
                        >
                            Se alla tjänster
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {businessServices.slice(0, 3).map((service, index) => (
                            <ServiceCard key={service.slug} service={service} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8"
                        data-aos="fade-up"
                    >
                        Redo för ett<br />skinande rent hem?
                    </h2>
                    <p
                        className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Få en kostnadsfri offert idag och ta första steget mot ett renare, fräschare hem eller kontor.
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-5 justify-center"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <Link
                            to="/begar-offert"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-bold shadow-2xl hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 transition-all duration-300"
                        >
                            Begär Gratis Offert
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <a
                            href="tel:+46720300566"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-lg font-bold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Ring oss nu
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
