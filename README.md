# NileLancers

A modern freelance platform connecting talented freelancers with clients across the globe.

## 📁 Project Structure

```
nilelancers/
├── index.html              # Homepage
├── pages/                  # All application pages
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── settings.html
│   ├── wallet.html
│   ├── jobs.html
│   ├── saved.html
│   ├── post-job.html
│   ├── applications.html
│   └── client-dashboard.html
├── js/                     # JavaScript files
│   ├── auth.js            # Firebase authentication
│   ├── db-firebase.js     # Firestore database functions
│   ├── firebase-config.js # Firebase configuration
│   ├── components.js      # Shared React components (Header, Footer)
│   ├── profile-app.js     # Profile page logic
│   ├── jobs-app.js        # Jobs page logic
│   └── saved-app.js       # Saved jobs logic
├── docs/                   # Documentation
│   ├── FIREBASE_SETUP_INSTRUCTIONS.md
│   ├── HTML_UPDATE_GUIDE.html
│   └── README_FIREBASE_REACT_UPDATE.md
└── .git/                   # Git repository

```

## 🚀 Features

- **User Authentication**: Firebase-based signup/login
- **User Profiles**: Customizable freelancer profiles
- **Job Board**: Browse and post jobs
- **Wallet System**: Track earnings and withdrawals
- **Saved Jobs**: Bookmark interesting opportunities
- **Multilingual**: English/Arabic support
- **Dark/Light Mode**: Theme switching

## 🛠️ Tech Stack

- **Frontend**: HTML5, React 18.3.1 (via CDN), TailwindCSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Icons**: Font Awesome 6.4
- **Fonts**: Montserrat, Cairo (for Arabic)

## 📦 Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mourxd/nilelancers.git
   cd nilelancers
   ```

2. **Firebase Configuration**
   - Firebase credentials are in `js/firebase-config.js`
   - Already configured and ready to use

3. **Run locally**
   - Open `index.html` in a browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # OR
     npx serve
     ```

4. **Deploy**
   - Deploy to Vercel, Netlify, or any static hosting
   - See `docs/` for deployment guides

## 📖 Documentation

- **Firebase Setup**: `docs/FIREBASE_SETUP_INSTRUCTIONS.md`
- **HTML Update Guide**: `docs/HTML_UPDATE_GUIDE.html`
- **React Integration**: `docs/README_FIREBASE_REACT_UPDATE.md`

## 🔐 Security

Firebase API keys for web apps are designed to be public. Security is enforced through:
- Firebase Security Rules (Firestore & Storage)
- Firebase Authentication
- Server-side validation

## 🌐 Live Demo

Coming soon!

## 📝 License

© 2025 NileLancers. All rights reserved.

## 👥 Team

Developed by [mourxd](https://github.com/mourxd)
