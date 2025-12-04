// components/JobCard.js
function JobCard({ job, onSave, isSaved }) {
  const isLocal = job.isLocal;

  return (
    <div className={`card flex flex-col md:flex-row gap-6 ${isLocal ? 'border-l-4 border-l-[var(--primary-color)]' : ''}`}>
      
      {/* Logo/Icon Section */}
      <div className="flex-shrink-0">
        <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold
          ${isLocal ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {isLocal ? 'NL' : job.source.substring(0, 2)}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] hover:text-[var(--primary-color)] transition-colors cursor-pointer">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-medium text-[var(--text-secondary)]">{job.company}</span>
              
              {/* Badge: Local vs Global */}
              {isLocal ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Local Direct Hire
                </span>
              ) : (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full border border-gray-200">
                  via {job.source}
                </span>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => onSave(job)}
            className={`p-2 rounded-full hover:bg-[var(--secondary-color)] transition-all ${isSaved ? 'text-[var(--primary-color)]' : 'text-gray-400'}`}
          >
            <i className={`icon-bookmark ${isSaved ? 'fill-current' : ''}`}></i>
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-[var(--text-secondary)]">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">
              {job.budget}
            </span>
            <span className="text-xs text-gray-500">({job.type})</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="icon-map-pin w-4 h-4"></i>
            {job.location}
          </div>
        </div>

        <p className="mt-3 text-[var(--text-secondary)] line-clamp-2">
          {job.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 cursor-pointer">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col justify-center gap-2 min-w-[140px] mt-4 md:mt-0">
        {isLocal ? (
          <button className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 font-medium text-sm text-center shadow-sm">
            Apply Now
          </button>
        ) : (
          <a href="#" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm text-center flex items-center justify-center gap-2">
            View on {job.source}
            <i className="icon-external-link w-3 h-3"></i>
          </a>
        )}
      </div>
    </div>
  );
}