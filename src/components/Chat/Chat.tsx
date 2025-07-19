import { Box, Button, IconButton } from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { IChatProps, TWsData } from './Chat.types';
import ClearIcon from '@mui/icons-material/Clear';

export const Chat: FC<IChatProps> = ({ wsConnection }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState<string>();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setIsChatOpen(true);
        }, 3000);
    }, []);

    wsConnection.onmessage = (e) => {
        if (!(e.data instanceof Blob)) {
            const wsData: TWsData = JSON.parse(e.data);

            if (wsData.event === 'chat-clear') {
                setMessage(wsData.message);
                return;
            }

            setMessage((prev) => (prev ? `${prev}\n${wsData.message}` : wsData.message));
        }
    };

    useEffect(() => {
        if (isChatOpen) {
            wsConnection.send(JSON.stringify({ event: 'chat-open', payload: null }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChatOpen]);

    const handleSendMessage = useCallback(() => {
        if (inputRef.current) {
            if (inputRef.current.value === '/clear') {
                wsConnection.send(JSON.stringify({ event: 'chat-clear', payload: '' }));
                inputRef.current.value = '';
                return;
            }

            wsConnection.send(JSON.stringify({ event: 'chat-message', payload: inputRef.current.value }));
            inputRef.current.value = '';
        }
    }, [wsConnection]);

    const handleInputEnterKeyPress = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleSendMessage();
            }
        },
        [handleSendMessage],
    );

    const handleChatClose = useCallback(() => {
        setIsChatOpen(false);
        wsConnection.close();
    }, [wsConnection]);

    return (
        <article
            style={{
                visibility: isChatOpen ? 'visible' : 'hidden',
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '30%',
                height: '40%',
                display: 'flex',
                transition: '3sec',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: '#f3f',
                    borderRadius: '1rem 0 0 0',
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    <Box sx={{ padding: ' 0.5rem' }}>Чат технической поддержки</Box>
                    <Box sx={{ position: 'absolute', top: 0, right: -55 }}>
                        <IconButton onClick={handleChatClose}>
                            <ClearIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                        width: '80%',
                        background: '#fff',
                        borderRadius: '0.5rem',
                    }}
                >
                    <Box sx={{ height: '100%', whiteSpace: 'pre-wrap', padding: '0.3rem' }}>{message}</Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem', padding: '0.3rem' }}>
                    <input onKeyDown={handleInputEnterKeyPress} onSubmit={handleSendMessage} ref={inputRef} />
                    <Button onClick={handleSendMessage} variant="contained" color="secondary" size="small">
                        <SendIcon fontSize="small" />
                    </Button>
                </Box>
            </Box>
        </article>
    );
};
