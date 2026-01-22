// components.js

// --- SHARED HEADER ---
function Header({ lang, t, toggleLang, activeLink }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [theme, setTheme] = React.useState('dark');
    const [notifs, setNotifs] = React.useState([]);
    const [showNotifs, setShowNotifs] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [authLoading, setAuthLoading] = React.useState(true);

    React.useEffect(() => {
        const saved = localStorage.getItem('nile_theme') || 'dark';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);

        // Load Notifications
        const loadNotifs = () => {
            try {
                const savedNotifs = JSON.parse(localStorage.getItem('nile_notifications') || '[]');
                setNotifs(savedNotifs);
            } catch (e) {
                console.error('Error parsing notifications from localStorage', e);
                setNotifs([]);
            }
        };
        loadNotifs();
        const interval = setInterval(loadNotifs, 2000);

        // Listen to auth state changes
        const unsubscribe = Auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });

        return () => {
            clearInterval(interval);
            unsubscribe();
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('nile_theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const unreadCount = notifs.filter(n => !n.read).length;
    const handleNotifClick = () => {
        setShowNotifs(!showNotifs);
        if (!showNotifs && unreadCount > 0) {
            const updated = notifs.map(n => ({ ...n, read: true }));
            setNotifs(updated);
            localStorage.setItem('nile_notifications', JSON.stringify(updated));
        }
    };

    const handleLogout = () => {
        Auth.logout();
        window.location.href = 'index.html';
    };

    const getLinkClass = (name) => activeLink === name ? "text-[var(--secondary-blue)] font-bold" : "text-[var(--text-light)] hover:text-[var(--secondary-blue)] font-bold";
    const getMobileLinkClass = (name) => activeLink === name ? "text-[var(--accent-gold)] font-bold" : "text-white font-bold";

    return (
        <header>
            <div className="container header-content">
                <a href="index.html" className="logo">
                    <i className="fas fa-water text-[var(--accent-gold)] text-3xl"></i>
                    <h1>NileLancers</h1>
                </a>
                <nav className="hidden md:flex items-center gap-6">
                    <a href="index.html" className={getLinkClass('home')}>{t.nav.home}</a>
                    <a href="jobs.html" className={getLinkClass('services')}>{t.nav.services}</a>

                    {user ? (
                        <>
                            <a href="saved.html" className={getLinkClass('saved')}>{t.nav.saved}</a>
                            <a href="client-dashboard.html" className={getLinkClass('dashboard')}>{t.nav.dashboard}</a>
                            <a href="wallet.html" className={getLinkClass('wallet')}>{t.nav.wallet}</a>
                            <a href="profile.html" className={getLinkClass('profile')}>{t.nav.profile}</a>
                            <a href="settings.html" className={getLinkClass('settings')}>{t.nav.settings}</a>
                        </>
                    ) : null}

                    {/* Notification Bell */}
                    {user && (
                        <div className="relative">
                            <button onClick={handleNotifClick} className="notif-btn">
                                <i className="fas fa-bell"></i>
                                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
                            </button>
                            <div className={`notif-dropdown ${showNotifs ? 'show' : ''}`} style={{ marginTop: '15px' }}>
                                <h4 className="p-2 font-bold text-white border-b border-gray-700">Notifications</h4>
                                {notifs.length === 0 ? <div className="p-4 text-center text-gray-500">No notifications</div> :
                                    notifs.slice(0, 5).map(n => (
                                        <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                                            <p>{n.text}</p>
                                            <span className="text-xs text-gray-500">{new Date(n.time).toLocaleTimeString()}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )}

                    <button onClick={toggleLang} className="lang-btn">{lang === 'en' ? 'AR' : 'EN'}</button>
                    <button onClick={toggleTheme} className="lang-btn px-3"><i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i></button>

                    {user ? (
                        <button onClick={handleLogout} className="text-[var(--text-light)] hover:text-red-500 font-bold"><i className="fas fa-sign-out-alt"></i></button>
                    ) : (
                        <>
                            <a href="login.html" className="text-[var(--text-light)] hover:text-[var(--secondary-blue)] font-bold">{t.nav.login}</a>
                            <a href="signup.html" className="cta-button">{t.nav.signup}</a>
                        </>
                    )}
                    {user && <a href="post-job.html" className="cta-button">{t.nav.post}</a>}
                </nav>
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleLang} className="lang-btn text-xs m-0">{lang === 'en' ? 'AR' : 'EN'}</button>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl"><i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i></button>
                </div>
            </div>
            {isOpen && (
                <div className="mobile-menu md:hidden">
                    <a href="index.html" className={getMobileLinkClass('home')}>{t.nav.home}</a>
                    <a href="jobs.html" className={getMobileLinkClass('services')}>{t.nav.services}</a>
                    {user ? (
                        <>
                            <a href="saved.html" className={getMobileLinkClass('saved')}>{t.nav.saved}</a>
                            <a href="client-dashboard.html" className={getMobileLinkClass('dashboard')}>{t.nav.dashboard}</a>
                            <a href="wallet.html" className={getMobileLinkClass('wallet')}>{t.nav.wallet}</a>
                            <a href="profile.html" className={getMobileLinkClass('profile')}>{t.nav.profile}</a>
                            <a href="settings.html" className={getMobileLinkClass('settings')}>{t.nav.settings}</a>
                            <a href="post-job.html" className="cta-button text-center">{t.nav.post}</a>
                            <button onClick={handleLogout} className="text-red-400 font-bold text-left">{t.nav.logout}</button>
                        </>
                    ) : (
                        <>
                            <a href="login.html" className="text-white font-bold">{t.nav.login}</a>
                            <a href="signup.html" className="cta-button text-center">{t.nav.signup}</a>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}


// components/Footer.js
function Footer({ t }) {
    return (
        <footer>
            <div className="container footer-grid">
                <div className="footer-col">
                    <div className="footer-logo">NileLancers</div>
                    <p className="text-sm text-gray-400 mb-4">{t.footer.desc}</p>
                    <div className="social-icons"><a href="#"><i className="fab fa-facebook-f"></i></a><a href="#"><i className="fab fa-twitter"></i></a><a href="#"><i className="fab fa-linkedin-in"></i></a></div>
                </div>
                <div className="footer-col">
                    <h4>{t.footer.quick}</h4>
                    <ul><li><a href="index.html">{t.nav.home}</a></li><li><a href="jobs.html">{t.nav.services}</a></li><li><a href="index.html#how">{t.nav.how}</a></li></ul>
                </div>
                <div className="footer-col">
                    <h4>{t.footer.contact}</h4>
                    <ul><li><i className="fas fa-envelope mr-2"></i> info@nilelancers.com</li><li><i className="fas fa-map-marker-alt mr-2"></i> Cairo, Egypt</li></ul>
                </div>
            </div>
            <div className="text-center mt-12 pt-5 border-t border-gray-700 text-sm text-gray-500">{t.footer.rights}</div>
        </footer>
    );
}


// SavedJobCard component for displaying saved jobs
function SavedJobCard({ job, onRemove }) {
    return (
        <div className="bg-[var(--glass-bg)] p-6 rounded-xl border border-[var(--glass-border)] flex justify-between items-center hover:border-[var(--secondary-blue)] transition-all">
            <div className="flex-1">
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-2">{job.title}</h3>
                <p className="text-[var(--text-gray)] mb-2">{job.company || job.userName || 'Unknown Company'}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                    {job.tags && job.tags.map(tag => (
                        <span key={tag} className="bg-[var(--primary-blue)] text-white px-3 py-1 rounded-full text-xs">
                            {tag}
                        </span>
                    ))}
                    {job.category && (
                        <span className="bg-[var(--accent-gold)] text-[var(--dark-navy)] px-3 py-1 rounded-full text-xs font-bold">
                            {job.category}
                        </span>
                    )}
                </div>
                <p className="text-[var(--accent-gold)] font-bold text-lg">{job.budget}</p>
                {job.description && (
                    <p className="text-[var(--text-gray)] text-sm mt-2 line-clamp-2">{job.description}</p>
                )}
            </div>
            <div className="flex flex-col gap-3 ml-6">
                <a href={`jobs.html#`} className="cta-button text-center whitespace-nowrap">
                    View Details
                </a>
                <button
                    onClick={() => onRemove(job.id)}
                    className="px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition whitespace-nowrap">
                    <i className="fas fa-trash-alt mr-2"></i>
                    Remove
                </button>
            </div>
        </div>
    );
}

