import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = ({ content }) => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const heroTitle = content?.hero_title || "Professionell Städning\nFör Hem & Företag";
    const heroSubtitle = content?.hero_subtitle || "Vi levererar städtjänster av högsta kvalitet med 100% nöjdhetsgaranti. Tryggt, pålitligt och alltid med RUT-avdrag.";
    const ctaText = content?.hero_cta_text || "Begär Gratis Offert";
    const ctaLink = content?.hero_cta_link || "/begar-offert";
    const bgImage = content?.hero_image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=90";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Rent hem"
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-amber-950/60 to-slate-900/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </motion.div>

            {/* Animated floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.15, 0.1],
                        x: [0, -30, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]"
                />
            </div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-amber-200/90 text-sm font-medium shadow-lg shadow-black/10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        Stockholms mest pålitliga städföretag sedan 2017
                    </div>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 mb-8 leading-tight tracking-tight drop-shadow-sm"
                >
                    {heroTitle}
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    variants={itemVariants}
                    className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
                >
                    {heroSubtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                    <Link
                        to={ctaLink}
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white text-lg font-bold shadow-2xl shadow-amber-900/40 overflow-hidden transition-all duration-300 hover:shadow-amber-600/50 hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md"></div>
                        <span className="relative z-10">{ctaText}</span>
                        <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>

                    <a
                        href="tel:+46720300566"
                        className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-lg font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <svg className="w-6 h-6 text-amber-500/80 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Ring: 072-030 05 66
                    </a>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    variants={itemVariants}
                    className="mt-20 flex flex-wrap justify-center gap-10 sm:gap-20"
                >
                    {[
                        { value: "500+", label: "Nöjda kunder" },
                        { value: "7+", label: "År i branschen" },
                        { value: "100%", label: "Nöjdhetsgaranti" },
                        { value: "50%", label: "RUT-avdrag" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group cursor-default">
                            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <div className="text-slate-400 text-sm font-medium uppercase tracking-widest group-hover:text-amber-200 transition-colors">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2 backdrop-blur-sm"
                >
                    <motion.div
                        animate={{ height: ["20%", "50%", "20%"], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 bg-amber-400 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
