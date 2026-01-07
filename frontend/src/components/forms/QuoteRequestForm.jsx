import { useState } from 'react';
import { submitQuoteRequest } from '../../api/client';

const QuoteRequestForm = ({ initialService = '' }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service_type: initialService,
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const services = [
        { value: 'hemstadning', label: 'Hemstädning' },
        { value: 'flyttstadning', label: 'Flyttstädning' },
        { value: 'storstadning', label: 'Storstädning' },
        { value: 'visningsstadning', label: 'Visningsstädning' },
        { value: 'fonsterputs', label: 'Fönsterputs' },
        { value: 'kontorsstadning', label: 'Kontorsstädning' },
        { value: 'butiksstadning', label: 'Butiksstädning' },
        { value: 'byggstadning', label: 'Byggstädning' },
        { value: 'trappstadning', label: 'Trappstädning' },
        { value: 'golvvard', label: 'Golvvård' },
        { value: 'annat', label: 'Annat / Vet ej' },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError(null);
        try {
            await submitQuoteRequest(formData);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
            setError('Ett fel uppstod. Vänligen försök igen senare.');
        }
    };

    if (status === 'success') {
        return (
            <div className="card p-10 text-center animate-fadeIn">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Tack för din förfrågan!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Vi har mottagit din offertförfrågan och kommer att granska den inom kort. En av våra medarbetare kommer att återkomma till dig med ett prisförslag.
                </p>
                <button
                    onClick={() => {
                        setStatus('idle');
                        setStep(1);
                        setFormData({ ...formData, message: '' });
                    }}
                    className="btn-primary"
                >
                    Gör en ny förfrågan
                </button>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gray-100 h-2 w-full">
                <div
                    className="h-full bg-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                ></div>
            </div>

            <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Få en kostnadsfri offert</h3>
                <p className="text-gray-500 mb-8">Fyll i formuläret nedan så återkommer vi med ett prisförslag.</p>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Service Selection */}
                    <div className={step === 1 ? 'block animate-fadeIn' : 'hidden'}>
                        <label className="block text-gray-700 font-semibold mb-3">Vilken tjänst är du intresserad av?</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {services.map((service) => (
                                <label
                                    key={service.value}
                                    className={`
                    flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.service_type === service.value
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 hover:border-blue-200'
                                        }
                  `}
                                >
                                    <input
                                        type="radio"
                                        name="service_type"
                                        value={service.value}
                                        checked={formData.service_type === service.value}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-blue-600"
                                    />
                                    <span className="ml-3 font-medium">{service.label}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!formData.service_type}
                                className="btn-primary"
                            >
                                Nästa steg
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Step 2: Contact Details */}
                    <div className={step === 2 ? 'block animate-fadeIn' : 'hidden'}>
                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Namn *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="För- och efternamn"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">E-post *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="din@e-post.se"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Telefon *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="070-123 45 67"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="btn-secondary text-gray-600 border-gray-300 hover:bg-gray-50"
                            >
                                Tillbaka
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!formData.name || !formData.email || !formData.phone}
                                className="btn-primary"
                            >
                                Nästa steg
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Step 3: Message & Submit */}
                    <div className={step === 3 ? 'block animate-fadeIn' : 'hidden'}>
                        <div className="mb-8">
                            <label className="block text-gray-700 font-semibold mb-2">Meddelande / Övrig information</label>
                            <textarea
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Berätta mer om uppdraget (t.ex. antal rum, kvadratmeter, önskat datum)..."
                            ></textarea>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="btn-secondary text-gray-600 border-gray-300 hover:bg-gray-50 bg-white"
                            >
                                Tillbaka
                            </button>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="btn-primary px-8"
                            >
                                {status === 'submitting' ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Skickar...
                                    </span>
                                ) : 'Skicka förfrågan'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuoteRequestForm;
