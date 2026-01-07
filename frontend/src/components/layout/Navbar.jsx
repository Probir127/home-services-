import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getServices } from '../../services/api';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [privateServices, setPrivateServices] = useState([]);
    const [businessServices, setBusinessServices] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobileMenuOpen(false);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveDropdown(null);
    }, [location.pathname]);

    useEffect(() => {
        const fetchServices = async () => {
            const privateData = await getServices('private');
            const businessData = await getServices('company');
            setPrivateServices(privateData);
            setBusinessServices(businessData);
        };
        fetchServices();
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-lg shadow-black/5 py-4 border-b border-white/20'
            : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 relative z-10">
                        <img
                            src={logo}
                            alt="GRB Servicebyrå"
                            style={{ height: '48px', width: 'auto', maxWidth: '160px', objectFit: 'contain' }}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        <Link
                            to="/"
                            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                            Hem
                        </Link>

                        {/* Private Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('private')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                                Privat
                                <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'private' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden transition-all duration-300 ${activeDropdown === 'private' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                }`}>
                                <div className="p-2">
                                    {privateServices.map((service) => (
                                        <Link
                                            key={service.slug}
                                            to={`/services/private/${service.slug}`}
                                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all duration-200 font-medium"
                                        >
                                            {service.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Business Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('business')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                                Företag
                                <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'business' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden transition-all duration-300 ${activeDropdown === 'business' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                }`}>
                                <div className="p-2">
                                    {businessServices.map((service) => (
                                        <Link
                                            key={service.slug}
                                            to={`/services/company/${service.slug}`}
                                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all duration-200 font-medium"
                                        >
                                            {service.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/priser"
                            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                            Priser
                        </Link>
                        <Link
                            to="/om-oss"
                            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                            Om oss
                        </Link>
                        <Link
                            to="/kontakt"
                            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                            Kontakt
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Link
                            to="/begar-offert"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Begär offert
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-md"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="py-4 mt-4 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
                                <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="block px-6 py-3 text-amber-600 hover:bg-amber-50/50 hover:text-amber-700 font-bold">Hem</Link>

                                <div className="px-6 py-3 border-t border-slate-100/50">
                                    <p className="text-xs font-bold text-amber-600/80 uppercase tracking-widest mb-2">Privata tjänster</p>
                                    {privateServices.map((service) => (
                                        <Link onClick={() => setIsMobileMenuOpen(false)} key={service.slug} to={`/services/private/${service.slug}`} className="block py-2 text-slate-700 hover:text-amber-600 font-medium">
                                            {service.title}
                                        </Link>
                                    ))}
                                </div>

                                <div className="px-6 py-3 border-t border-slate-100/50">
                                    <p className="text-xs font-bold text-amber-600/80 uppercase tracking-widest mb-2">Företag tjänster</p>
                                    {businessServices.map((service) => (
                                        <Link onClick={() => setIsMobileMenuOpen(false)} key={service.slug} to={`/services/company/${service.slug}`} className="block py-2 text-slate-700 hover:text-amber-600 font-medium">
                                            {service.title}
                                        </Link>
                                    ))}
                                </div>

                                <div className="border-t border-slate-100/50">
                                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/priser" className="block px-6 py-3 text-amber-600 hover:bg-amber-50/50 hover:text-amber-700 font-bold">Priser</Link>
                                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/om-oss" className="block px-6 py-3 text-amber-600 hover:bg-amber-50/50 hover:text-amber-700 font-bold">Om oss</Link>
                                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/kontakt" className="block px-6 py-3 text-amber-600 hover:bg-amber-50/50 hover:text-amber-700 font-bold">Kontakt</Link>
                                </div>

                                <div className="px-6 pt-4 pb-2 border-t border-slate-100/50">
                                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/begar-offert" className="block w-full text-center px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-lg shadow-amber-500/30 active:scale-95 transition-transform">
                                        Begär offert
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
