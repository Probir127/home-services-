import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import { submitQuoteRequest, getServices } from '../services/api';

const QuotePage = () => {
    const location = useLocation();
    const initialService = location.state?.service || '';

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', service_type: initialService, message: ''
    });
    const [status, setStatus] = useState('idle');
    const [services, setServices] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        window.scrollTo(0, 0);

        const fetchServicesList = async () => {
            try {
                const data = await getServices();
                // Map API services to the format needed for the form
                const formattedServices = data.map(service => ({
                    value: service.slug,
                    label: service.title
                }));
                setServices(formattedServices);
            } catch (error) {
                console.error("Failed to fetch services", error);
                // Fallback or leave empty, specific error handling can be improved
            }
        };

        fetchServicesList();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await submitQuoteRequest(formData);
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md mx-auto px-4 text-center" data-aos="fade-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Tack för din förfrågan!</h1>
                    <p className="text-gray-600 mb-8">
                        Vi har mottagit din offertförfrågan och kommer att återkomma med ett prisförslag inom 24 timmar.
                    </p>
                    <button
                        onClick={() => { setStatus('idle'); setStep(1); }}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300"
                    >
                        Ny förfrågan
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-12">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${s <= step ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30' : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-amber-600 rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100" data-aos="fade-up">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Begär kostnadsfri offert</h1>
                    <p className="text-gray-600 mb-8">Fyll i formuläret så återkommer vi med ett prisförslag.</p>

                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Service */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 mb-4">Vilken tjänst?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {services.map((service) => (
                                        <label
                                            key={service.value}
                                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.service_type === service.value
                                                ? 'border-amber-500 bg-amber-50 shadow-md'
                                                : 'border-gray-200 hover:border-amber-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="service_type"
                                                value={service.value}
                                                checked={formData.service_type === service.value}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span className={`font-medium ${formData.service_type === service.value ? 'text-amber-900' : 'text-gray-900'}`}>{service.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!formData.service_type}
                                    className="w-full mt-6 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
                                >
                                    Nästa
                                </button>
                            </div>
                        )}

                        {/* Step 2: Contact */}
                        {step === 2 && (
                            <div className="space-y-6">
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                                            placeholder="070-123 45 67"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        Tillbaka
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        disabled={!formData.name || !formData.email || !formData.phone}
                                        className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
                                    >
                                        Nästa
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Message */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Övrig information</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none outline-none"
                                        placeholder="Berätta mer om uppdraget..."
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                        Ett fel uppstod. Försök igen.
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        Tillbaka
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
                                    >
                                        {status === 'submitting' ? 'Skickar...' : 'Skicka förfrågan'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuotePage;
