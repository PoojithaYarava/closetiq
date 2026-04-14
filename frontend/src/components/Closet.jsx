import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const Closet = () => {
  const [clothes, setClothes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingClothes, setEditingClothes] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    color: '',
    size: '',
    brand: '',
    description: '',
  });

  useEffect(() => {
    fetchClothes();
    fetchCategories();
  }, []);

  const fetchClothes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/closet/clothes');
      setClothes(response.data);
    } catch (error) {
      console.error('Error fetching clothes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/closet/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleOpen = (clothesItem = null) => {
    if (clothesItem) {
      setEditingClothes(clothesItem);
      setFormData({
        name: clothesItem.name,
        category_id: clothesItem.category_id || '',
        color: clothesItem.color || '',
        size: clothesItem.size || '',
        brand: clothesItem.brand || '',
        description: clothesItem.description || '',
      });
    } else {
      setEditingClothes(null);
      setFormData({
        name: '',
        category_id: '',
        color: '',
        size: '',
        brand: '',
        description: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingClothes(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingClothes) {
        await axios.put(`http://localhost:8000/closet/clothes/${editingClothes.id}`, formData);
      } else {
        await axios.post('http://localhost:8000/closet/clothes', formData);
      }
      fetchClothes();
      handleClose();
    } catch (error) {
      console.error('Error saving clothes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/closet/clothes/${id}`);
      fetchClothes();
    } catch (error) {
      console.error('Error deleting clothes:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Closet
      </Typography>
      <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 3 }}>
        Add New Item
      </Button>
      <Grid container spacing={3}>
        {clothes.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {categories.find(c => c.id === item.category_id)?.name || 'N/A'}
                </Typography>
                {item.color && <Typography variant="body2">Color: {item.color}</Typography>}
                {item.size && <Typography variant="body2">Size: {item.size}</Typography>}
                {item.brand && <Typography variant="body2">Brand: {item.brand}</Typography>}
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpen(item)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingClothes ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Category"
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Size"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Brand"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingClothes ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Closet;