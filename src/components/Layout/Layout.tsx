import { FC } from 'react';
import { Link, Outlet } from 'react-router';
import styles from './Layout.module.css';
import { AppBar, Button, Container, Toolbar } from '@mui/material';

export const Layout: FC = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '1rem' }}>
            <AppBar sx={{ borderRadius: '10px' }} position="sticky" color="primary">
                <Toolbar sx={{ flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                    <h1 className={styles.mainHeading}>
                        <Link to="/">FAKE STORE</Link>
                    </h1>
                    <nav className={styles.navigationContainer}>
                        <div className={styles.mainNavigationWrapper}>
                            <Button color="info" variant="contained">
                                <Link to="/favorites">Favorites</Link>
                            </Button>
                            <Button color="info" variant="contained">
                                <Link to="/">Others</Link>
                            </Button>
                        </div>
                        <div>
                            <Button color="info" variant="contained">
                                <Link to="bucket">Bucket</Link>
                            </Button>
                        </div>
                    </nav>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Container>
    );
};
