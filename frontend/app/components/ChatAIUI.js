"use client";

import React, { useState } from "react";
import {
  Fab,
  Paper,
  IconButton,
  Zoom,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const FloatingButton = styled(Fab)({
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  zIndex: 1000,
});

const ChatBox = styled(Paper)(({ isfullscreen }) => ({
  position: "fixed",
  bottom: isfullscreen ? 0 : "5rem",
  right: isfullscreen ? 0 : "2rem",
  width: isfullscreen ? "100%" : "500px",
  height: isfullscreen ? "100%" : "500px",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  zIndex: 999,
  transition: "all 0.3s ease-in-out",
  borderRadius: isfullscreen ? 0 : "16px",
  marginBottom: isfullscreen ? 0 : "2rem",
}));

const ChatHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
});

const ChatMessages = styled("div")({
  flexGrow: 1,
  overflowY: "auto",
  marginBottom: "1rem",
  display: "flex",
  flexDirection: "column",
  padding: "20px"
});

const Message = styled("div")(({ isUser }) => ({
  maxWidth: "70%",
  padding: "0.5rem 1rem",
  borderRadius: "1rem",
  marginBottom: "0.5rem",
  alignSelf: isUser ? "flex-end" : "flex-start",
  backgroundColor: isUser ? "#6c63ff" : "#4caf50",
  color: "white",
}));

const ChatInputContainer = styled("form")({
  display: "flex",
  alignItems: "center",
});

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isfullscreen, setIsFullScreen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isfullscreen);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim()) {
      setIsLoading(true);
      setError(null);
      const userMessage = { text: message, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");

      try {
        const conversationID = "66f8359b99453c114e5356d8";
        const response = await fetch(
          `http://localhost:5000/gemini/${conversationID}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage.text }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("API Response:", data); // Log the entire response for debugging

        if (
          data.messages &&
          Array.isArray(data.messages) &&
          data.messages.length > 0
        ) {
          const newMessages = data.messages.map((msg) => ({
            text: msg.text,
            isUser: msg.sender !== "Gemini",
          }));
          setMessages((prev) => [...prev, ...newMessages]);
        } else {
          console.error("Unexpected response format:", data);
          throw new Error(
            'Invalid response format. Expected "messages" array.'
          );
        }
      } catch (err) {
        setError(`Failed to send message: ${err.message}`);
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <FloatingButton
        sx={{
          backgroundColor: "#6c63ff",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#6c63ff" },
        }}
        onClick={handleToggle}
      >
        <ChatIcon />
      </FloatingButton>
      <Zoom in={isOpen}>
        <ChatBox elevation={3} isfullscreen={isfullscreen}>
          <ChatHeader>
            <h3>
              SIS<span style={{ color: "#6c63ff" }}>O</span>NKE AI
            </h3>
            <div>
              <IconButton onClick={handleFullScreenToggle} size="small">
                {isfullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
              <IconButton onClick={handleToggle} size="small">
                <CloseIcon />
              </IconButton>
            </div>
          </ChatHeader>
          <ChatMessages>
            {messages.map((msg, index) => (
              <Message key={index} isUser={msg.isUser}>
                {msg.text}
              </Message>
            ))}
            {isLoading && (
              <Message isUser={false}>
                <CircularProgress size={20} />
              </Message>
            )}
            {error && (
              <Message isUser={false}>
                <span style={{ color: "red" }}>{error}</span>
              </Message>
            )}
          </ChatMessages>
          <ChatInputContainer onSubmit={handleSubmit}>
            <input
              value={message}
              onChange={handleMessageChange}
              name="message"
              placeholder="Type a message..."
              style={{
                padding: "10px 30px",
                borderRadius: "16px",
                border: "2px solid #6c63ff",
                width: "100%",
              }}
            />
            <IconButton
              sx={{
                backgroundColor: "#6c63ff",
                marginLeft: "0.5rem",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#6c63ff",
                },
              }}
              type="submit"
            >
              {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </ChatInputContainer>
        </ChatBox>
      </Zoom>
    </>
  );
}