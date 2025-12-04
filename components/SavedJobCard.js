// components/SavedJobCard.js
function SavedJobCard({ job, onRemove }) {
  return (
    <div className="card flex items-center justify-between">
      <div>
        <h3 className="font-bold text-lg">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.company}</p>
      </div>
      <button onClick={() => onRemove(job.id)} className="text-red-500 text-sm hover:underline">
        Remove
      </button>
    </div>
  );
}