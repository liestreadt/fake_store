import { createContext, FC, useState } from 'react';
import { IBaseFormProps, TFormState } from './BaseForm.types';
import { Box } from '@mui/material';

export const FormContext = createContext<TFormState>({
    isValid: null,
});

export const BaseForm: FC<IBaseFormProps> = ({ children }) => {
    const [formState, setFormState] = useState<TFormState>({ isValid: null });

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formInputNodes = event.currentTarget.querySelectorAll('input');

        const formData = new FormData(event.currentTarget);

        setFormState((prev) => ({ ...prev, isValid: null }));

        let isValid = formState.isValid;

        for (let i = 0; i < formInputNodes.length; i++) {
            if (formInputNodes[i].classList.contains('data-required')) {
                if (formInputNodes[i].value) {
                    isValid = true;
                    continue;
                } else {
                    isValid = false;
                    break;
                }
            }
        }

        setFormState({ isValid });

        for (const object of formData) {
            console.log(object);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <FormContext.Provider value={formState}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>{children}</Box>
            </FormContext.Provider>
        </form>
    );
};
