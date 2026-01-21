# 🔥 Firebase Setup Instructions for NileLancers

Follow these steps to set up Firebase for your NileLancers platform.

## 📋 Prerequisites
- Google account (Gmail)
- Node.js installed (for Firebase CLI - optional but recommended)

---

## Step 1: Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Click "Add project"** or "Create a project"
3. **Enter project name**: `nilelancers` (or your preferred name)
4. **Click Continue**
5. **Google Analytics**: You can disable this for now or enable it (optional)
6. **Click "Create project"** and wait for it to finish

---

## Step 2: Register Your Web App

1. In your Firebase project dashboard, **click the Web icon** `</>`
2. **App nickname**: Enter `NileLancers Web App`
3. **Firebase Hosting**: Check this box (since you're using Vercel, you can skip hosting setup later)
4. **Click "Register app"**
5. **Copy the Firebase configuration** - it will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXXX"
};
```

6. **IMPORTANT**: Copy these values! You'll need them in the next step.

---

## Step 3: Update firebase-config.js

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",           // Replace with your apiKey
    authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",   // Replace with your authDomain
    projectId: "YOUR_ACTUAL_PROJECT_ID",     // Replace with your projectId
    storageBucket: "YOUR_ACTUAL_STORAGE",    // Replace with your storageBucket
    messagingSenderId: "YOUR_ACTUAL_ID",     // Replace with your messagingSenderId
    appId: "YOUR_ACTUAL_APP_ID",             // Replace with your appId
    measurementId: "YOUR_ACTUAL_MEASURE_ID"  // Replace with your measurementId
};
```

3. **Save the file**

---

## Step 4: Enable Authentication

1. In Firebase Console, go to **Build** > **Authentication**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. **Enable Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"
5. **(Optional) Enable Google Sign-In**:
   - Click on "Google"
   - Toggle "Enable"
   - Enter your project support email
   - Click "Save"

---

## Step 5: Set Up Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click **"Create database"**
3. **Security mode**: Choose **"Start in test mode"** (we'll secure it later)
   - Test mode allows read/write for 30 days - good for development
4. **Location**: Choose your nearest region (e.g., `europe-west` for Egypt/Europe)
5. Click **"Enable"**

---

## Step 6: Create Firestore Collections

Your database will auto-create collections when you use them, but here's the structure:

### Collections Created Automatically:
- `users` - User profiles
- `jobs` - Job postings
- `savedJobs` - Saved jobs by users
- `applications` - Job applications

**Note**: These will be created automatically when users sign up and post jobs.

---

## Step 7: Set Up Firestore Security Rules (IMPORTANT)

1. In Firestore Database, go to the **"Rules"** tab
2. Replace the default rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User profiles
    match /users/{userId} {
      allow read: if true; // Anyone can read profiles
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update, delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Jobs
    match /jobs/{jobId} {
      allow read: if true; // Anyone can read jobs
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid);
    }
    
    // Saved Jobs
    match /savedJobs/{saveId} {
      allow read, write: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
    
    // Applications
    match /applications/{applicationId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         resource.data.jobOwnerId == request.auth.uid);
      allow update: if request.auth != null && 
        resource.data.jobOwnerId == request.auth.uid;
    }
  }
}
```

3. Click **"Publish"**

---

## Step 8: Enable Firebase Storage (Optional - for avatars/images)

1. In Firebase Console, go to **Build** > **Storage**
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Use the same location as Firestore
5. Click **"Done"**

---

## Step 9: Update Your HTML Files

Add Firebase SDK scripts to ALL your HTML files **BEFORE** your custom scripts.

Add these lines in the `<head>` section of each HTML file:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>

<!-- Your Firebase Config -->
<script src="firebase-config.js"></script>
<script src="auth-firebase.js"></script>
<script src="db-firebase.js"></script>
```

**Replace the old auth.js line with the Firebase scripts above.**

---

## Step 10: Deploy to Vercel

1. **Commit all your changes** to Git:
   ```bash
   git add .
   git commit -m "Add Firebase integration"
   git push
   ```

2. **Vercel will auto-deploy** if you have auto-deployment enabled

3. **Add Environment Variables** (optional - for better security):
   - Go to Vercel Dashboard > Your Project > Settings > Environment Variables
   - Add your Firebase config as environment variables (advanced)

---

## Step 11: Test Your Setup

1. **Go to your deployed site** (or test locally)
2. **Try signing up** with a new account
3. **Check Firebase Console**:
   - Go to Authentication > Users - you should see the new user
   - Go to Firestore > users collection - you should see user data
4. **Try posting a job** - check Firestore > jobs collection
5. **Try saving a job** - check Firestore > savedJobs collection

---

## 🎉 You're Done!

Your NileLancers platform now has:
- ✅ Real user authentication
- ✅ Secure database storage
- ✅ User profiles
- ✅ Job postings in database
- ✅ Saved jobs feature
- ✅ Application system

---

## 🔒 Security Best Practices (After Testing)

After you've tested everything and it works:

1. **Tighten Firestore Rules**: Change from test mode to production rules (already provided in Step 7)
2. **Set up Firebase App Check**: Prevents abuse from bots
3. **Monitor Usage**: Check Firebase Console > Usage tab regularly
4. **Set up Billing Alerts**: In Google Cloud Console

---

## 📊 Firebase Free Tier Limits

Your free tier includes:
- **Authentication**: 10K verifications/month
- **Firestore**: 50K reads/day, 20K writes/day, 1GB storage
- **Storage**: 5GB storage, 1GB/day downloads
- **Hosting**: 10GB storage, 360MB/day bandwidth

This is more than enough for starting out!

---

## 🆘 Troubleshooting

**Problem**: "Firebase not defined" error
- **Solution**: Make sure Firebase SDKs are loaded before your scripts

**Problem**: "Permission denied" errors
- **Solution**: Check Firestore security rules (Step 7)

**Problem**: Users not appearing in Firestore
- **Solution**: Check browser console for errors, verify firebase-config.js is correct

**Problem**: "Auth domain not authorized"
- **Solution**: In Firebase Console > Authentication > Settings > Authorized domains, add your Vercel domain

---

## 🎯 Next Steps

After everything works:
1. Customize email templates in Firebase Console > Authentication > Templates
2. Set up email verification
3. Add password reset functionality
4. Monitor your usage in Firebase Console

---

## 📞 Need Help?

- Firebase Documentation: https://firebase.google.com/docs
- Firebase Support: https://firebase.google.com/support

---

**Happy Coding! 🚀**
