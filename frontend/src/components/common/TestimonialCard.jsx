const TestimonialCard = ({ quote, author, role, index }) => {
    return (
        <div
            className="card-glass p-8 relative"
            data-aos="fade-up"
            data-aos-delay={index * 100}
        >
            <svg className="w-10 h-10 text-blue-400/30 absolute top-4 left-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.896 14.321 16.067 14.929 15.513C15.537 14.959 16.297 14.682 17.209 14.682H18.001C17.724 13.99 17.387 13.33 16.989 12.702C16.591 12.074 16.037 11.511 15.327 11.013L15.362 10.978C16.817 10.84 17.886 10.229 18.57 9.144C19.254 8.059 19.596 6.755 19.596 5.232V3H13.842V9.303H16.002C15.91 10.157 15.532 10.89 14.868 11.502C14.204 12.114 13.197 12.42 11.847 12.42V21H14.017ZM8.017 21L8.017 18C8.017 16.896 8.321 16.067 8.929 15.513C9.537 14.959 10.297 14.682 11.209 14.682H12.001C11.724 13.99 11.387 13.33 10.989 12.702C10.591 12.074 10.037 11.511 9.327 11.013L9.362 10.978C10.817 10.84 11.886 10.229 12.57 9.144C13.254 8.059 13.596 6.755 13.596 5.232V3H7.842V9.303H10.002C9.91 10.157 9.532 10.89 8.868 11.502C8.204 12.114 7.197 12.42 5.847 12.42V21H8.017Z" />
            </svg>

            <div className="relative z-10">
                <p className="text-white/80 text-lg mb-6 italic pt-6">"{quote}"</p>
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm">
                        {author.charAt(0)}
                    </div>
                    <div className="ml-3">
                        <p className="text-white font-semibold">{author}</p>
                        <p className="text-blue-300 text-sm">{role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
