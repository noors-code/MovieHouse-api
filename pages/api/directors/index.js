// pages/api/directors/index.js

import { db } from "../../../firebase";
import { ref, get } from "firebase/database";

export default async function handler(req, res) {
  try {
    const directorRef = ref(db, "directors");
    const directorSnapshot = await get(directorRef);

    if (!directorSnapshot.exists()) {
      return res.status(404).json({ error: "No directors found" });
    }

    const directors = [];
    directorSnapshot.forEach((childSnapshot) => {
      directors.push(childSnapshot.val());
    });

    return res.status(200).json(directors);
  } catch (error) {
    console.error("Error fetching directors:", error);
    return res.status(500).json({ error: "Failed to fetch directors" });
  }
}
