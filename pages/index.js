import { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActionArea, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error('Failed to fetch movies:', err));
  }, []);

  const handleDirectorClick = () => {
    router.push('/directors');  // Navigate to the director list page
  };

  const handleGenreClick = () => {
    router.push('/genres');  // Navigate to the genre list page
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Movie House 🎬
      </Typography>

      {/* Director and Genre buttons */}
      <Grid container spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item>
          <Button variant="contained" onClick={handleDirectorClick}>
            Directors
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleGenreClick}>
            Genres
          </Button>
        </Grid>
      </Grid>

      {/* Movies Grid */}
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
