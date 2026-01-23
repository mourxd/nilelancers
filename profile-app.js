const translations = {
    en: {
        nav: {
            home: 'Home',
            services: 'Find Work',
            saved: 'Saved Jobs',
            wallet: 'Wallet',
            settings: 'Settings',
            dashboard: 'Client Dashboard',
            login: 'Login',
            signup: 'Sign Up',
            post: 'Post Job',
            logout: 'Logout'
        },
        footer: {
            desc: 'Connecting top talent with the best clients in Egypt.',
            quick: 'Quick Links',
            company: 'Company',
            contact: 'Contact Us',
            rights: '© 2024 NileLancers'
        },
        profile: {
            edit: 'Edit Profile',
            save: 'Save Changes',
            add_skill: 'Add Skill',
            add_project: 'Add Project',
            no_projects: 'No projects added yet.',
            view_project: 'View Project'
        }
    },
    ar: {
        nav: {
            home: 'الرئيسية',
            services: 'اعثر على عمل',
            saved: 'الوظائف المحفوظة',
            wallet: 'المحفظة',
            settings: 'الإعدادات',
            dashboard: 'لوحة التحكم',
            login: 'تسجيل الدخول',
            signup: 'إنشاء حساب',
            post: 'نشر وظيفة',
            logout: 'تسجيل الخروج'
        },
        footer: {
            desc: 'نربط أفضل المواهب بأفضل العملاء في مصر.',
            quick: 'روابط سريعة',
            company: 'الشركة',
            contact: 'اتصل بنا',
            rights: '© 2024 نايل لانسرز'
        },
        profile: {
            edit: 'تعديل الملف',
            save: 'حفظ التغييرات',
            add_skill: 'إضافة مهارة',
            add_project: 'إضافة مشروع',
            no_projects: 'لم يتم إضافة مشاريع بعد.',
            view_project: 'عرض المشروع'
        }
    }
};

