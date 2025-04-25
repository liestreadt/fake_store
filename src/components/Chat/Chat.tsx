import { Box, Button } from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { IChatProps } from './Chat.types';

export const Chat: FC<IChatProps> = ({ wsConnection }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setIsChatOpen(true);
        }, 3000);
    }, []);

    wsConnection.onmessage = (e) => {
        if (!(e.data instanceof Blob)) {
            console.log(JSON.parse(e.data));
            setMessage('asd');
        }
    };

    useEffect(() => {
        if (isChatOpen) {
            setTimeout(() => {
                wsConnection.send(JSON.stringify({ event: 'chat-open', payload: null }));
            }, 2000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChatOpen]);

    const handleSendMessage = useCallback(() => {
        if (inputRef.current) {
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
                <Box>Title</Box>
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
                    <Box>{message}</Box>
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
