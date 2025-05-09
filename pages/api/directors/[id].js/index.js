// pages/api/directors/[id].js

import { db } from "../../../firebase";
import { ref, get } from "firebase/database";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    // Reference to the "directors" node
    const directorRef = ref(db, "directors");
    const directorSnapshot = await get(directorRef);

    if (!directorSnapshot.exists()) {
      return res.status(404).json({ error: "Directors not found" });
    }

    let directorData = null;
    directorSnapshot.forEach((childSnapshot) => {
      const director = childSnapshot.val();
      console.log("Director:", director); // Log director details
      if (director.id === id) {
        directorData = director;
      }
    });

    if (!directorData) {
      return res.status(404).json({ error: "Director not found" });
    }

    console.log("Director Data:", directorData); // Log the final director data

    // Reference to the "movies" node
    const movieRef = ref(db, "movies");
    const movieSnapshot = await get(movieRef);

    if (!movieSnapshot.exists()) {
      return res.status(404).json({ error: "No movies found" });
    }

    const movies = [];
    movieSnapshot.forEach((childSnapshot) => {
      const movie = childSnapshot.val();
      console.log("Movie:", movie); // Log each movie
      if (movie.directorId === id) {
        movies.push(movie);
      }
    });

    if (movies.length === 0) {
      return res.status(404).json({ error: "No movies found for this director" });
    }

    // Return director details and movies
    return res.status(200).json({
      director: directorData,
      movies: movies,
    });

  } catch (error) {
    console.error("Error fetching director and movies:", error);
    return res.status(500).json({ error: "Failed to fetch director and movies" });
  }
}
