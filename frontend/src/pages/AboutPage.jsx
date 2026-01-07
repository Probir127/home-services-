import { useEffect } from 'react';
import AOS from 'aos';

const AboutPage = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        window.scrollTo(0, 0);
    }, []);

    const values = [
        { icon: '🛡️', title: 'Trygghet', text: 'Full ansvarsförsäkring och kontrollerad personal.' },
        { icon: '✨', title: 'Kvalitet', text: 'Vi lämnar inget åt slumpen. Varje städning utförs noggrant.' },
        { icon: '🔄', title: 'Flexibilitet', text: 'Vi anpassar oss efter dina behov och önskemål.' },
        { icon: '🌿', title: 'Miljö', text: 'Vi använder miljövänliga produkter och metoder.' },
    ];

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
                        alt="Team"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" data-aos="fade-up">
                        Om GRB Servicebyrå
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl" data-aos="fade-up" data-aos-delay="100">
                        Din pålitliga partner för professionella städtjänster i Stockholmsområdet sedan 2017.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div data-aos="fade-right">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100/50 text-amber-700 text-sm font-semibold mb-4 border border-amber-200/50">
                                Vår historia
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                                Grundat med passion för kvalitet
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    GRB Servicebyrå AB grundades 2017 med en enkel men kraftfull vision: att leverera städtjänster som inte bara gör rent, utan som skapar livskvalitet för våra kunder.
                                </p>
                                <p>
                                    Vi såg ett behov av ett städföretag som kombinerar professionell expertis med personlig service och flexibilitet. Sedan starten har vi vuxit stadigt tack vare våra nöjda kunders rekommendationer.
                                </p>
                                <p>
                                    Idag utför vi städning i hela Stockholms län, åt både privatpersoner och företag. Vi är stolta över att vara en pålitlig partner som levererar skinande resultat varje gång.
                                </p>
                            </div>
                        </div>

                        <div className="relative" data-aos="fade-left">
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                                alt="Vårt team"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-6 rounded-2xl shadow-xl">
                                <div className="text-4xl font-bold">2017</div>
                                <div className="text-amber-200">Grundat</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-aos="fade-up">Vår Vision</h2>
                    <p className="text-xl text-white/90 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                        "Vår vision är att bli det ledande varumärket inom städbranschen i Sverige. Vi investerar ständigt i våra tjänster och vår personal för att leverera den bästa möjliga upplevelsen till våra kunder."
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-aos="fade-up">
                            Våra Värderingar
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                            Dessa kärnvärden genomsyrar allt vi gör
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border-t-4 border-transparent hover:border-amber-500"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="text-4xl mb-4 text-amber-500">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { number: '7+', label: 'År i branschen' },
                            { number: '500+', label: 'Nöjda kunder' },
                            { number: '10', label: 'Olika tjänster' },
                            { number: '100%', label: 'Nöjdhetsgaranti' },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="text-4xl sm:text-5xl font-bold text-amber-600 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
