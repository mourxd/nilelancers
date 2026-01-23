// Firebase Database Operations
// This file handles all database operations for jobs, applications, etc.

const FirebaseDB = {
    // ==================== JOBS ====================

    // Post a new job
    postJob: async (jobData) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                alert('You must be logged in to post a job');
                return null;
            }

            const job = {
                ...jobData,
                userId: user.uid,
                userEmail: user.email,
                userName: user.displayName || 'Anonymous',
                isLocal: true,
                source: 'NileLancers',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await db.collection('jobs').add(job);
            console.log('Job posted with ID:', docRef.id);

            return {
                id: docRef.id,
                ...job
            };
        } catch (error) {
            console.error('Error posting job:', error);
            alert(error.message);
            return null;
        }
    },

    // Get all jobs
    getAllJobs: async () => {
        try {
            const snapshot = await db.collection('jobs')
                .orderBy('createdAt', 'desc')
                .get();

            const jobs = [];
            snapshot.forEach(doc => {
                jobs.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return jobs;
        } catch (error) {
            console.error('Error fetching jobs:', error);
            return [];
        }
    },

    // Get user's posted jobs
    getUserJobs: async (userId) => {
        try {
            const snapshot = await db.collection('jobs')
                .where('userId', '==', userId)
                .get();

            const jobs = [];
            snapshot.forEach(doc => {
                jobs.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Sort client-side to avoid index requirement
            return jobs.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
                return dateB - dateA; // Descending
            });
        } catch (error) {
            console.error('Error fetching user jobs:', error);
            return [];
        }
    },

    // Update a job
    updateJob: async (jobId, updates) => {
        try {
            await db.collection('jobs').doc(jobId).update({
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('Job updated successfully');
            return true;
        } catch (error) {
            console.error('Error updating job:', error);
            return false;
        }
    },

    // Delete a job
    deleteJob: async (jobId) => {
        try {
            await db.collection('jobs').doc(jobId).delete();
            console.log('Job deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting job:', error);
            return false;
        }
    },

    // ==================== SAVED JOBS ====================

    // Save/unsave a job
    toggleSaveJob: async (jobData) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                alert('You must be logged in to save jobs');
                return false;
            }

            const savedJobRef = db.collection('savedJobs').doc(`${user.uid}_${jobData.id}`);
            const doc = await savedJobRef.get();

            if (doc.exists) {
                // Unsave
                await savedJobRef.delete();
                console.log('Job unsaved');
                return false; // Not saved anymore
            } else {
                // Save
                await savedJobRef.set({
                    userId: user.uid,
                    jobId: jobData.id,
                    jobData: jobData,
                    savedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log('Job saved');
                return true; // Now saved
            }
        } catch (error) {
            console.error('Error toggling save:', error);
            return false;
        }
    },

    // Get user's saved jobs
    getSavedJobs: async () => {
        try {
            const user = auth.currentUser;
            if (!user) return [];

            const snapshot = await db.collection('savedJobs')
                .where('userId', '==', user.uid)
                .orderBy('savedAt', 'desc')
                .get();

            const savedJobs = [];
            snapshot.forEach(doc => {
                savedJobs.push(doc.data().jobData);
            });

            return savedJobs;
        } catch (error) {
            console.error('Error fetching saved jobs:', error);
            return [];
        }
    },

    // Check if job is saved
    isJobSaved: async (jobId) => {
        try {
            const user = auth.currentUser;
            if (!user) return false;

            const doc = await db.collection('savedJobs').doc(`${user.uid}_${jobId}`).get();
            return doc.exists;
        } catch (error) {
            console.error('Error checking saved status:', error);
            return false;
        }
    },

    // ==================== APPLICATIONS ====================

    // Submit job application
    submitApplication: async (jobId, applicationData) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                alert('You must be logged in to apply');
                return null;
            }

            const application = {
                jobId: jobId,
                userId: user.uid,
                userName: user.displayName || 'Anonymous',
                userEmail: user.email,
                ...applicationData,
                status: 'pending',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await db.collection('applications').add(application);
            console.log('Application submitted with ID:', docRef.id);

            return {
                id: docRef.id,
                ...application
            };
        } catch (error) {
            console.error('Error submitting application:', error);
            alert(error.message);
            return null;
        }
    },

    // Get applications for a job
    getJobApplications: async (jobId) => {
        try {
            const snapshot = await db.collection('applications')
                .where('jobId', '==', jobId)
                .orderBy('createdAt', 'desc')
                .get();

            const applications = [];
            snapshot.forEach(doc => {
                applications.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return applications;
        } catch (error) {
            console.error('Error fetching applications:', error);
            return [];
        }
    },

    // Get user's applications
    getUserApplications: async () => {
        try {
            const user = auth.currentUser;
            if (!user) return [];

            const snapshot = await db.collection('applications')
                .where('userId', '==', user.uid)
                .orderBy('createdAt', 'desc')
                .get();

            const applications = [];
            snapshot.forEach(doc => {
                applications.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return applications;
        } catch (error) {
            console.error('Error fetching user applications:', error);
            return [];
        }
    },

    // Update application status
    updateApplicationStatus: async (applicationId, status) => {
        try {
            await db.collection('applications').doc(applicationId).update({
                status: status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('Application status updated');
            return true;
        } catch (error) {
            console.error('Error updating application:', error);
            return false;
        }
    }
};

// Make it globally available
window.FirebaseDB = FirebaseDB;
