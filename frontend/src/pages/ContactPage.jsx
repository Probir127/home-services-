import { useEffect, useState } from 'react';
import AOS from 'aos';
import { submitContactMessage } from '../api/client';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await submitContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="pt-20">
            {/* Hero */}
            {/* Hero */}
            <section className="relative py-24 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/contact-hero.png"
                        alt="Contact us background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-aos="fade-up">
                        Kontakta Oss
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Vi finns här för dig. Hör av dig med frågor eller bokningar.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div data-aos="fade-right">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Kontaktuppgifter</h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-amber-100/50 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Telefon</h3>
                                        <p className="text-gray-500 text-sm mb-1">Vardagar 08:00 - 17:00</p>
                                        <a href="tel:+46720300566" className="text-lg font-semibold text-amber-600 hover:text-amber-700">
                                            072 030 05 66
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-amber-100/50 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">E-post</h3>
                                        <p className="text-gray-500 text-sm mb-1">Svar inom 24 timmar</p>
                                        <a href="mailto:info@grbs.se" className="text-lg font-semibold text-amber-600 hover:text-amber-700">
                                            info@grbs.se
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-amber-100/50 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Adress</h3>
                                        <p className="text-gray-600">
                                            Gustav III:s Boulevard 16<br />
                                            SE 16972 SOLNA
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="rounded-2xl overflow-hidden shadow-lg h-64 border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.761!2d18.0063!3d59.3698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d98a0c20fbd%3A0xe5f82223063f90b8!2sGustav%20III%3As%20boulevard%2016%2C%20169%2073%20Solna!5e0!3m2!1sen!2sse!4v1677685432123"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div data-aos="fade-left">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Skicka meddelande</h2>

                                {status === 'success' ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Tack för ditt meddelande!</h3>
                                        <p className="text-gray-600">Vi återkommer så snart vi kan.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Namn *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                                                    placeholder="Ditt namn"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">E-post *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                                                    placeholder="din@epost.se"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                                                    placeholder="070-123 45 67"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Ämne *</label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                                                    placeholder="Vad gäller det?"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Meddelande *</label>
                                            <textarea
                                                name="message"
                                                required
                                                rows="4"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none outline-none"
                                                placeholder="Skriv ditt meddelande..."
                                            ></textarea>
                                        </div>

                                        {status === 'error' && (
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                                Ett fel uppstod. Försök igen senare.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 disabled:opacity-50 transition-all duration-300"
                                        >
                                            {status === 'submitting' ? 'Skickar...' : 'Skicka meddelande'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
