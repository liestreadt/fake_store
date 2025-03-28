/* eslint-disable no-unused-vars */
export enum EInputTypes {
    TEXT = 'TEXT',
    PASSWORD = 'PASSWORD',
    CHECKBOX = 'CHECKBOX',
}

export interface IInputFieldProps {
    type: EInputTypes;
    labelNode: React.ReactNode;
}
