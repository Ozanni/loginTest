import { styled, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

const StyledTextField = styled(TextField)`
  border-radius: 3px;
  background: #FAFAFA;
  .css-1h7020y-MuiFormLabel-root-MuiInputLabel-root {
    font-size: 13px;
    top: -2px;
  }
  & input, &label, &textarea {
    font-size: 13px;
    padding: 6px 14px;
  }
  & label.Mui-focused {
    color: #0e8a72;
  }
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border-color: #0e8a72;
  }
  & .MuiInputBase-root {
    &:hover {
      & > .MuiOutlinedInput-notchedOutline {
        border-color: #0e8a72;
      }
    }
  }
`;

export const MyTextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    return <StyledTextField ref={ref} {...props} />;
  }
);
