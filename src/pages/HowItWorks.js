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
# Error Tracking System for Stimuler

## Overview

This is a documentation which provides a detailed explanation of the implemented solution for the Stimuler Conversational AI tutor's exercise recommendation system. It compares this solution with alternative approaches and analyzes its effectiveness in addressing the problem statement.

## Deployment
- Backend: Hosted on Render. [Github Link](https://github.com/Pranav-1100/Stimuler-PYTHON)
- Frontend: [Link To Showcase](https://stimuler-frontend.vercel.app) Accessible at Vercel. (Note: Since Render uses a free plan, it may take a few seconds to start the backend server). [Github Link](https://github.com/Pranav-1100/Stimuler-Frontend)

## Problem Statement Summary

- Track user errors across four categories: Grammar, Vocabulary, Pronunciation, and Fluency/Content
- Handle 100s of millions of conversations
- Provide low-latency (<200 ms) responses for real-time interactions
- Return top N most frequent errors sorted by frequency

## Implemented Solution: Sorted Array Tracker with HashMap

### Key Parts
1. Sorted Array for Top N Errors: Maintains a sorted list of the most frequent errors.
2. HashMap (Dictionary) for Error Tracking: Counts occurrences of each error for quick access.
3. Binary Search for Efficient Updates: Ensures that errors are updated or inserted efficiently into the sorted array.

### Flow

1. **User Interaction:**
   - User sends a message to the app
   - System analyzes the message for errors

2. **Error Update:**
   - For each identified error API for update-error is hit and it:
     a. Increment error count in the hash map
     b. Use binary search to find the correct position in the sorted array
     c. Update or insert the error in the sorted array

3. **Exercise Recommendation:**
   - When recommendation is needed:
     a. Retrieve top N errors from the sorted array and show them
     b. Generate exercise based on these errors(Next Steps not to be implemented as per problem statement)

4. **Data Storage:**
   - Cache frequently accessed user data for faster retrieval

### Time Complexities

- Update Error: O(log N) average case
- Get Top N Errors: O(1)

### Estimated Performance (for 1 million errors)

- Update: ~0.1-1 ms
- Retrieval: <0.1 ms

### Pros

- Very fast retrieval of top N errors
- Good balance between update and retrieval speed

### Scalability

- Scales well for retrieving top errors

## Database Choice: MongoDB

### Reasons for Choosing MongoDB

1. **Schema Flexibility:** MongoDB's document-based structure allows for easy adaptation to changing error categories and subcategories without requiring schema migrations.

2. **Scalability:** MongoDB supports horizontal scaling through sharding, which is crucial for handling the potential billions of records mentioned in the problem statement.

3. **Performance:** MongoDB's indexing capabilities, especially for nested fields, allow for fast queries on complex data structures like our error tracking system.

4. **Rich Query Language:** MongoDB's query language is powerful enough to perform complex aggregations and sorting operations, which are essential for our error tracking and analysis.

5. **Real-time Data:** MongoDB's real-time data processing capabilities align well with the low-latency requirements (<200 ms) of the system.


### Proposed Schema Design

\`\`\`javascript
{
  _id: ObjectId,
  user_id: String,
  error_map: {
    "Grammar:Verb Tense": 10,
    "Vocabulary:Word Choice": 5,
    // ... other error types and counts
  },
  sorted_errors: [
    {errorCategory: "Grammar", errorSubCategory: "Verb Tense", errorFrequency: 10},
    {errorCategory: "Vocabulary", errorSubCategory: "Word Choice", errorFrequency: 5},
    // ... top N errors
  ],
  last_updated: Timestamp
}
\`\`\`


## Comparison with Alternative Approaches

### 1. Simple Sorted Array

#### How it works
- Maintains a fully sorted array of all errors
- Linear search for updates, re-sort after each update

#### Time Complexities
- Update Error: O(N)
- Get Top N Errors: O(1)

#### Estimated Performance (for 1 million errors)
- Update: ~10-100 ms
- Retrieval: <0.1 ms

#### Pros
- Very fast retrieval of top N errors
- Simple implementation

#### Cons
- Slow updates, especially for large datasets
- High memory usage for storing all errors

#### Scalability
- Does not scale well for large datasets or frequent updates

### 2. Max Heap

#### How it works
- Maintains a max heap of all errors
- Heap property ensures most frequent errors are at the top

#### Time Complexities
- Update Error: O(log N)
- Get Top N Errors: O(N log N)

#### Estimated Performance (for 1 million errors)
- Update: ~0.1-1 ms
- Retrieval: ~10-100 ms

#### Pros
- Efficient updates
- Naturally keeps most frequent errors at the top

#### Cons
- Slower retrieval of top N errors, especially for large N
- Higher memory usage compared to Sorted Array Tracker

#### Scalability
- Scales well for updates
- Retrieval performance degrades with larger datasets

## Why Sorted Array Tracker is Better

1. **Balanced Performance:** Offers a good balance between update and retrieval speeds, crucial for a real-time system.

2. **Meets Latency Requirements:** Both update and retrieval operations are well within the 200 ms requirement, even for large datasets.

3. **Scalability:** Scales better than a simple sorted array and offers faster top N retrieval than a max heap. Redis helps with caching and quick retrieval of errors

4. **Adaptability:** Can easily adapt to changing error patterns over time.

## Addressing the Problem Statement

1. **Low Latency Requirement (<200 ms):**
   Sorted Array Tracker meets this requirement comfortably for both updates and retrievals, even with large datasets.

2. **Scalability for 100s of millions of conversations:**
   - Scales well, especially for retrieval operations.
   - May need additional optimizations for extreme scales (billions of records).

3. **Top N most frequent errors:**
   Efficiently maintains and retrieves the top N errors, exactly as required.

4. **Dynamic adaptation:**
   Adapts well to changing error patterns over time.

## Conclusion

The Sorted Array Tracker solution effectively addresses the problem statement's requirements. It provides a scalable, low-latency system for tracking and retrieving top errors, which is crucial for the exercise recommendation system.
For a live demo, you can access the frontend hosted on Vercel: [Stimuler Frontend](https://stimuler-frontend.vercel.app). The backend is hosted on Render, a free plan, so it might take a few seconds to start.

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