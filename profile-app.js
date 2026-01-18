const translations = {
    en: { nav: { home: "Home", services: "Services", saved: "Saved", dashboard: "Dashboard", wallet: "Wallet", profile: "Profile", settings: "Settings", post: "Post Job", login: "Login", logout: "Logout", signup: "Sign Up", how: "How it Works" }, role: "Senior Full Stack Developer", loc: "Cairo, Egypt", rate: "$45/hr", hire: "Hire Me", stats: { jobs: "Jobs Done", hours: "Hours Worked", rating: "Rating" }, headers: { about: "About Me", skills: "Skills", port: "Portfolio", rev: "Reviews" }, footer: { desc: "The premier freelance platform connecting global talent.", quick: "Quick Links", company: "Company", contact: "Contact Us", rights: "© 2025 NileLancers." } },
    ar: { nav: { home: "الرئيسية", services: "الخدمات", saved: "المحفوظات", dashboard: "لوحة التحكم", wallet: "المحفظة", profile: "الملف الشخصي", settings: "الإعدادات", post: "أضف وظيفة", login: "تسجيل الدخول", logout: "تسجيل الخروج", signup: "إنشاء حساب", how: "كيف يعمل" }, role: "مطور ويب شامل", loc: "القاهرة، مصر", rate: "45$/ساعة", hire: "وظفني", stats: { jobs: "وظيفة منجزة", hours: "ساعة عمل", rating: "التقييم" }, headers: { about: "نبذة عني", skills: "المهارات", port: "معرض الأعمال", rev: "التقييمات" }, footer: { desc: "المنصة الرائدة لربط المواهب العالمية.", quick: "روابط سريعة", company: "الشركة", contact: "اتصل بنا", rights: "© 2025 نايل لانسرز." } }
};

function ProfileApp() {
    const [lang, setLang] = React.useState('en');
    React.useEffect(() => { 
        const saved = localStorage.getItem('nile_lang') || 'en'; 
        setLang(saved); 
        document.dir = saved === 'ar' ? 'rtl' : 'ltr'; 
    }, []);
    
    const toggleLang = () => { 
        const newLang = lang === 'en' ? 'ar' : 'en'; 
        setLang(newLang); 
        localStorage.setItem('nile_lang', newLang); 
        document.dir = newLang === 'ar' ? 'rtl' : 'ltr'; 
    };

    const t = translations[lang];

    // Mock Data
    const user = Auth.getUser() || {
        name: "Omar Sherif",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        skills: ["React.js", "Node.js", "Tailwind CSS", "MongoDB", "UI/UX", "Arabic Translation"],
        portfolio: [
            { id: 1, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=60", title: "E-commerce App" },
            { id: 2, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=60", title: "Analytics Dashboard" },
            { id: 3, img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=500&q=60", title: "Portfolio Site" }
        ],
        reviews: [
            { id: 1, client: "TechCorp", text: "Omar is an exceptional developer. Delivered on time and code was clean.", stars: 5 },
            { id: 2, client: "StartUp Inc", text: "Great communication and very skilled in React.", stars: 5 }
        ]
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} t={t} toggleLang={toggleLang} activeLink="profile" />
            
            <div className="container py-12 flex-grow">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="avatar-container">
                        <img src={user.image} alt={user.name} className="avatar" />
                        <div className="online-status"></div>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-[var(--text-light)] mb-2">{user.name} <i className="fas fa-check-circle text-[var(--secondary-blue)] text-xl ml-2"></i></h1>
                        <p className="text-[var(--accent-gold)] text-lg mb-1">{t.role}</p>
                        <p className="text-gray-400 mb-4"><i className="fas fa-map-marker-alt mr-2"></i> {t.loc}</p>
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
                                Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in the MERN stack and modern UI/UX principles.
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