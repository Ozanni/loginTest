import { MyFormTextFieldProps } from "../Elements/Inputs/MyFormTextField";
import { MyFormTextField } from "../Elements/Inputs/MyFormTextField";
import { FieldValues } from 'react-hook-form';
import { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

export function MyPasswordForm<T extends FieldValues>(props: MyFormTextFieldProps<T>) {
    const { name, control, MyTextFieldProps } = props;
    const [showPassword, setShowpassword] = useState<boolean>(false);

    const handleClickShowPassword = () => {
        setShowpassword(!showPassword);
    }

    return (
        <MyFormTextField
            name={name}
            control={control}
            MyTextFieldProps={{
                ...MyTextFieldProps,
                type: showPassword ? 'text' : 'password',
                InputProps: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />
    );
}