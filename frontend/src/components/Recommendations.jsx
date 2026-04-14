import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import axios from 'axios';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/recommendations/suggest-outfit');
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Outfit Recommendations
      </Typography>
      <Button
        variant="contained"
        onClick={fetchRecommendations}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? 'Getting Recommendations...' : 'Get Outfit Suggestion'}
      </Button>
      {recommendations.length > 0 && (
        <>
          <Alert severity="info" sx={{ mb: 3 }}>
            Here's a suggested outfit based on your closet items!
          </Alert>
          <Grid container spacing={3}>
            {recommendations.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.color && `Color: ${item.color}`}
                      {item.size && ` | Size: ${item.size}`}
                    </Typography>
                    {item.brand && (
                      <Typography variant="body2">Brand: {item.brand}</Typography>
                    )}
                    {item.description && (
                      <Typography variant="body2">{item.description}</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {recommendations.length === 0 && !loading && (
        <Typography variant="body1" color="text.secondary">
          Click the button above to get outfit recommendations. Make sure you have items in your closet first!
        </Typography>
      )}
    </Container>
  );
};

export default Recommendations;