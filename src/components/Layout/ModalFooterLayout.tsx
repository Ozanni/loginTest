import { Box, BoxProps, styled } from "@mui/material";
import { Stack } from "@mui/material";
import { ReactNode } from "react";

const StyledModalFooterWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

type ModalFooterLayoutProps = {
    actionButton: ReactNode;
    optionalButtons?: ReactNode[];
    containerProps?: BoxProps;
}

export const ModalFooterLayout = (props: ModalFooterLayoutProps) => {
    const {actionButton, optionalButtons, containerProps} = props;
    return (
        <StyledModalFooterWrapper {...containerProps}>
            <Box>{actionButton}</Box>
            <Stack spacing={1} direction={'row'}>{optionalButtons && optionalButtons}</Stack>
        </StyledModalFooterWrapper>
    )
}
