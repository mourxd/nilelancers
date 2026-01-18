// --- SHARED HEADER ---
function Header({ lang, t, toggleLang, activeLink }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [theme, setTheme] = React.useState('dark');
    const [notifs, setNotifs] = React.useState([]);
    const [showNotifs, setShowNotifs] = React.useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const saved = localStorage.getItem('nile_theme') || 'dark';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
        
        try {
            const u = JSON.parse(localStorage.getItem('nile_user'));
            setUser(u);
        } catch (e) {
            console.error('Error parsing user from localStorage', e);
            setUser(null);
        }
        
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
        return () => clearInterval(interval);
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
            const updated = notifs.map(n => ({...n, read: true}));
            setNotifs(updated);
            localStorage.setItem('nile_notifications', JSON.stringify(updated));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('nile_user');
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
                        <div className={`notif-dropdown ${showNotifs ? 'show' : ''}`} style={{marginTop: '15px'}}>
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
