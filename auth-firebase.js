// Firebase Authentication System
// This replaces the old localStorage-based auth.js

const AuthFirebase = {
    // Sign up new user
    signup: async (name, email, password, userType = 'freelancer') => {
        try {
            // Create user account
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Update display name
            await user.updateProfile({
                displayName: name
            });

            // Create user profile in Firestore
            await db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                userType: userType, // 'freelancer' or 'client'
                title: userType === 'client' ? 'Business Owner' : 'Freelancer',
                location: 'Egypt',
                bio: userType === 'client' ? 'Looking for talented freelancers.' : 'Welcome to NileLancers!',
                skills: userType === 'client' ? [] : ['JavaScript', 'React', 'Node.js'],
                avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&size=200&background=0074D9&color=fff',
                portfolio: [],
                reviews: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('User created successfully:', user.uid);
            return AuthFirebase.getCurrentUser();
        } catch (error) {
            console.error('Signup error:', error);
            alert(error.message);
            return null;
        }
    },

    // Login existing user
    login: async (email, password) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log('User logged in:', userCredential.user.uid);
            return AuthFirebase.getCurrentUser();
        } catch (error) {
            console.error('Login error:', error);
            alert(error.message);
            return null;
        }
    },

    // Logout
    logout: async () => {
        try {
            await auth.signOut();
            console.log('User logged out');
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    },

    // Get current user (synchronous - for initial checks)
    getUser: () => {
        const user = auth.currentUser;
        if (!user) return null;

        return {
            uid: user.uid,
            name: user.displayName || 'User',
            email: user.email,
            avatar: user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || 'User') + '&size=200&background=0074D9&color=fff'
        };
    },

    // Get current user with full profile from Firestore
    getCurrentUser: async () => {
        const user = auth.currentUser;
        if (!user) return null;

        try {
            // Get user profile from Firestore
            const doc = await db.collection('users').doc(user.uid).get();

            if (doc.exists) {
                const userData = doc.data();
                return {
                    uid: user.uid,
                    name: userData.name || user.displayName,
                    email: user.email,
                    userType: userData.userType || 'freelancer', // Default to freelancer for backward compatibility
                    title: userData.title || 'Freelancer',
                    location: userData.location || 'Egypt',
                    bio: userData.bio || '',
                    skills: userData.skills || [],
                    avatar: userData.avatar || user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || 'User') + '&size=200&background=0074D9&color=fff',
                    portfolio: userData.portfolio || [],
                    reviews: userData.reviews || []
                };
            } else {
                // Fallback to auth data if no Firestore profile
                return {
                    uid: user.uid,
                    name: user.displayName || 'User',
                    email: user.email,
                    userType: 'freelancer', // Default type
                    title: 'Freelancer',
                    location: 'Egypt',
                    bio: '',
                    skills: [],
                    avatar: user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || 'User') + '&size=200&background=0074D9&color=fff',
                    portfolio: [],
                    reviews: []
                };
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    },

    // Update user profile
    updateUser: async (updates) => {
        const user = auth.currentUser;
        if (!user) return null;

        try {
            // Update Firestore
            await db.collection('users').doc(user.uid).update({
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Update display name if changed
            if (updates.name) {
                await user.updateProfile({
                    displayName: updates.name
                });
            }

            console.log('Profile updated successfully');
            return AuthFirebase.getCurrentUser();
        } catch (error) {
            console.error('Update error:', error);
            alert(error.message);
            return null;
        }
    },

    // Listen to auth state changes
    onAuthStateChanged: (callback) => {
        return auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Check if Firestore profile exists, create if missing
                const userDoc = await db.collection('users').doc(user.uid).get();

                if (!userDoc.exists) {
                    console.log('Creating missing Firestore profile for user:', user.uid);
                    // Create profile for users who signed up before the async fix
                    await db.collection('users').doc(user.uid).set({
                        name: user.displayName || user.email.split('@')[0],
                        email: user.email,
                        userType: 'freelancer', // Default for existing users
                        title: 'Freelancer',
                        location: 'Egypt',
                        bio: 'Welcome to NileLancers!',
                        skills: ['JavaScript', 'React', 'Node.js'],
                        avatar: user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email.split('@')[0]) + '&size=200&background=0074D9&color=fff',
                        portfolio: [],
                        reviews: [],
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                } else {
                    // Add userType to existing users who don't have it
                    const userData = userDoc.data();
                    if (!userData.userType) {
                        console.log('Adding userType to existing user:', user.uid);
                        await db.collection('users').doc(user.uid).update({
                            userType: 'freelancer', // Default for backward compatibility
                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                }

                const fullUser = await AuthFirebase.getCurrentUser();
                callback(fullUser);
            } else {
                callback(null);
            }
        });
    },

    // Send password reset email
    resetPassword: async (email) => {
        try {
            await auth.sendPasswordResetEmail(email);
            alert('Password reset email sent! Check your inbox.');
            return true;
        } catch (error) {
            console.error('Password reset error:', error);
            alert(error.message);
            return false;
        }
    },

    // Google Sign-In
    signInWithGoogle: async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await auth.signInWithPopup(provider);
            const user = result.user;

            // Check if user profile exists, if not create one
            const userDoc = await db.collection('users').doc(user.uid).get();

            if (!userDoc.exists) {
                await db.collection('users').doc(user.uid).set({
                    name: user.displayName,
                    email: user.email,
                    userType: 'freelancer', // Default for Google sign-in
                    title: 'Freelancer',
                    location: 'Egypt',
                    bio: 'Welcome to NileLancers!',
                    skills: [],
                    avatar: user.photoURL,
                    portfolio: [],
                    reviews: [],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }

            console.log('Google sign-in successful');
            return AuthFirebase.getCurrentUser();
        } catch (error) {
            console.error('Google sign-in error:', error);
            alert(error.message);
            return null;
        }
    }
};

// Admin email list
const ADMIN_EMAILS = ['morad.karym@gmail.com'];

// Check if current user is admin
AuthFirebase.isAdmin = () => {
    const user = auth.currentUser;
    if (!user) return false;
    return ADMIN_EMAILS.includes(user.email.toLowerCase());
};

// For backwards compatibility with old Auth object
const Auth = AuthFirebase;
window.Auth = AuthFirebase;
