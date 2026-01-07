import { useState } from 'react';
import { submitContactMessage } from '../../services/api';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError(null);
        try {
            await submitContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
            setError('Ett fel uppstod. Vänligen försök igen senare.');
        }
    };

    return (
        <div className="card-glass p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Skicka ett meddelande</h3>

            {status === 'success' ? (
                <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Tack för ditt meddelande!</h4>
                    <p className="text-white/70">Vi återkommer till dig så snart vi kan.</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="mt-6 text-blue-300 hover:text-white underline"
                    >
                        Skicka ett nytt meddelande
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white/80 text-sm mb-2">Namn *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field bg-white/10 text-white border-white/20 focus:border-blue-400 placeholder-white/40"
                                placeholder="Ditt namn"
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm mb-2">E-post *</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field bg-white/10 text-white border-white/20 focus:border-blue-400 placeholder-white/40"
                                placeholder="din@e-post.se"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white/80 text-sm mb-2">Telefon</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input-field bg-white/10 text-white border-white/20 focus:border-blue-400 placeholder-white/40"
                                placeholder="070-123 45 67"
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm mb-2">Ämne *</label>
                            <input
                                type="text"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="input-field bg-white/10 text-white border-white/20 focus:border-blue-400 placeholder-white/40"
                                placeholder="Vad gäller ärendet?"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white/80 text-sm mb-2">Meddelande *</label>
                        <textarea
                            name="message"
                            required
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className="input-field bg-white/10 text-white border-white/20 focus:border-blue-400 placeholder-white/40"
                            placeholder="Skriv ditt meddelande här..."
                        ></textarea>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full btn-primary py-4 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Skickar...
                            </span>
                        ) : 'Skicka meddelande'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
