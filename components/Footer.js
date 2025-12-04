// components/Footer.js
function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border-color)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">NileLancers</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              The first hybrid freelance marketplace connecting Egyptian talent with global opportunities and local direct hires.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><a href="jobs.html" className="hover:text-[var(--primary-color)]">Browse Global Jobs</a></li>
              <li><a href="post-job.html" className="hover:text-[var(--primary-color)]">Local Marketplace</a></li>
              <li><a href="#" className="hover:text-[var(--primary-color)]">Pricing & Fees</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--primary-color)]">Success Stories</a></li>
              <li><a href="#" className="hover:text-[var(--primary-color)]">Payment Methods (Fawry)</a></li>
              <li><a href="#" className="hover:text-[var(--primary-color)]">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Project Context</h3>
            <p className="text-xs text-[var(--text-secondary)] mb-2">
              Graduation Project 2025
              <br />Egyptian E-Learning University
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Supervised by: <br />
              Dr. Ahmed Hassan & Dr. Mayar Magdy
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2025 NileLancers. Built with React & Node.js.
          </p>
        </div>
      </div>
    </footer>
  );
}