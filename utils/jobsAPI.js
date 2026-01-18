// utils/jobsAPI.js
const jobsAPI = {
  getJobs: () => {
    return [
      { id: 1, title: 'Build a React Native App', company: 'MobileCorp', budget: '$2,000 - $3,000', location: 'Remote', tags: ['React Native', 'Mobile App'] },
      { id: 2, title: 'Design a new logo', company: 'Creative Inc.', budget: '$500', location: 'Remote', tags: ['Logo Design', 'Branding'] },
      { id: 3, title: 'Write a blog post about AI', company: 'TechBlog', budget: '$100', location: 'Remote', tags: ['Writing', 'AI'] },
    ];
  }
};