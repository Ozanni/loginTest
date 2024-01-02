import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { MySelect, MySelectProps } from "./MySelect";
import { ReactNode } from "react";
import { FormControl, InputLabel, InputLabelProps, styled } from "@mui/material";

const StyledInputLabel = styled(InputLabel)`
    &.Mui-focused {
        color: #0e8a72;
    }
`;

const mapSelectSizeToInputSize = <T,>(
    size?: MySelectProps<T>['size']
): InputLabelProps['size'] => {
    switch (size) {
        case 'medium':
            return 'normal';
        default:
            return size;
    }
}

export type MyFormSelectFieldProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    MySelectProps?: MySelectProps<T>;
    children?: ReactNode;
    required?: boolean;
}

export function MyFormSelectField<T extends FieldValues>(
    props: MyFormSelectFieldProps<T>
) {
    const size = props.MySelectProps?.size || 'small';
    const inputLabelSize: InputLabelProps['size'] = mapSelectSizeToInputSize(size);

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={( { field: { value, onChange } }) => (
                <FormControl fullWidth required={props?.required}>
                    <StyledInputLabel
                        size={inputLabelSize}
                    >
                        {props.MySelectProps?.label}
                    </StyledInputLabel>
                    <MySelect
                        size={size}
                        value={value}
                        onChange={onChange}
                        {...props.MySelectProps}
                    >
                        {props.children}
                    </MySelect>
                </FormControl>
            )}
        />
    )
}
