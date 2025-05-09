import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Button } from '@mui/material';

export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // router.query is empty on first render
    fetch(`/api/movies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Movie not found');
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 4, display: 'block', mx: 'auto' }} />;
  if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={() => router.back()} sx={{ mb: 2 }}>
        ← Back
      </Button>
      <Typography variant="h4" gutterBottom>{movie.title}</Typography>
      <Typography variant="body1" paragraph>{movie.description}</Typography>
      <Typography variant="body2">Year: {movie.releaseYear}</Typography>
      <Typography variant="body2">Rating: {movie.rating} ⭐</Typography>
    </Container>
  );
}
