import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only once (important for hot reloads)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  try {
    const db = getDatabase(app);
    const snapshot = await get(ref(db, 'movies'));

    if (snapshot.exists()) {
      const movies = snapshot.val(); // This is an array (based on your structure)
      const movie = movies.find((m) => m.id === id);

      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    } else {
      res.status(404).json({ message: 'No movies found' });
    }
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
