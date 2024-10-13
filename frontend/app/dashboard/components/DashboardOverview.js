import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent } from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function DashboardOverview() {
  const [data, setData] = useState({
    blogs: [],
    businesses: [],
    events: [],
    forums: [],
    jobs: [],
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);  
      const [blogsRes, businessesRes, eventsRes, forumsRes, usersRes] = await Promise.all([
        axios.get('http://localhost:5000/blogs'),
        axios.get('http://localhost:5000/businesses/all'),
        axios.get('http://localhost:5000/events'),
        axios.get('http://localhost:5000/forums/${id}'),
        axios.get('http://localhost:5000/account/users'),
      ]);

      setData({
        blogs: blogsRes.data,
        businesses: businessesRes.data,
        events: eventsRes.data,
        forums: forumsRes.data,
        users: usersRes.data,
      });
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];


  const pieData = [
    { name: 'Blogs', value: data.blogs.length },
    { name: 'Businesses', value: data.businesses.length },
    { name: 'Events', value: data.events.length },
    { name: 'Forums', value: data.forums.length },
    { name: 'Users', value: data.users.length },
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Overview Dashboard
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {/* Pie Chart */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6">Data Overview (Pie Chart)</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
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
          </Card>

          {/* Bar Chart */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6">Blogs and Businesses (Bar Chart)</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={pieData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6">User Growth (Line Chart)</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={data.users.map((user, index) => ({
                    name: `User ${index + 1}`,
                    value: index + 1,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
