import { FC } from "react";
import { Link, Outlet } from "react-router";
import styles from './Layout.module.css';
import { AppBar, Button, Container, Toolbar } from "@mui/material";

export const Layout: FC = () => {
  return (
    <div>
      <Container>
        <AppBar position="sticky" color="primary">
          <Toolbar sx={{flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
            <h1 className={styles.mainHeading}>
              <Link to="/">Fake Store</Link>
            </h1>
            <nav className={styles.navigationContainer}>
              <div className={styles.mainNavigationWrapper}>
                <Button color="inherit">
                  <Link to="/favorites">Favorites</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/">Others</Link>
                </Button>
                </div>
              <div>
                <Button color="inherit">
                  <Link to='bucket'>Bucket</Link>
                </Button>
              </div>
            </nav>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Container>
    </div>
  )
};