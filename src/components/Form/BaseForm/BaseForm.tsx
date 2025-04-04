import { createContext, FC, useState } from 'react';
import { IBaseFormProps, TFormState } from './BaseForm.types';
import { Box } from '@mui/material';

export const FormContext = createContext('formContext');

export const BaseForm: FC<IBaseFormProps> = ({ children }) => {
    const [formState, setFormState] = useState<TFormState>({ isValid: false });

    return (
        <form
            onSubmit={(e) => {
                const formData = new FormData(e.currentTarget);

                console.log(formState);
                console.log(e.currentTarget.checkValidity());

                setFormState((prev) => ({ ...prev, isValid: false }));

                for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                e.preventDefault();
            }}
        >
            <FormContext.Provider value="123">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>{children}</Box>
            </FormContext.Provider>
        </form>
    );
};
