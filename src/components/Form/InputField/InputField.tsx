import { FC, memo, useContext, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { IInputFieldProps } from './InputField.types';
import styles from './InputField.module.css';
import { FormContext } from '../BaseForm/BaseForm';

export const InputFieldComponent: FC<IInputFieldProps> = ({ type, labelNode, name, required }) => {
    const formContext = useContext(FormContext);

    const [isPristine, setIsPristine] = useState(true);

    const inputClassNames = useMemo(() => {
        const invalidStyles =
            (required && formContext.isValid !== null && !formContext.isValid) || isPristine
                ? // ^ Нужно сделать нормальное условие
                  styles.inputInvalid
                : '';

        console.log(`%c${'invalidStyles'}`, 'color: yellow', !isPristine);

        return `${styles.input} ${invalidStyles} ${required ? 'data-required' : ''}`;
    }, [formContext.isValid, isPristine, required]);

    const handleInputChange = () => {
        if (isPristine) {
            setIsPristine(false);
        }
    };

    console.log('isFormValid', formContext.isValid);

    // ! Способы защиты от XSS в полях input
    // ! Оставлять поле невалидным, если в нём используются символы < или >

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
            <label>{labelNode}</label>
            <input onChange={handleInputChange} name={name} className={inputClassNames} type={type} />
            {/* // ^ Вынести селект в отдельный компонент */}
        </Box>
    );
};

export const InputField = memo(InputFieldComponent);
