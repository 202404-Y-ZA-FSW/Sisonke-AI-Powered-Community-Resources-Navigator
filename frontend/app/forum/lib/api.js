import { posts } from './mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getPosts = async () => {
  await delay(500);
  return posts;
};

export const createPost = async (newPost) => {
  await delay(500);
  const post = {
    _id: Date.now().toString(),
    ...newPost,
    author: { username: 'CurrentUser', avatar: '/placeholder.svg?height=40&width=40' },
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString(),
  };
  posts.unshift(post);
  return post;
};

export const likePost = async (postId) => {
  await delay(200);
  const post = posts.find(p => p._id === postId);
  if (post) {
    post.likes += 1;
    return post.likes;
  }
  return 0;
};

export const addComment = async (postId, commentBody) => {
  await delay(300);
  const post = posts.find(p => p._id === postId);
  if (post) {
    const newComment = {
      _id: Date.now().toString(),
      body: commentBody,
      author: { username: 'CurrentUser', avatar: '/placeholder.svg?height=30&width=30' },
      createdAt: new Date().toISOString(),
    };
    post.comments.push(newComment);
    return newComment;
  }
  return null;
};