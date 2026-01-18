// utils/auth.js
const Auth = {
  getUser() {
    try {
      const user = localStorage.getItem('nl_user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error('Error parsing user data', e);
      return null;
    }
  },

  login(email = 'demo@nilelancers.com') {
    const mockUser = {
      name: 'Ahmed Hassan',
      email: email,
      title: 'Senior Graphic Designer',
      location: 'Cairo, Egypt',
      bio: 'Passionate designer with 5 years of experience in branding and UI design. I love creating clean and functional interfaces for local and global clients.',
      skills: ['Photoshop', 'Illustrator', 'Figma', 'UI/UX'],
      avatar: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=0D8ABC&color=fff'
    };
    localStorage.setItem('nl_user', JSON.stringify(mockUser));
    return mockUser;
  },

  logout() {
    localStorage.removeItem('nl_user');
    window.location.href = 'index.html';
  },

  updateUser(updates) {
    const user = this.getUser();
    if (!user) return null;
    const updated = { ...user, ...updates };
    if (updates.name && updates.name !== user.name) {
        updated.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(updates.name)}&background=0D8ABC&color=fff`;
    }
    localStorage.setItem('nl_user', JSON.stringify(updated));
    return updated;
  }
};