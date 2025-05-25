import React, { useState } from 'react';
import { Fab, Dialog, Slide, IconButton, Typography, Badge, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Chatbot from './ChatBot';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    document.activeElement?.blur();
    setOpen(o => !o);
  };

  return (
    <>
      <Badge
        variant="dot"
        color="success"
        overlap="circular"
        invisible={!open}
        sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: theme => theme.zIndex.tooltip + 1 }}
      >
        <Fab
          color="primary"
          onClick={handleToggle}
          aria-label={open ? 'Close chat' : 'Open chat'}
          sx={{ width: 64, height: 64 }}
        >
          {open ? <CloseIcon /> : <ChatIcon />}
        </Fab>
      </Badge>

      <Box
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 24,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: 12,
          boxShadow: 1
        }}
      >
        AI Chat Box
        <Box
          component="span"
          sx={{ ml: 0.5, width: 8, height: 8, bgcolor: 'success.main', borderRadius: '50%' }}
        />
      </Box>

      <Dialog
        open={open}
        onClose={handleToggle}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          sx: {
            position: 'fixed',
            bottom: 130,
            right: 24,
            margin: 0,
            width: '60vw',
            maxWidth: 600,
            height: '70vh',
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'primary.main',
            color: 'white',
            p: 1
          }}
        >
          <Typography variant="subtitle1">CrypSea Chatbot</Typography>
          <IconButton onClick={handleToggle} size="small" sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 1, height: 'calc(100% - 48px)', overflowY: 'auto' }}>
          <Chatbot />
        </Box>
      </Dialog>
    </>
  );
}
