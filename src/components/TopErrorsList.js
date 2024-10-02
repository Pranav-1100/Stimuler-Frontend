import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/system';

const StyledChip = styled(Chip)(({ theme, color }) => ({
  backgroundColor: color,
  color: theme.palette.getContrastText(color),
}));

function TopErrorsList({ errors }) {
  const getColorForCategory = (category) => {
    const colors = {
      Vocabulary: '#4CAF50',
      Grammar: '#2196F3',
      Fluency: '#FFC107',
      Pronunciation: '#FF5722'
    };
    return colors[category] || '#9E9E9E';
  };

  return (
    <Box>
      {errors.length > 0 ? (
        <List>
          {errors.map((error, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                      {error.error_subcategory}
                    </Typography>
                    <StyledChip 
                      label={error.error_category}
                      color={getColorForCategory(error.error_category)}
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Frequency: {error.count}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No errors to display.</Typography>
      )}
    </Box>
  );
}

export default TopErrorsList;