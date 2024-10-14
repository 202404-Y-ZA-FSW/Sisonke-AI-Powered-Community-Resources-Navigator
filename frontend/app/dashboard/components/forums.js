'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function Forums() {
  const [forums, setForums] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/forums");
      if (response.status === 200) {
        setForums(response.data);
      } else {
        setError("Failed to fetch forums.");
      }
    } catch (err) {
      setError("Error fetching forums. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/account/users");
        console.log('Users response:', response.data); // Log the response data
        if (Array.isArray(response.data)) {
            setUsers(response.data);
        } else if (response.data.users && Array.isArray(response.data.users)) {
            setUsers(response.data.users); // Adjust based on the expected structure
        } else {
            setError("Failed to fetch users. Expected an array.");
        }
    } catch (err) {
        setError("Error fetching users. Please try again later.");
    }
};

  const removeForum = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/forums/${id}`);
      if (response.status === 200) {
        alert("Forum deleted successfully");
        setForums((prevForums) => prevForums.filter((forum) => forum._id !== id));
      } else {
        setError("Failed to delete forum");
      }
    } catch (error) {
      setError("Error deleting forum. Please try again.");
    }
  };

  const getUsernameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : "Unknown";
  };

  const filteredForums = forums.filter(
    (forum) =>
      (forum.title && forum.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (getUsernameById(forum.author.username) && getUsernameById(forum.author.username).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalForums = forums.length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Forum Statistics Section */}
      <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader title={<Typography variant="h6" align="center">Forum Statistics</Typography>} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" align="center">Total Forums: {totalForums}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Forum Search Section */}
      <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader title={<Typography variant="h6" align="center">Search Forums</Typography>} />
        <CardContent>
          <InputBase
            placeholder="Search by title or username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              padding: "12px 15px",
              border: "1px solid #ddd",
              borderRadius: 2,
              boxShadow: 1,
              transition: "border-color 0.3s ease",
              "&:focus": { borderColor: "#007BFF" },
            }}
          />
        </CardContent>
      </Card>

      {/* Forum Management Table */}
      <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader title={<Typography variant="h6" align="center">Forum Management</Typography>} />
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="forum management table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredForums.length > 0 ? (
                    filteredForums.map((forum) => (
                      <TableRow key={forum._id}>
                        <TableCell>{forum.title}</TableCell>
                        <TableCell>{getUsernameById(forum.author.username)}</TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => removeForum(forum._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">No forums found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Snackbar for errors */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Container>
  );
}
