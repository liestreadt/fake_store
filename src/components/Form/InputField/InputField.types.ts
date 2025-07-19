export interface IInputFieldProps {
    type: React.HTMLInputTypeAttribute;
    labelNode: React.ReactNode;
    name: string;
    initialValue?: string;
    required?: boolean;
}
