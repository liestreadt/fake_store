import { Box } from '@mui/material';
import { FC } from 'react';
import { ISelectFieldProps, ISelectFieldOptionProps } from './SelectField.types';
import styles from './SelectField.module.css';

export const SelectField: FC<ISelectFieldProps> = ({ children, name, labelNode, required, defaultValue }) => {
    console.log(required);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
            <label>{labelNode}</label>
            <select className={styles.select} defaultValue={defaultValue} name={name}>
                {children}
            </select>
        </Box>
    );
};

export const SelectFieldOption: FC<ISelectFieldOptionProps> = ({ value }) => {
    return <option value={value}>{value}</option>;
};
