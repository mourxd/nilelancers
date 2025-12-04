// saved-app.js
function SavedApp() {
  const [savedJobs, setSavedJobs] = React.useState([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('savedServices');
    if (saved) setSavedJobs(JSON.parse(saved));
  }, []);

  const handleRemoveJob = (jobId) => {
    const updated = savedJobs.filter(j => j.id !== jobId);
    setSavedJobs(updated);
    localStorage.setItem('savedServices', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Saved Services</h1>
        {savedJobs.length === 0 ? (
          <p>No saved services yet.</p>
        ) : (
          <div className="space-y-4">
            {savedJobs.map(job => (
              <SavedJobCard key={job.id} job={job} onRemove={handleRemoveJob} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SavedApp />);