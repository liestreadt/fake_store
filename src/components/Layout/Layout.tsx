import { FC } from 'react';
import { Link, Outlet } from 'react-router';
import styles from './Layout.module.css';
import { AppBar, Box, Container, IconButton, Toolbar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const Layout: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                paddingBottom: '1rem',
            }}
        >
            <AppBar sx={{ borderRadius: '10px' }} position="sticky" color="primary">
                <Toolbar sx={{ flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                    <h1 className={styles.mainHeading}>
                        <Link to="/">FAKE STORE</Link>
                    </h1>
                    <nav className={styles.navigationContainer}>
                        <Box className={styles.mainNavigationWrapper}></Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                            }}
                        >
                            <Link to="basket">
                                <IconButton>
                                    <ShoppingCartIcon />
                                </IconButton>
                            </Link>
                            <Link to="login">
                                <IconButton>
                                    <AccountBoxIcon />
                                </IconButton>
                            </Link>
                        </Box>
                    </nav>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Container>
    );
};
