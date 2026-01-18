function Header({ lang, t, toggleLang }) {
    const [theme, setTheme] = React.useState('dark');
    const [isOpen, setIsOpen] = React.useState(false);
    const [notifs, setNotifs] = React.useState([]);
    const [showNotifs, setShowNotifs] = React.useState(false);

    React.useEffect(() => {
        const saved = localStorage.getItem('nile_theme') || 'dark';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
        
        const loadNotifs = () => {
            const savedNotifs = JSON.parse(localStorage.getItem('nile_notifications') || '[]');
            setNotifs(savedNotifs);
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

    return (
        <header>
            <div className="container header-content">
                <a href="index.html" className="logo"><i className="fas fa-water text-[var(--accent-gold)] text-3xl"></i><h1>NileLancers</h1></a>
                <nav className="hidden md:flex items-center gap-6">
                    <a href="index.html" className="text-[var(--text-light)] hover:text-[var(--secondary-blue)] font-bold">{t.nav.home}</a>
                    <a href="jobs.html" className="text-[var(--text-light)] hover:text-[var(--secondary-blue)] font-bold">{t.nav.services}</a>
                    <a href="saved.html" className="text-[var(--text-light)] hover:text-[var(--secondary-blue)] font-bold">{t.nav.saved}</a>
                    <a href="client-dashboard.html" className="text-[var(--text-light)] hover:text-[var(--secondary-blue)] font-bold">{t.nav.dashboard}</a>
                    <a href="wallet.html" className="text-[var(--text-light)] hover:text-[var(--secondary-blue)] font-bold">{t.nav.wallet}</a>
                    <a href="profile.html" className="text-[var(--secondary-blue)] font-bold">{t.nav.profile}</a>
                    <a href="settings.html" className="text-[var(--text-light)] hover:text-[var(--secondary-blue)] font-bold">{t.nav.settings}</a>
                    
                    {/* Notification Bell */}
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

                    <button onClick={toggleLang} className="lang-btn">{lang === 'en' ? 'AR' : 'EN'}</button>
                    <button onClick={toggleTheme} className="lang-btn px-3"><i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i></button>
                    <a href="post-job.html" className="cta-button">{t.nav.post}</a>
                </nav>
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleLang} className="lang-btn text-xs m-0">{lang === 'en' ? 'AR' : 'EN'}</button>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl"><i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i></button>
                </div>
            </div>
            {isOpen && (
                <div className="mobile-menu md:hidden">
                    <a href="index.html" className="text-white font-bold">{t.nav.home}</a>
                    <a href="jobs.html" className="text-white font-bold">{t.nav.services}</a>
                    <a href="saved.html" className="text-white font-bold">{t.nav.saved}</a>
                    <a href="client-dashboard.html" className="text-white font-bold">{t.nav.dashboard}</a>
                    <a href="wallet.html" className="text-white font-bold">{t.nav.wallet}</a>
                    <a href="profile.html" className="text-[var(--accent-gold)] font-bold">{t.nav.profile}</a>
                    <a href="settings.html" className="text-white font-bold">{t.nav.settings}</a>
                    <a href="post-job.html" className="cta-button text-center">{t.nav.post}</a>
                </div>
            )}
        </header>
    );
}