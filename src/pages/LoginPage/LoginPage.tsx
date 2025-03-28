import { FC } from 'react';
import { InputField } from '../../components/InputField/InputField';
import { EInputTypes } from '../../components/InputField/InputField.types';

export const LoginPage: FC = () => {
    return (
        <main>
            <form>
                <InputField type={EInputTypes.TEXT} labelNode={'Text'} />
                <InputField type={EInputTypes.CHECKBOX} labelNode={'Check'} />
                <InputField type={EInputTypes.PASSWORD} labelNode={'Pass'} />
            </form>
        </main>
    );
};
