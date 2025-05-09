// pages/api/genres/[id]/movies.js

import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const db = getDatabase(app);
    const snapshot = await get(ref(db, 'movies'));

    if (snapshot.exists()) {
      const movies = snapshot.val();
      const filteredMovies = movies.filter((movie) => movie.genreId === id);

      if (filteredMovies.length > 0) {
        res.status(200).json(filteredMovies);
      } else {
        res.status(404).json({ message: 'No movies found for this genre' });
      }
    } else {
      res.status(404).json({ message: 'No movies found' });
    }
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
