// jobs-app.js
function JobsApp() {
  try {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [jobs, setJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filterType, setFilterType] = React.useState('all'); 
    const [savedJobs, setSavedJobs] = React.useState([]);

    React.useEffect(() => {
      loadJobs('');
      const saved = localStorage.getItem('savedServices');
      if (saved) setSavedJobs(JSON.parse(saved));
    }, []);

    const loadJobs = async (query = '') => {
      setLoading(true);
      const fetchedJobs = await JobsAPI.fetchAllJobs(query);
      setJobs(fetchedJobs);
      setLoading(false);
    };

    const handleSaveJob = (job) => {
      const saved = [...savedJobs];
      const index = saved.findIndex(j => j.id === job.id);
      if (index > -1) saved.splice(index, 1);
      else saved.push(job);
      setSavedJobs(saved);
      localStorage.setItem('savedServices', JSON.stringify(saved));
    };

    const filteredJobs = jobs.filter(job => {
        if (filterType === 'local') return job.isLocal;
        if (filterType === 'global') return !job.isLocal;
        return true;
    });

    const isJobSaved = (id) => savedJobs.some(j => j.id === id);

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">Find Opportunities</h1>
            <p className="text-[var(--text-secondary)] mb-6">Search global platforms or find local Egyptian clients.</p>
            
            <div className="flex gap-4 mb-6">
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-3 border border-[var(--border-color)] rounded-lg" />
              <button onClick={() => loadJobs(searchQuery)} className="btn-primary">Search</button>
            </div>

            <div className="flex gap-2 border-b border-gray-200 pb-1">
                <button onClick={() => setFilterType('all')} className={`px-4 py-2 rounded-t-lg font-medium ${filterType === 'all' ? 'bg-white text-[var(--primary-color)] border border-b-0' : 'text-gray-500'}`}>All Jobs</button>
                <button onClick={() => setFilterType('local')} className={`px-4 py-2 rounded-t-lg font-medium ${filterType === 'local' ? 'bg-white text-[var(--primary-color)] border border-b-0' : 'text-gray-500'}`}>🇪🇬 Local (Egypt)</button>
                <button onClick={() => setFilterType('global')} className={`px-4 py-2 rounded-t-lg font-medium ${filterType === 'global' ? 'bg-white text-[var(--primary-color)] border border-b-0' : 'text-gray-500'}`}>🌐 Global (Remote)</button>
            </div>
          </div>

          {!loading && (
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} onSave={handleSaveJob} isSaved={isJobSaved(job.id)} />
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">No jobs found.</div>
              )}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  } catch (error) { return null; }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<JobsApp />);