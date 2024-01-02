import { ReactNode } from 'react';
import { Box, BoxProps, styled, Stack } from '@mui/material';

const StyledTableActionButtonsShellWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: start;
`;

type TableActionButtonsShellProps = {
    actionsButton: ReactNode;
    containerProps?: BoxProps;
}

export function TableActionButtonsShell(props: TableActionButtonsShellProps) {
    const { actionsButton, containerProps } = props;
    return (
        <StyledTableActionButtonsShellWrapper {...containerProps}>
            <Stack direction={'row'}>{actionsButton}</Stack>
        </StyledTableActionButtonsShellWrapper>
    )
}
