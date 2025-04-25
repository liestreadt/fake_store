import { Box } from '@mui/material';
import { FC } from 'react';
import { ISelectFieldProps, ISelectFieldOptionProps } from './SelectField.types';

export const SelectField: FC<ISelectFieldProps> = ({ children, name, required, defaultValue }) => {
    return (
        <Box>
            <select defaultValue={defaultValue} name={name}>
                {children}
            </select>
            {required && 'required'}
        </Box>
    );
};

export const SelectFieldOption: FC<ISelectFieldOptionProps> = ({ value }) => {
    return <option value={value}>{value}</option>;
};
