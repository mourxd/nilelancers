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
                        <h1 className="text-3xl font-bold text-[var(--text-light)] mb-2">{user.name} <i className="fas fa-check-circle text-[var(--secondary-blue)] text-xl ml-2"></i></h1>
                        <p className="text-[var(--accent-gold)] text-lg mb-1">{user.title}</p>
                        <p className="text-gray-400 mb-4"><i className="fas fa-map-marker-alt mr-2"></i> {user.location}</p>
                        <div className="flex gap-4">
                            <button className="cta-button">{t.hire}</button>
                            <button className="px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition">{t.rate}</button>
                        </div>
                    </div>
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
                </div>

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
            </div>

            <Footer t={t} />
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileApp />);