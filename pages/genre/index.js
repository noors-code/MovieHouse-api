import { useEffect, useState } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function GenreListPage() {
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/genres')
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((err) => console.error('Failed to fetch genres:', err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Genres
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {genres.map((genre) => (
          <Grid item key={genre.id}>
            <Button variant="contained" onClick={() => router.push(`/genre/${genre.id}`)}>
              {genre.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
