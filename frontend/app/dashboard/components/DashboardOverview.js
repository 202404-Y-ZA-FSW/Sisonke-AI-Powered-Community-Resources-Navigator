import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, CircularProgress, Button } from '@mui/material';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { styled, keyframes } from '@mui/material/styles';
import Businesses from './businesses';

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }
  50% { box-shadow: 0 0 25px rgba(99, 102, 241, 0.8); }
  100% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }
`;

const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.01)',
    boxShadow: `0 15px 25px rgba(0, 0, 0, 0.3)`,
    animation: `${pulseAnimation} 3s infinite`,
  },
}));

export default function DashboardOverview() {
  const [data, setData] = useState({
    blogs: [],
    events: [],
    forums: [],
    users: [],
    jobs: [],
    businesses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [blogsRes, eventsRes, forumsRes, usersRes, jobsRes, businessesRes] = await Promise.all([
        axios.get('http://localhost:5000/blogs/all'),
        axios.get('http://localhost:5000/events'),
        axios.get('http://localhost:5000/forums'),
        axios.get('http://localhost:5000/account/users'),
        axios.get('http://localhost:5000/jobs/all'),
        axios.get('http://localhost:5000/business/all')
      ]);

      setData({
        blogs: blogsRes.data,
        events: eventsRes.data,
        forums: forumsRes.data,
        users: usersRes.data.users,  
        jobs: jobsRes.data.jobs,
        businesses: businessesRes.data.businesses || businessesRes.data || [],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
      if (error.response && error.response.status === 404 && error.response.config.url.includes('/account/users')) {
        console.error('Failed to fetch users. Please check the users endpoint.');
      }
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#9966FF'];

  const pieData = [
    { name: 'Blogs', value: data.blogs.length },
    { name: 'Events', value: data.events.length },
    { name: 'Forums', value: data.forums.length },
    { name: 'Users', value: data.users.length },
    { name: 'Jobs', value: data.jobs.length },
    { name: 'Businesses', value: data.businesses.length },
  ];

  const barData = [
    { name: 'Blogs', count: data.blogs.length },
    { name: 'Events', count: data.events.length },
    { name: 'Forums', count: data.forums.length },
    { name: 'Users', count: data.users.length },
    { name: 'Jobs', count: data.jobs.length },
    { name: 'Businesses', count: data.businesses.length },
  ];

  const userCount = data.users.length;
  const activeUsers = data.users.filter(user => user.status === 'active').length;
  const restrictedUsers = data.users.filter(user => user.status === 'restricted').length;

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Overview Dashboard
      </Typography>
      <Button onClick={fetchData} variant="contained" color="primary" sx={{ mb: 2 }}>
        Refresh Data
      </Button>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <AnimatedCard>
              <CardContent>
                <Typography variant="h6">Data Overview (Pie Chart)</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </AnimatedCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedCard>
              <CardContent>
                <Typography variant="h6">Data Overview (Bar Chart)</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </AnimatedCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedCard>
              <CardContent>
                <Typography variant="h6">User Statistics</Typography>
                <Typography variant="h4" align="center" sx={{ my: 2 }}>
                  Total Users: {userCount}
                </Typography>
                <Typography variant="h6" align="center" sx={{ my: 1 }}>
                  Active Users: {activeUsers}
                </Typography>
                <Typography variant="h6" align="center" sx={{ my: 1 }}>
                  Restricted Users: {restrictedUsers}
                </Typography>
              </CardContent>
            </AnimatedCard>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
