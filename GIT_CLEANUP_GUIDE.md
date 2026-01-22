# Git History Cleanup Guide

> [!CAUTION]
> **Critical**: The exposed Firebase API key is still in your Git history. Follow these steps to remove it completely.

## Option 1: Using git filter-repo (Recommended - Easiest)

`git filter-repo` is the modern, fast, and safe way to rewrite Git history.

### Install git filter-repo

```powershell
# Using pip
pip install git-filter-repo

# OR download from https://github.com/newren/git-filter-repo
```

### Remove the Exposed Secret

```powershell
# Navigate to your repository
cd c:\Users\PC\Documents\nilelancers\github\nilelancers-1

# Create a backup first!
git clone --mirror . ../nilelancers-backup

# Remove firebase-config.js from all commits
git filter-repo --path firebase-config.js --invert-paths

# Force push to GitHub (WARNING: this rewrites history)
git push origin --force --all
git push origin --force --tags
```

## Option 2: Using BFG Repo-Cleaner (Alternative)

BFG is another popular tool for cleaning Git history.

### Steps

```powershell
# 1. Download BFG from https://rtyley.github.io/bfg-repo-cleaner/
# Save bfg.jar to a convenient location

# 2. Create a backup
cd c:\Users\PC\Documents\nilelancers\github\nilelancers-1\..
git clone --mirror nilelancers-1 nilelancers-backup.git

# 3. Remove the file from history
cd nilelancers-1
java -jar path\to\bfg.jar --delete-files firebase-config.js

# 4. Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 5. Force push
git push origin --force --all
git push origin --force --tags
```

## Option 3: Manual Removal (Advanced)

If you can't use the tools above, use git filter-branch:

```powershell
# Navigate to your repository
cd c:\Users\PC\Documents\nilelancers\github\nilelancers-1

# Remove firebase-config.js from all commits
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch firebase-config.js" --prune-empty --tag-name-filter cat -- --all

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
git push origin --force --tags
```

## After Cleaning Git History

### 1. Verify the file is gone from history

```powershell
# Search for the API key in all commits
git log --all --full-history -- firebase-config.js

# This should return nothing
```

### 2. Inform collaborators

If you have team members, they need to:

```powershell
# Delete their local repository
cd ..
rm -rf nilelancers-1

# Clone fresh from GitHub
git clone https://github.com/mourxd/nilelancers.git nilelancers-1
```

### 3. Check GitHub's secret scanning

- Go to your repository on GitHub
- Navigate to **Settings** → **Security** → **Secret scanning alerts**
- The alert should disappear within a few hours after force-pushing

### 4. Rotate the exposed API key (if not done already)

Even after removing from Git history, anyone who pulled the repository before cleanup still has access to the old key. Make sure you've rotated it in Firebase Console.

## Important Notes

> [!WARNING]
> - **Force pushing rewrites history**: All collaborators must delete and re-clone the repository
> - **Timing**: Do this when no one else is actively working on the repository
> - **Backups**: Always create a backup before rewriting history
> - **GitHub Actions**: May need to update any cached workflows

> [!TIP]
> After cleanup, set up pre-commit hooks to prevent future secret commits:
> ```powershell
> # Install pre-commit
> pip install pre-commit
> 
> # Add detect-secrets hook to .pre-commit-config.yaml
> ```

## Verification

To confirm the cleanup worked:

1. Check GitHub security alerts (should be resolved)
2. Clone repository fresh and verify `firebase-config.js` doesn't contain secrets
3. Search git history: `git log --all --full-history --source --find-copies-harder -S "AIzaSyAjHkMbZs2Cb3_H9Dv0LzK30Llr06TT" -- firebase-config.js`
