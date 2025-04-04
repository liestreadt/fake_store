import { FC, useContext } from 'react';
import { Box } from '@mui/material';
import { IInputFieldProps } from './InputField.types';
import styles from './InputField.module.css';
import { FormContext } from '../BaseForm/BaseForm';

export const InputField: FC<IInputFieldProps> = ({ type, labelNode, name, required }) => {
    const formContext = useContext(FormContext);

    console.log(formContext);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
            <label>{labelNode}</label>
            <input required={required} name={name} className={styles.input} type={type} />
        </Box>
    );
};
