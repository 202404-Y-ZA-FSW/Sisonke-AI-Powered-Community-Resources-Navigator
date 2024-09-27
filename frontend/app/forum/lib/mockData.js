export const posts = [
    {
      _id: '1',
      title: 'Welcome to Sisonke Forum!',
      body: "We're excited to launch this new platform for our community. What topics would you like to discuss?",
      author: { username: 'Admin', avatar: '/placeholder.svg?height=40&width=40' },
      likes: 5,
      comments: [
        {
          _id: '101',
          body: 'Great to see this forum up and running!',
          author: { username: 'User1', avatar: '/placeholder.svg?height=30&width=30' },
          createdAt: '2024-09-01T10:00:00Z',
        },
      ],
      createdAt: '2024-09-01T09:00:00Z',
    },
    {
      _id: '2',
      title: 'Introducing ourselves',
      body: "Let's get to know each other! Share a bit about yourself and your interests.",
      author: { username: 'Moderator', avatar: '/placeholder.svg?height=40&width=40' },
      likes: 3,
      comments: [],
      createdAt: '2024-09-02T11:00:00Z',
    },
  ];
  