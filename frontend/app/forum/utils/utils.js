import axios from 'axios';

const API_URL = 'http://localhost:5000/forums';

// LIKE A FORUM POST
export const likePost = async (forumId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/${forumId}/like`, { userId });
    
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    if (error.response && error.response.status === 400) {
      throw new Error('You have already liked this post');
    }
    
    throw new Error('Failed to like the post. Please try again.');
  }
};

// GET ALL LIKES FOR THE FORUM POST
export const getLikes = async (forumId) => {
  try {
    const response = await axios.get(`${API_URL}/${forumId}/likes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching likes:', error);
    throw new Error('Failed to fetch likes. Please try again.');
  }
};