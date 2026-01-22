// saved-app.js
const translations = {
  en: { nav: { home: "Home", services: "Services", saved: "Saved", dashboard: "Dashboard", wallet: "Wallet", profile: "Profile", settings: "Settings", post: "Post Job", login: "Login", logout: "Logout", signup: "Sign Up", how: "How it Works" }, footer: { desc: "The premier freelance platform connecting global talent.", quick: "Quick Links", company: "Company", contact: "Contact Us", rights: "© 2025 NileLancers. All rights reserved." } },
  ar: { nav: { home: "الرئيسية", services: "الخدمات", saved: "المحفوظات", dashboard: "لوحة التحكم", wallet: "المحفظة", profile: "الملف الشخصي", settings: "الإعدادات", post: "أضف وظيفة", login: "تسجيل الدخول", logout: "تسجيل الخروج", signup: "إنشاء حساب", how: "كيف يعمل" }, footer: { desc: "المنصة الرائدة لربط المواهب العالمية.", quick: "روابط سريعة", company: "الشركة", contact: "اتصل بنا", rights: "© 2025 نايل لانسرز." } }
};

function SavedApp() {
  const [savedJobs, setSavedJobs] = React.useState([]);
  const [lang, setLang] = React.useState('en');
  const [loading, setLoading] = React.useState(true);

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

  // Load saved jobs from Firebase
  React.useEffect(() => {
    const loadSavedJobs = async () => {
      setLoading(true);
      const jobs = await FirebaseDB.getSavedJobs();
      setSavedJobs(jobs);
      setLoading(false);
    };
    loadSavedJobs();
  }, []);

  const handleRemoveJob = async (jobId) => {
    // Find the job to remove
    const jobToRemove = savedJobs.find(j => j.id === jobId);
    if (!jobToRemove) return;

    // Toggle save (which will unsave it)
    await FirebaseDB.toggleSaveJob(jobToRemove);

    // Update local state
    const updated = savedJobs.filter(j => j.id !== jobId);
    setSavedJobs(updated);
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header lang={lang} t={t} toggleLang={toggleLang} activeLink="saved" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Saved Services</h1>
        {loading ? (
          <div className="text-center py-12">
            <i className="fas fa-spinner fa-spin text-4xl text-[var(--secondary-blue)] mb-4"></i>
            <p className="text-[var(--text-gray)]">Loading saved jobs...</p>
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-bookmark text-6xl text-gray-400 mb-4"></i>
            <p className="text-[var(--text-gray)] text-lg">No saved services yet.</p>
            <a href="jobs.html" className="cta-button inline-block mt-4">Browse Jobs</a>
          </div>
        ) : (
          <div className="space-y-4">
            {savedJobs.map(job => (
              <SavedJobCard key={job.id} job={job} onRemove={handleRemoveJob} />
            ))}
          </div>
        )}
      </div>
      <Footer t={t} />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SavedApp />);