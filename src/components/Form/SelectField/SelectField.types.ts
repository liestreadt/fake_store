export interface ISelectFieldProps {
    children: React.ReactNode;
    name: string;
    required?: boolean;
    defaultValue?: string | number;
}

export interface ISelectFieldOptionProps {
    value: string | number;
}
