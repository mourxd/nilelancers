// auth.js
const Auth = {
  getUser() {
    try {
      const user = localStorage.getItem('nile_user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error('Error parsing user data', e);
      return null;
    }
  },

  login(email, password) {
    // In a real app, you'd call an API here.
    // For this demo, we'll use a mock user.
    const mockUser = {
      name: 'Omar Sherif',
      email: email,
      title: 'Senior Full Stack Developer',
      location: 'Cairo, Egypt',
      bio: 'Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in the MERN stack and modern UI/UX principles.',
      skills: ["React.js", "Node.js", "Tailwind CSS", "MongoDB", "UI/UX", "Arabic Translation"],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      portfolio: [
        { id: 1, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=60", title: "E-commerce App" },
        { id: 2, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=60", title: "Analytics Dashboard" },
        { id: 3, img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=500&q=60", title: "Portfolio Site" }
      ],
      reviews: [
        { id: 1, client: "TechCorp", text: "Omar is an exceptional developer. Delivered on time and code was clean.", stars: 5 },
        { id: 2, client: "StartUp Inc", text: "Great communication and very skilled in React.", stars: 5 }
      ]
    };
    localStorage.setItem('nile_user', JSON.stringify(mockUser));
    return mockUser;
  },

  signup(name, email, password) {
    // In a real app, you'd call an API here.
    // For this demo, we'll just log them in with the mock user.
    return this.login(email, password);
  },

  logout() {
    localStorage.removeItem('nile_user');
  },

  updateUser(updates) {
    const user = this.getUser();
    if (!user) return null;
    const updated = { ...user, ...updates };
    if (updates.name && updates.name !== user.name) {
        updated.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(updates.name)}&background=0D8ABC&color=fff`;
    }
    localStorage.setItem('nile_user', JSON.stringify(updated));
    return updated;
  }
};