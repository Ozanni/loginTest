import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { MyTextField } from './MyTextField';
import { TextFieldProps } from '@mui/material';

export type MyFormTextFieldProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control?: Control<T>;
    MyTextFieldProps?: TextFieldProps;
}

export function MyFormTextField<T extends FieldValues>(props: MyFormTextFieldProps<T>) {
    const { name, control, MyTextFieldProps } = props;
    return (
        <MyTextField
            {...control?.register(name)}
            {...MyTextFieldProps}
        />
    );
}