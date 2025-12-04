// post-job-app.js
function PostJobApp() {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({ title: '', category: '', description: '', budgetMin: '', budgetMax: '', location: 'Remote (Egypt)', paymentMethod: 'Vodafone Cash' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); window.scrollTo(0, 0); }, 1500);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Job Posted!</h2>
            <p className="text-gray-600 mb-8">Your job is now live on the NileLancers Local Marketplace.</p>
            <a href="jobs.html" className="btn-primary">View Your Job</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Post a New Job</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-8">
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input type="text" className="input-field" placeholder="e.g. Logo Designer" required onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <select className="input-field" onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}>
                  <option>Vodafone Cash</option>
                  <option>Instapay</option>
                  <option>Fawry</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select className="input-field" onChange={(e) => setFormData({...formData, location: e.target.value})}>
                  <option>Remote (Egypt)</option>
                  <option>Cairo</option>
                  <option>Alexandria</option>
                </select>
             </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Publishing...' : 'Post Job Now'}</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PostJobApp />);