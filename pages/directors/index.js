import { useEffect, useState } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function DirectorListPage() {
  const [directors, setDirectors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/directors')
      .then((res) => res.json())
      .then((data) => setDirectors(data))
      .catch((err) => console.error('Failed to fetch directors:', err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Directors
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {directors.map((director) => (
          <Grid item key={director.id}>
            <Button variant="contained" onClick={() => router.push(`/directors/${director.id}`)}>
              {director.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
