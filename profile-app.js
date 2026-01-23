const translations = {
    en: { nav: { home: "Home", services: "Services", saved: "Saved", dashboard: "Dashboard", wallet: "Wallet", profile: "Profile", settings: "Settings", post: "Post Job", login: "Login", logout: "Logout", signup: "Sign Up", how: "How it Works" }, role: "Senior Full Stack Developer", loc: "Cairo, Egypt", rate: "$45/hr", hire: "Hire Me", stats: { jobs: "Jobs Done", hours: "Hours Worked", rating: "Rating" }, headers: { about: "About Me", skills: "Skills", port: "Portfolio", rev: "Reviews" }, footer: { desc: "The premier freelance platform connecting global talent.", quick: "Quick Links", company: "Company", contact: "Contact Us", rights: "© 2025 NileLancers. All rights reserved." } },
    ar: { nav: { home: "الرئيسية", services: "الخدمات", saved: "المحفوظات", dashboard: "لوحة التحكم", wallet: "المحفظة", profile: "الملف الشخصي", settings: "الإعدادات", post: "أضف وظيفة", login: "تسجيل الدخول", logout: "تسجيل الخروج", signup: "إنشاء حساب", how: "كيف يعمل" }, role: "مطور ويب شامل", loc: "القاهرة، مصر", rate: "45$/ساعة", hire: "وظفني", stats: { jobs: "وظيفة منجزة", hours: "ساعة عمل", rating: "التقييم" }, headers: { about: "نبذة عني", skills: "المهارات", port: "معرض الأعمال", rev: "التقييمات" }, footer: { desc: "المنصة الرائدة لربط المواهب العالمية.", quick: "روابط سريعة", company: "الشركة", contact: "اتصل بنا", rights: "© 2025 نايل لانسرز." } }
};

