"use client";

import React, { useState } from "react";
import { Fab, Paper, TextField, IconButton, Zoom } from "@mui/material";
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

const ChatBox = styled(Paper)(({ isFullScreen }) => ({
  position: "fixed",
  bottom: isFullScreen ? 0 : "5rem",
  right: isFullScreen ? 0 : "2rem",
  width: isFullScreen ? "100%" : "300px",
  height: isFullScreen ? "100%" : "400px",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  zIndex: 999,
  transition: "all 0.3s ease-in-out",
  borderRadius: isFullScreen ? 0 : "16px",
  marginBottom: isFullScreen ? 0 : "2rem",
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
});

const Message = styled("div")(({ isUser }) => ({
  maxWidth: "70%",
  padding: "0.5rem 1rem",
  borderRadius: "1rem",
  marginBottom: "0.5rem",
  alignSelf: isUser ? "flex-end" : "flex-start",
  backgroundColor: isUser ? "#1976d2" : "#4caf50",
  color: "white",
}));

const ChatInputContainer = styled("form")({
  display: "flex",
  alignItems: "center",
});

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true }]);
      // Simulate a response (you can replace this with actual API call)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is a sample response.", isUser: false },
        ]);
      }, 1000);
      setMessage("");
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
        <ChatBox elevation={3} isFullScreen={isFullScreen}>
          <ChatHeader>
            <h3>
              SIS<span style={{ color: "#6c63ff" }}>O</span>NKE AI
            </h3>
            <div>
              <IconButton onClick={handleFullScreenToggle} size="small">
                {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
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
          </ChatMessages>
          <ChatInputContainer onSubmit={handleSubmit}>
            <input
              value={message}
              onChange={handleMessageChange}
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
              <SendIcon />
            </IconButton>
          </ChatInputContainer>
        </ChatBox>
      </Zoom>
    </>
  );
}
