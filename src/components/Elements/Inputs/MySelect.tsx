import { Select, SelectProps, styled } from "@mui/material";

const StyledSelect = styled('div')`
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

export type MySelectProps<T> = Omit<SelectProps<T>, 'size'> & {
    size?: SelectProps['size'];
}
export const MySelect = <T,>(props: MySelectProps<T>) => {
    const { size } = props;
    return (
        <StyledSelect>
            <Select
                {...props}
                size={size}
            />
        </StyledSelect>
    )
}
