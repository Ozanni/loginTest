import { forwardRef } from "react";
import { Checkbox, CheckboxProps, styled } from "@mui/material";

const StyledCheckbox = styled(Checkbox)``;

export type MyCheckboxProps = {} & CheckboxProps;

export const MyCheckbox = forwardRef<HTMLButtonElement, MyCheckboxProps>((props, ref) => {
    return (
        <StyledCheckbox
            ref={ref}
            color="primary"
            size="small"
            {...props}
        />
    )
})
