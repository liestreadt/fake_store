import { FC } from 'react';
import { IInputFieldProps } from './InputField.types';

export const InputField: FC<IInputFieldProps> = ({ type, labelNode }) => {
    return (
        <div>
            <label>
                {labelNode}
                <input type={type} />
            </label>
        </div>
    );
};
