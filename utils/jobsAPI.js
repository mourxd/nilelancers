// utils/jobsAPI.js
const JobsAPI = {
  getMockJobs(query = '') {
    const allJobs = [
      // --- LOCAL MARKETPLACE (Direct Hires - EGP) ---
      { 
        id: 'l1', 
        title: 'Wedding Photographer Needed', 
        company: 'Private Client', 
        budget: 'EGP 5,000 - 8,000', 
        type: 'On-Site', 
        category: 'Photography', 
        description: 'Need a photographer for a wedding in Maadi. Must accept Vodafone Cash or Fawry deposit.', 
        location: 'Cairo, Egypt', 
        skills: ['Photography', 'Photo Editing', 'Events'], 
        source: 'NileLancers Local',
        isLocal: true 
      },
      { 
        id: 'l2', 
        title: 'React Native Developer for Delivery App', 
        company: 'Talabat Clone Startup', 
        budget: 'EGP 15,000 - 25,000', 
        type: 'Project', 
        category: 'Mobile Development', 
        description: 'Building a local food delivery app. Payment via Bank Transfer (CIB/NBE).', 
        location: 'Alexandria (Hybrid)', 
        skills: ['React Native', 'Node.js', 'Google Maps API'], 
        source: 'NileLancers Local',
        isLocal: true 
      },
      { 
        id: 'l3', 
        title: 'Arabic Content Writer for Tech Blog', 
        company: 'TechEgy', 
        budget: 'EGP 500 / Article', 
        type: 'Freelance', 
        category: 'Writing & Content', 
        description: 'Writing tech reviews in standard Arabic (Fusha).', 
        location: 'Remote (Egypt)', 
        skills: ['Arabic Writing', 'SEO', 'Tech'], 
        source: 'Mostaql',
        isLocal: true 
      },

      // --- AGGREGATOR (Global Sources - USD) ---
      { 
        id: 'g1', 
        title: 'Build E-commerce Website with React', 
        company: 'Online Retailer', 
        budget: '$2,500 - $5,000', 
        type: 'Fixed Price', 
        category: 'Web Development', 
        description: 'React JavaScript Stripe Payment Integration', 
        location: 'Remote (Global)', 
        skills: ['React', 'JavaScript', 'Stripe'], 
        source: 'Upwork',
        isLocal: false 
      },
      { 
        id: 'g2', 
        title: 'Logo Design for Tech Startup', 
        company: 'StartupX', 
        budget: '$200 - $500', 
        type: 'Fixed Price', 
        category: 'Design & Creative', 
        description: 'Logo Design Branding Identity', 
        location: 'Remote', 
        skills: ['Logo Design', 'Illustrator', 'Branding'], 
        source: 'Fiverr',
        isLocal: false 
      },
      { 
        id: 'g3', 
        title: 'SEO Content Writing - 20 Articles', 
        company: 'Digital Agency', 
        budget: '$800 - $1,200', 
        type: 'Fixed Price', 
        category: 'Writing & Content', 
        description: 'SEO Blog Writing Content Strategy', 
        location: 'Remote', 
        skills: ['SEO', 'Content Writing', 'Copywriting'], 
        source: 'Freelancer',
        isLocal: false 
      }
    ];
    
    if (!query || query.trim() === '') {
      return allJobs;
    }
    
    const searchTerm = query.toLowerCase();
    return allJobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.category.toLowerCase().includes(searchTerm) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
      job.location.toLowerCase().includes(searchTerm)
    );
  },
  
  async fetchAllJobs(query = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getMockJobs(query));
      }, 300);
    });
  }
};