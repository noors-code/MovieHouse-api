import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';

export default function GenrePage() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    fetch(`/api/genres/${id}/movies`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error('Failed to fetch movies:', err));
  }, [id]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Movies in Genre
      </Typography>
      <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {movies.map((movie) => (
          <Grid item key={movie.id} sx={{ width: '100%', maxWidth: '350px' }}>
            <Card
              sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'darkblue',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                },
                padding: 2,
              }}
            >
              <CardActionArea onClick={() => router.push(`/movies/${movie.id}`)} sx={{ flex: 1 }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {movie.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Rating: {movie.rating} ⭐
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Year: {movie.releaseYear}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
