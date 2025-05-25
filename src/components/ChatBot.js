import { useState, useEffect, useRef } from 'react';
import { askBot } from '../config/chatApi';
import { Box, TextField, IconButton, List, ListItem, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are an assistant for CrypSea: a crypto price tracker.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages.length, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const botReply = await askBot([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oops, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List
        ref={scrollRef}
        sx={{ flex: 1, overflowY: 'auto', mb: 1, pr: 1 }}
      >
        {messages.filter(m => m.role !== 'system').map((m, i) => (
          <ListItem key={i} sx={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <Box sx={{
              p: 1.5,
              bgcolor: m.role === 'user' ? 'primary.main' : 'grey.200',
              color: m.role === 'user' ? 'primary.contrastText' : 'text.primary',
              borderRadius: 1.5,
              maxWidth: '75%'
            }}>
              {m.content}
            </Box>
          </ListItem>
        ))}
        {loading && (
          <ListItem>
            <CircularProgress size={20} />
          </ListItem>
        )}
      </List>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          size="small"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me about crypto…"
        />
        <IconButton onClick={sendMessage} disabled={loading}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
