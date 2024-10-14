import React, { useState } from 'react';
import axios from 'axios';
import { Button, Snackbar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export default function BlogTextToSpeech({ blogContent }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handlePlay = async () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/blogs/blog/convert-to-speech", {
        text: blogContent
      });

      console.log(response.data.audioUrl);

      if (response.data.audioUrl) {
        const audioURL = `http://localhost:3000${response.data.audioUrl}  `;
        console.log(audioURL);
        const newAudio = new Audio(audioURL);
        newAudio.onended = () => setIsPlaying(false);
        newAudio.play();
        setAudio(newAudio);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setSnackbar({ open: true, message: 'Error playing audio. Please try again.' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        onClick={handlePlay}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </div>
  );
}