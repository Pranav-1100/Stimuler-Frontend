import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import axios from 'axios';

function ErrorForm() {
  const [errorCategory, setErrorCategory] = useState('');
  const [errorSubcategory, setErrorSubcategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://stimuler-python.onrender.com/update-error', 
        { error_category: errorCategory, error_subcategory: errorSubcategory },
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
      );
      setErrorCategory('');
      setErrorSubcategory('');
      alert('Error added successfully');
    } catch (error) {
      console.error('Error adding:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        select
        margin="normal"
        required
        fullWidth
        id="errorCategory"
        label="Error Category"
        value={errorCategory}
        onChange={(e) => setErrorCategory(e.target.value)}
      >
        <MenuItem value="Grammar">Grammar</MenuItem>
        <MenuItem value="Vocabulary">Vocabulary</MenuItem>
        <MenuItem value="Pronunciation">Pronunciation</MenuItem>
        <MenuItem value="Fluency">Fluency</MenuItem>
      </TextField>
      <TextField
        margin="normal"
        required
        fullWidth
        id="errorSubcategory"
        label="Error Subcategory"
        value={errorSubcategory}
        onChange={(e) => setErrorSubcategory(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Error
      </Button>
    </Box>
  );
}

export default ErrorForm;