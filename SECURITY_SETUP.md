# Firebase Security Setup Guide

This guide explains how to configure Firebase credentials for the NileLancers project securely.

## 🔒 Security Overview

Firebase credentials are **no longer hardcoded** in the repository. Instead, they are:
- **Local Development**: Loaded from `firebase-config.local.js` (excluded from git)
- **Production (Vercel)**: Loaded from environment variables

## 📋 Local Development Setup

### Step 1: Create Local Configuration File

1. Copy the template file:
   ```bash
   cp firebase-config.local.js.example firebase-config.local.js
   ```

2. Open `firebase-config.local.js` and replace the placeholder values with your actual Firebase credentials from the [Firebase Console](https://console.firebase.google.com/)

3. **IMPORTANT**: Never commit `firebase-config.local.js` to git! It's already in `.gitignore`.

### Step 2: Update HTML Files

Make sure your HTML files load the configuration in the correct order:

```html
<!-- Load Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-storage-compat.js"></script>

<!-- Load local Firebase config (NOT committed to git) -->
<script src="firebase-config.local.js"></script>

<!-- Load Firebase initialization (uses config from above) -->
<script src="firebase-config.js"></script>
```

## 🚀 Production Deployment (Vercel)

### Option 1: Using Vercel Environment Variables (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   - `FIREBASE_MEASUREMENT_ID`

4. Create a build script that injects these into your HTML or creates a `window.FIREBASE_CONFIG` object

### Option 2: Simple Approach for Static Sites

Since this is a static HTML site, you can:

1. Create a `vercel.json` or build script that generates `firebase-config.local.js` during deployment
2. OR manually update the production files before deploying (not recommended)
3. OR use the same `firebase-config.local.js` for production (ensure it's uploaded separately, not via git)

## 🔐 Firebase Security Rules

Remember that Firebase security comes primarily from **Firebase Security Rules**, not from hiding the API key. Make sure your Firestore and Storage rules are properly configured:

### Firestore Rules Example
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Jobs are readable by all authenticated users
    match /jobs/{jobId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## ❓ Troubleshooting

### "Firebase configuration not found" Error

This means `firebase-config.local.js` is missing. Create it from the template:
```bash
cp firebase-config.local.js.example firebase-config.local.js
```

Then add your actual Firebase credentials.

### Changes Not Reflected

1. Clear browser cache
2. Hard refresh (Ctrl+F5 or Cmd+Shift+R)
3. Check browser console for errors

## 📚 Additional Resources

- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
