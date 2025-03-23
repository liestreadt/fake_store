import { IconButtonProps } from '@mui/material';
import { ICardItem } from '../../store/mainStore';

export interface ICardProps {
    item: ICardItem;
}

export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
