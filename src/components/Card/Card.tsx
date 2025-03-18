import { FC } from "react";
import styles from './Card.module.css';
import { Card as MuiCard } from '@mui/material';

export const Card: FC = () => {
  return (
    <article>
      <MuiCard className={styles.cardWrapper} variant="outlined">
        <div>Title</div>
        <div>Image</div>
        <div>Body</div>
        <div>Footer</div>
      </MuiCard>
    </article>
  );
};