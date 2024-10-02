import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const markdownContent = `
# How Stimuler Works

Stimuler is an innovative platform designed to help language learners identify and track their most common errors. Here's how it works:

## 1. Error Logging

Users can log their language errors in four main categories:

- Grammar
- Vocabulary
- Pronunciation
- Fluency

## 2. Error Analysis

The system analyzes the logged errors and provides insights on:

- Most frequent error types
- Progress over time
- Suggested areas for improvement

## 3. Visualizations

Stimuler offers various visualizations to help users understand their error patterns:

- Bar charts showing error distribution
- Line graphs tracking progress over time
- Heat maps highlighting problem areas

## 4. Personalized Recommendations

Based on the error analysis, Stimuler provides personalized recommendations for:

- Study materials
- Practice exercises
- Learning strategies

## 5. Progress Tracking

Users can track their progress and see how their error patterns change over time, motivating them to continue improving their language skills.

By consistently using Stimuler, language learners can focus their efforts on the areas that need the most improvement, leading to more efficient and effective language acquisition.
`;

function HowItWorks() {
  const [content, setContent] = useState('');

  useEffect(() => {
    // In a real application, you might fetch this content from an API
    setContent(markdownContent);
  }, []);

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h3" gutterBottom>
            How It Works
          </Typography>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default HowItWorks;