function ProfileApp() {
    const [lang, setLang] = React.useState('en');
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const saved = localStorage.getItem('nile_lang') || 'en';
        setLang(saved);
        document.dir = saved === 'ar' ? 'rtl' : 'ltr';

        // Listen to auth state changes and load user data
        const unsubscribe = Auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                window.location.href = 'login.html';
            } else {
                // Note: Clients don't have a Profile link in nav, so no need to redirect them
                // The dashboard has its own guard to redirect non-clients
                setUser(currentUser);
                setLoading(false);
            }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    const toggleLang = () => {
        const newLang = lang === 'en' ? 'ar' : 'en';
        setLang(newLang);
        localStorage.setItem('nile_lang', newLang);
        document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-[var(--secondary-blue)] mb-4"></i>
                    <p className="text-[var(--text-light)]">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect to login
    }

    const t = translations[lang];

    return (
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} t={t} toggleLang={toggleLang} activeLink="profile" />

            <div className="container py-12 flex-grow">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="avatar-container">
                        <img src={user.avatar} alt={user.name} className="avatar" />
                        <div className="online-status"></div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-[var(--text-light)]">{user.name} <i className="fas fa-check-circle text-[var(--secondary-blue)] text-xl ml-2"></i></h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.userType === 'client'
                                ? 'bg-[var(--accent-gold)] text-[var(--dark-navy)]'
                                : 'bg-[var(--secondary-blue)] text-[var(--dark-navy)]'
                                }`}>
                                <i className={`fas ${user.userType === 'client' ? 'fa-briefcase' : 'fa-user-tie'} mr-1`}></i>
                                {user.userType === 'client' ? 'Business' : 'Freelancer'}
                            </span>
                        </div>
                        <p className="text-[var(--accent-gold)] text-lg mb-1">{user.title}</p>
                        <p className="text-gray-400 mb-4"><i className="fas fa-map-marker-alt mr-2"></i> {user.location}</p>
                        {user.userType === 'client' ? (
                            <div className="flex gap-4">
                                <a href="post-job.html" className="cta-button">Post a Job</a>
                                <a href="client-dashboard.html" className="px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition">View Dashboard</a>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <button className="cta-button">{t.hire}</button>
                                <button className="px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition">{t.rate}</button>
                            </div>
                        )}
                    </div>
                    {/* CONDITIONAL STATS & CONTENT */}
                    {user.userType === 'client' ? (
                        /* CLIENT STATS */
                        <div className="flex gap-4 text-center w-full md:w-auto mt-4 md:mt-0">
                            <div className="stat-box">
                                <h3 className="text-2xl font-bold text-[var(--accent-gold)]">12</h3>
                                <p className="text-xs text-gray-400">Jobs Posted</p>
                            </div>
                            <div className="stat-box">
                                <h3 className="text-2xl font-bold text-[var(--secondary-blue)]">8</h3>
                                <p className="text-xs text-gray-400">Hired</p>
                            </div>
                            <div className="stat-box">
                                <h3 className="text-2xl font-bold text-[var(--text-light)]">4.9 <i className="fas fa-star text-[var(--accent-gold)]"></i></h3>
                                <p className="text-xs text-gray-400">Rating</p>
                            </div>
                        </div>
                    ) : (
                        /* FREELANCER STATS */
                        <div className="flex gap-4 text-center w-full md:w-auto mt-4 md:mt-0">
                            <div className="stat-box">
                                <h3 className="text-2xl font-bold text-[var(--text-light)]">100%</h3>
                                <p className="text-xs text-gray-400">Success</p>
                            </div>
                            <div className="stat-box">
                                <h3 className="text-2xl font-bold text-[var(--text-light)]">42</h3>
                                <p className="text-xs text-gray-400">{t.stats.jobs}</p>
                            </div>
                            <div className="stat-box">
                                <h3 className="text-2xl font-bold text-[var(--accent-gold)]">5.0 <i className="fas fa-star"></i></h3>
                                <p className="text-xs text-gray-400">{t.stats.rating}</p>
                            </div>
                        </div>
                    )}
                </div>

                {user.userType === 'client' ? (
                    /* CLIENT CONTENT GRID */
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Column - Company Info */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="bg-[var(--glass-bg)] p-8 rounded-xl border border-[var(--glass-border)]">
                                <h3 className="text-2xl font-bold text-[var(--text-light)] mb-6 border-b border-[var(--glass-border)] pb-4">
                                    <i className="fas fa-building mr-3 text-[var(--accent-gold)]"></i>
                                    Company Information
                                </h3>
                                <p className="text-[var(--text-gray)] text-lg leading-relaxed mb-8">
                                    {user.bio || "We are a forward-thinking company looking for top talent to help us build the next generation of digital products. Our team is passionate, remote-first, and dedicated to excellence."}
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-[var(--dark-navy)]/50 p-4 rounded-lg border border-[var(--glass-border)]">
                                        <div className="text-[var(--accent-gold)] text-sm font-bold mb-1">INDUSTRY</div>
                                        <div className="text-white text-lg"><i className="fas fa-laptop-code mr-2"></i>Technology</div>
                                    </div>
                                    <div className="bg-[var(--dark-navy)]/50 p-4 rounded-lg border border-[var(--glass-border)]">
                                        <div className="text-[var(--accent-gold)] text-sm font-bold mb-1">LOCATION</div>
                                        <div className="text-white text-lg"><i className="fas fa-map-marker-alt mr-2"></i>{user.location}</div>
                                    </div>
                                    <div className="bg-[var(--dark-navy)]/50 p-4 rounded-lg border border-[var(--glass-border)]">
                                        <div className="text-[var(--accent-gold)] text-sm font-bold mb-1">MEMBER SINCE</div>
                                        <div className="text-white text-lg"><i className="fas fa-calendar mr-2"></i>2025</div>
                                    </div>
                                    <div className="bg-[var(--dark-navy)]/50 p-4 rounded-lg border border-[var(--glass-border)]">
                                        <div className="text-[var(--accent-gold)] text-sm font-bold mb-1">SIZE</div>
                                        <div className="text-white text-lg"><i className="fas fa-users mr-2"></i>10-50 Employees</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Tech Stack / Needs */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-[var(--glass-bg)] p-6 rounded-xl border border-[var(--glass-border)]">
                                <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Node.js', 'Python', 'AWS', 'Firebase'].map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-[var(--primary-blue)]/20 text-[var(--secondary-blue)] rounded-full text-sm font-mono border border-[var(--primary-blue)]/30">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[var(--navy-blue)] to-[var(--dark-navy)] p-6 rounded-xl border border-[var(--accent-gold)]/30 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <i className="fas fa-bullhorn text-9xl"></i>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--accent-gold)] mb-2 relative z-10">Hiring?</h3>
                                <p className="text-gray-300 text-sm mb-4 relative z-10">Post a new job today and connect with top freelancers instantly.</p>
                                <a href="post-job.html" className="inline-block w-full py-2 bg-[var(--accent-gold)] text-[var(--dark-navy)] text-center font-bold rounded-lg hover:bg-yellow-400 transition relative z-10">
                                    Post a Job
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* FREELANCER CONTENT GRID */
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="md:col-span-1 space-y-8">
                            <div className="bg-[var(--glass-bg)] p-6 rounded-xl border border-[var(--glass-border)]">
                                <h3 className="text-xl font-bold text-[var(--text-light)] mb-4 border-b border-[var(--glass-border)] pb-2">{t.headers.about}</h3>
                                <p className="text-[var(--text-gray)] text-sm leading-relaxed">
                                    {user.bio}
                                </p>
                            </div>
                            <div className="bg-[var(--glass-bg)] p-6 rounded-xl border border-[var(--glass-border)]">
                                <h3 className="text-xl font-bold text-[var(--text-light)] mb-4 border-b border-[var(--glass-border)] pb-2">{t.headers.skills}</h3>
                                <div>{user.skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}</div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-[var(--text-light)] mb-6">{t.headers.port}</h3>
                                <div className="portfolio-grid">
                                    {user.portfolio.map(item => (
                                        <div key={item.id} className="portfolio-item">
                                            <img src={item.img} alt={item.title} />
                                            <div className="portfolio-overlay">
                                                <span className="text-white font-bold">{item.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-[var(--text-light)] mb-6">{t.headers.rev}</h3>
                                {user.reviews.map(rev => (
                                    <div key={rev.id} className="review-card">
                                        <div className="flex justify-between mb-2">
                                            <h4 className="font-bold text-[var(--text-light)]">{rev.client}</h4>
                                            <div className="text-[var(--accent-gold)]">
                                                {[...Array(rev.stars)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                                            </div>
                                        </div>
                                        <p className="text-[var(--text-gray)] text-sm">"{rev.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer t={t} />
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileApp />);