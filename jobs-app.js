const translations = {
  en: { nav: { home: "Home", services: "Services", saved: "Saved", dashboard: "Dashboard", wallet: "Wallet", profile: "Profile", settings: "Settings", post: "Post Job", login: "Login", logout: "Logout", signup: "Sign Up", how: "How it Works" }, footer: { desc: "The premier freelance platform connecting global talent.", quick: "Quick Links", company: "Company", contact: "Contact Us", rights: "© 2025 NileLancers. All rights reserved." } },
  ar: { nav: { home: "الرئيسية", services: "الخدمات", saved: "المحفوظات", dashboard: "لوحة التحكم", wallet: "المحفظة", profile: "الملف الشخصي", settings: "الإعدادات", post: "أضف وظيفة", login: "تسجيل الدخول", logout: "تسجيل الخروج", signup: "إنشاء حساب", how: "كيف يعمل" }, footer: { desc: "المنصة الرائدة لربط المواهب العالمية.", quick: "روابط سريعة", company: "الشركة", contact: "اتصل بنا", rights: "© 2025 نايل لانسرز." } }
};

function JobCard({ job }) {
  return (
    <div className="card">
      <h3 className="font-bold text-lg">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.company}</p>
      <div className="flex flex-wrap gap-2 my-2">
        {job.tags.map(tag => (
          <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">{tag}</span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-lg">{job.budget}</span>
        <button className="btn-primary">View Details</button>
      </div>
    </div>
  );
}

function JobsApp() {
  const [lang, setLang] = React.useState('en');
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    const savedLang = localStorage.getItem('nile_lang') || 'en';
    setLang(savedLang);
    document.dir = savedLang === 'ar' ? 'rtl' : 'ltr';

    // Load jobs from Firebase
    const loadJobs = async () => {
      const allJobs = await FirebaseDB.getAllJobs();
      setJobs(allJobs);
    };
    loadJobs();
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    localStorage.setItem('nile_lang', newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} t={t} toggleLang={toggleLang} activeLink="services" />
      <div className="container py-12 flex-grow">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Browse Services</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
      <Footer t={t} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<JobsApp />);