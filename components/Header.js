// components/Header.js
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-[var(--border-color)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <a href="index.html" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">NileLancers</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="index.html" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] font-medium">Home</a>
            <a href="jobs.html" className="text-[var(--text-primary)] font-medium">Browse Jobs</a>
            <a href="saved.html" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] font-medium">Saved</a>
            
            <div className="h-6 w-px bg-gray-200"></div>

            <div className="flex items-center space-x-4">
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium">Log In</a>
              <a href="post-job.html" className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 font-medium text-sm">
                Post a Job (Local)
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <i className="icon-menu text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <a href="index.html" className="block px-4 py-3 text-[var(--text-secondary)] hover:bg-gray-50">Home</a>
          <a href="jobs.html" className="block px-4 py-3 text-[var(--text-primary)] font-medium bg-gray-50">Browse Jobs</a>
          <a href="saved.html" className="block px-4 py-3 text-[var(--text-secondary)] hover:bg-gray-50">Saved</a>
          <a href="post-job.html" className="block px-4 py-3 text-[var(--primary-color)] font-medium">Post a Local Job</a>
        </div>
      )}
    </nav>
  );
}