function ProfileApp() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [isEditing, setIsEditing] = React.useState(false);

    // Edit Form State
    const [editForm, setEditForm] = React.useState({
        title: '',
        bio: '',
        hourlyRate: '',
        location: ''
    });

    const [newSkill, setNewSkill] = React.useState('');
    const [newPortfolio, setNewPortfolio] = React.useState({ title: '', image: '', link: '' });
    const [showPortfolioModal, setShowPortfolioModal] = React.useState(false);
    const [toast, setToast] = React.useState({ show: false, message: '' });

    // Header State
    const [lang, setLang] = React.useState(localStorage.getItem('nile_lang') || 'en');
    const t = translations[lang] || translations['en']; // Fallback to EN if lang key is invalid

    React.useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged(async (u) => {
            if (u) {
                // Ensure we have the latest data from Firestore
                let fullProfile = null;
                try {
                    fullProfile = await Auth.getCurrentUser();
                } catch (e) {
                    console.error("Error fetching profile", e);
                }

                // Fallback if firestore fetch fails
                if (!fullProfile) {
                    console.log("Using sync user fallback");
                    const syncUser = Auth.getUser();
                    if (syncUser) {
                        fullProfile = {
                            ...syncUser,
                            title: 'Freelancer', // Default
                            bio: '',
                            location: 'Egypt',
                            skills: [],
                            portfolio: []
                        };
                    }
                }

                if (fullProfile) {
                    setUser(fullProfile);
                    setEditForm({
                        title: fullProfile.title || '',
                        bio: fullProfile.bio || '',
                        hourlyRate: fullProfile.hourlyRate || '',
                        location: fullProfile.location || ''
                    });
                }
            } else {
                window.location.href = 'login.html';
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const showToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const handleSaveProfile = async () => {
        const updated = await Auth.updateUser({
            title: editForm.title,
            bio: editForm.bio,
            location: editForm.location,
            hourlyRate: editForm.hourlyRate
        });

        if (updated) {
            setUser(updated);
            setIsEditing(false);
            showToast('Profile Updated Successfully');
        } else {
            showToast('Failed to update profile');
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.trim()) return;

        const currentSkills = user.skills || [];
        if (currentSkills.includes(newSkill)) return;

        const updatedSkills = [...currentSkills, newSkill];
        const result = await Auth.updateUser({ skills: updatedSkills });

        if (result) {
            setUser(result);
            setNewSkill('');
            showToast('Skill Added');
        }
    };

    const handleRemoveSkill = async (skillToRemove) => {
        const updatedSkills = user.skills.filter(s => s !== skillToRemove);
        const result = await Auth.updateUser({ skills: updatedSkills });
        if (result) setUser(result);
    };

    const handleAddPortfolio = async (e) => {
        e.preventDefault();
        const newItem = { ...newPortfolio, id: Date.now() };
        const currentPortfolio = user.portfolio || [];
        const updatedPortfolio = [...currentPortfolio, newItem];

        const result = await Auth.updateUser({ portfolio: updatedPortfolio });

        if (result) {
            setUser(result);
            setShowPortfolioModal(false);
            setNewPortfolio({ title: '', image: '', link: '' });
            showToast('Project Added to Portfolio');
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading Profile...</div>;

    // Guard against null user before redirect happens
    if (!user) return <div className="min-h-screen flex items-center justify-center text-white">Redirecting...</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} t={t} toggleLang={() => setLang(l => l === 'en' ? 'ar' : 'en')} activeLink="profile" />

            <div className="container py-12 flex-grow">
                {/* Profile Header */}
                <div className="glass-panel p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--navy-blue)] opacity-50"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start mt-10">
                        <div className="w-32 h-32 rounded-full border-4 border-[var(--dark-navy)] overflow-hidden shadow-xl shrink-0">
                            <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="editable-input text-xl font-semibold mb-2"
                                            value={editForm.title}
                                            onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                            placeholder="Professional Title"
                                        />
                                    ) : (
                                        <p className="text-xl text-[var(--secondary-blue)] font-medium mb-2">{user.title}</p>
                                    )}

                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                        <span><i className="fas fa-map-marker-alt mr-2"></i>{user.location}</span>
                                        <span><i className="fas fa-star text-[var(--accent-gold)] mr-2"></i>5.0 (New)</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                    className={`cta-button px-6 py-2 text-sm ${isEditing ? 'bg-green-600 border-green-600' : ''}`}
                                >
                                    {isEditing ? <><i className="fas fa-save mr-2"></i>Save Changes</> : <><i className="fas fa-pen mr-2"></i>Edit Profile</>}
                                </button>
                            </div>

                            {isEditing ? (
                                <textarea
                                    className="editable-input h-24 resize-none"
                                    value={editForm.bio}
                                    onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                                    placeholder="Write a short bio..."
                                />
                            ) : (
                                <p className="text-gray-300 leading-relaxed max-w-3xl">
                                    {user.bio || "No bio added yet. Click edit to tell clients about yourself!"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Skills */}
                    <div className="space-y-8">
                        {/* Stats */}
                        <div className="glass-panel p-6">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">Overview</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="stat-card">
                                    <div className="text-2xl font-bold text-[var(--accent-gold)]">0</div>
                                    <div className="text-xs text-gray-400 mt-1">Jobs Done</div>
                                </div>
                                <div className="stat-card">
                                    <div className="text-2xl font-bold text-[var(--accent-green)]">$0</div>
                                    <div className="text-xs text-gray-400 mt-1">Earned</div>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="glass-panel p-6">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {user.skills && user.skills.map((skill, idx) => (
                                    <span key={idx} className="skill-badge group">
                                        {skill}
                                        {isEditing && (
                                            <span onClick={() => handleRemoveSkill(skill)} className="skill-remove ml-2">
                                                <i className="fas fa-times"></i>
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                            {isEditing && (
                                <form onSubmit={handleAddSkill} className="flex gap-2">
                                    <input
                                        type="text"
                                        className="editable-input"
                                        placeholder="Add skill..."
                                        value={newSkill}
                                        onChange={e => setNewSkill(e.target.value)}
                                    />
                                    <button type="submit" className="bg-[var(--primary-blue)] px-3 rounded text-white hover:bg-[var(--secondary-blue)]">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Portfolio */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="glass-panel p-6">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
                                <h3 className="text-xl font-bold text-white">Portfolio</h3>
                                {isEditing && (
                                    <button onClick={() => setShowPortfolioModal(true)} className="text-sm text-[var(--secondary-blue)] hover:text-white">
                                        <i className="fas fa-plus-circle mr-1"></i> Add Project
                                    </button>
                                )}
                            </div>

                            {(!user.portfolio || user.portfolio.length === 0) ? (
                                <div className="text-center py-12 text-gray-500 bg-[rgba(0,0,0,0.2)] rounded-xl border border-dashed border-gray-700">
                                    <i className="fas fa-images text-4xl mb-3"></i>
                                    <p>No projects added yet.</p>
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {user.portfolio.map((item, idx) => (
                                        <div key={idx} className="portfolio-card group cursor-pointer" onClick={() => window.open(item.link, '_blank')}>
                                            <img src={item.image || 'https://via.placeholder.com/400x300/001f3f/ffffff?text=Project'} alt={item.title} />
                                            <div className="portfolio-overlay">
                                                <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                                <span className="text-[var(--accent-gold)] text-sm mt-1">View Project <i className="fas fa-external-link-alt ml-1"></i></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer t={t} />

            {/* Portfolio Modal */}
            {showPortfolioModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="glass-panel w-full max-w-lg p-6 relative animate-fadeIn">
                        <button onClick={() => setShowPortfolioModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-6">Add New Project</h2>
                        <form onSubmit={handleAddPortfolio} className="space-y-4">
                            <div>
                                <label className="block text-sm text-[var(--secondary-blue)] mb-1">Project Title</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded p-3 text-white focus:border-[var(--secondary-blue)] outline-none"
                                    value={newPortfolio.title}
                                    onChange={e => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                                <input
                                    required
                                    type="url"
                                    className="w-full bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded p-3 text-white focus:border-[var(--secondary-blue)] outline-none"
                                    value={newPortfolio.image}
                                    onChange={e => setNewPortfolio({ ...newPortfolio, image: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Project Link</label>
                                <input
                                    type="url"
                                    className="w-full bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded p-3 text-white focus:border-[var(--secondary-blue)] outline-none"
                                    value={newPortfolio.link}
                                    onChange={e => setNewPortfolio({ ...newPortfolio, link: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <button type="submit" className="cta-button w-full mt-4">Add Project</button>
                        </form>
                    </div>
                </div>
            )}

            <Toast show={toast.show} message={toast.message} />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileApp />);