# Vercel Deployment Guide for NileLancers

This guide explains how to deploy your NileLancers application to Vercel with proper Firebase configuration.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- Your project pushed to GitHub (with cleaned git history)

## Deployment Steps

### 1. Connect Your Repository to Vercel

1. Go to https://vercel.com/new
2. Click **Import Project**
3. Select **Import Git Repository**
4. Choose your GitHub repository: `mourxd/nilelancers`
5. Click **Import**

### 2. Configure Build Settings

Since this is a static HTML site, use these settings:

- **Framework Preset**: Other (or leave blank)
- **Build Command**: Leave empty (no build needed for static HTML)
- **Output Directory**: `./` (root directory)
- **Install Command**: Leave empty

### 3. Set Up Environment Variables

This is the **most important step** for Firebase to work on Vercel.

Click on **Environment Variables** and add the following:

| Name | Value |
|------|-------|
| `FIREBASE_API_KEY` | `AIzaSyAjHkMbZs2Cb3_H9Dv0LzK30Llr06TT9lU` |
| `FIREBASE_AUTH_DOMAIN` | `nilelancers-53954.firebaseapp.com` |
| `FIREBASE_PROJECT_ID` | `nilelancers-53954` |
| `FIREBASE_STORAGE_BUCKET` | `nilelancers-53954.firebasestorage.app` |
| `FIREBASE_MESSAGING_SENDER_ID` | `857933274817` |
| `FIREBASE_APP_ID` | `1:857933274817:web:87503c6d34ff0117a0be40` |
| `FIREBASE_MEASUREMENT_ID` | `G-G403CY6N89` |

> **Note**: For each variable, set the **Environment** to "Production", "Preview", and "Development" to ensure it works in all environments.

### 4. Create Build Hook (Optional)

If you want to inject environment variables into your static files at build time, you'll need a build script. However, for your current setup, there's a simpler approach:

#### Option A: Client-Side Injection (Recommended for Static Sites)

Add a new file `vercel-config.js` in your project root:

```javascript
// This file is automatically exposed by Vercel if you set environment variables
if (typeof window !== 'undefined' && !window.firebaseConfig) {
    window.firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY || '',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
        projectId: process.env.FIREBASE_PROJECT_ID || '',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
        appId: process.env.FIREBASE_APP_ID || '',
        measurementId: process.env.FIREBASE_MEASUREMENT_ID || ''
    };
}
```

Then update your HTML files to load this before `firebase-config.js`:

```html
<script src="vercel-config.js"></script>
<script src="firebase-config.js"></script>
```

#### Option B: Use Vercel Build Step

Create a `build.js` file:

```javascript
const fs = require('fs');

const firebaseConfig = `
const firebaseConfig = {
    apiKey: "${process.env.FIREBASE_API_KEY}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
    projectId: "${process.env.FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${process.env.FIREBASE_APP_ID}",
    measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}"
};
`;

fs.writeFileSync('firebase-config.local.js', firebaseConfig);
console.log('Firebase config generated successfully!');
```

Then in Vercel build settings:
- **Build Command**: `node build.js`
- **Install Command**: Leave empty (no dependencies needed)

### 5. Deploy

Click **Deploy** and wait for Vercel to build and deploy your site.

## Post-Deployment

### Test Your Deployment

1. Visit your Vercel URL (e.g., `https://nilelancers.vercel.app`)
2. Open browser DevTools console
3. Check for "Firebase initialized successfully!" message
4. Test authentication features

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain
4. Update DNS records as instructed by Vercel

## Troubleshooting

### Firebase Not Initializing

**Problem**: Console shows "Firebase configuration not found!"

**Solution**: 
- Verify environment variables are set in Vercel dashboard
- Check that `firebase-config.local.js` is being generated/loaded
- Ensure `firebase-config.js` is not in `.gitignore`

### Environment Variables Not Working

**Problem**: Environment variables are undefined

**Solution**:
- Vercel doesn't inject `process.env` into client-side code automatically
- Use Option B above with a build script to inject them at build time
- Or manually create `firebase-config.local.js` in Vercel's file system

## Simple Alternative: Commit firebase-config.local.js to a Production Branch

If the above seems complex, here's a simpler approach:

1. Create a new branch called `production`:
   ```bash
   git checkout -b production
   ```

2. In this branch ONLY, commit `firebase-config.local.js`:
   ```bash
   git add firebase-config.local.js
   git commit -m "Add Firebase config for production"
   git push origin production
   ```

3. In Vercel, set the **Production Branch** to `production` instead of `main`

4. Keep your `main` branch clean (without `firebase-config.local.js`)

This way:
- ✅ Your main branch stays secure
- ✅ Vercel deploys from the production branch which has the config
- ✅ No build scripts needed

## Important Notes

> [!IMPORTANT]
> Firebase API keys for web apps are designed to be public. The real security comes from Firebase Security Rules, not from hiding the API key. However, we still keep them out of git history as a best practice.

> [!TIP]
> After deployment, test all features:
> - User authentication (signup/login)
> - Profile updates
> - Job posting
> - Wallet functionality

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Firebase Web Setup: https://firebase.google.com/docs/web/setup
