import { FC, memo, useContext, useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import { IInputFieldProps } from './InputField.types';
import styles from './InputField.module.css';
import { FormContext } from '../BaseForm/BaseForm';

export const InputFieldComponent: FC<IInputFieldProps> = ({ type, labelNode, name, initialValue, required }) => {
    const formContext = useContext(FormContext);
    const [isInputValid, setIsInputValid] = useState(true);

    useEffect(() => {
        // if
    }, [formContext.isValid]);

    const inputClassNames = useMemo(() => {
        console.log(`%c${'required'}`, 'color: yellow', required);
        console.log(`%c${'formContext.isValid'}`, 'color: orange', formContext.isValid);
        console.log(`%c${'!isInputValid'}`, 'color: orange', !isInputValid);

        if (!required) {
            return styles.input;
        }

        console.log(required);
        console.log(isInputValid);

        const invalidStyles = isInputValid ? '' : styles.inputInvalid;

        // required && formContext.isValid === false ? styles.inputInvalid : '';

        return `${styles.input} ${invalidStyles} ${required ? 'data-required' : ''}`;
    }, [formContext.isValid, isInputValid, required]);

    const handleInputChange = (event: React.ChangeEvent) => {
        const input = event.target as HTMLInputElement;

        if (!required) {
            return;
        }

        if (type === 'checkbox') {
            if (input.checked) {
                console.log(type);
                setIsInputValid(true);
            } else {
                setIsInputValid(false);
            }

            return;
        }

        if (input.value === '' || input.value.includes('<') || input.value.includes('>')) {
            //                    ^      Пример примитивного способа защиты от XSS      ^
            setIsInputValid(false);
        } else {
            setIsInputValid(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
            <label>{labelNode}</label>
            <input
                defaultValue={initialValue}
                onChange={handleInputChange}
                name={name}
                className={inputClassNames}
                type={type}
            />
        </Box>
    );
};

export const InputField = memo(InputFieldComponent);
