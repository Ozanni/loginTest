import { Button, styled, ButtonProps } from '@mui/material';
import * as React from 'react';

const StyledButton = styled(Button)`
    min-width: 100px;
    box-shadow: 'none';
    border-radius: 3px;
    font-weight: 400;
    padding: 0;
    color: ${(props) => props.variant === 'contained' ? props.theme.palette.getContrastText(props.theme.palette.primary.main) : ''};
`;

export const MyButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return (
        <StyledButton ref={ref} {...props}>
            {props.children}
        </StyledButton>
    );
});