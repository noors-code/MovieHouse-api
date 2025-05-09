import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, Typography, List, ListItem, ListItemText, CircularProgress, Box, Button } from "@mui/material";

const DirectorPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [director, setDirector] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    // Reset state on every id change
    setLoading(true);
    setError(null);
    setDirector(null);
    setMovies([]);

    // Fetch Director Details
    const fetchDirector = async () => {
      try {
        const res = await fetch(`/api/directors/${id}`);
        if (!res.ok) throw new Error("Failed to fetch director");
        const data = await res.json();
        setDirector(data);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch Movies by Director
    const fetchMovies = async () => {
      try {
        const res = await fetch(`/api/directors/${id}/movies`);
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      }
    };

    Promise.all([fetchDirector(), fetchMovies()]).finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {director && (
        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <Typography variant="h4">{director.name}</Typography>
            <Typography variant="body1" color="text.secondary">{director.biography}</Typography>
          </CardContent>
        </Card>
      )}

      {movies.length > 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>Movies</Typography>
            <List>
              {movies.map((movie) => (
                <ListItem key={movie.id}>
                  <ListItemText
                    primary={movie.title}
                    secondary={`${movie.releaseYear} - Rating: ${movie.rating}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" align="center">No movies found for this director.</Typography>
      )}

      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Button variant="contained" onClick={() => router.push("/")} color="primary">Back to Home</Button>
      </Box>
    </Box>
  );
};

export default DirectorPage;
