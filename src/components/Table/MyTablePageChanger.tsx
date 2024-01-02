import { ButtonBase, SxProps, Typography, styled } from '@mui/material';
import { TablePaginationInfo } from '../../hooks/useTablePagination';
import { Stack } from '@mui/system';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MouseEventHandler } from 'react';

const StyledTablePagination = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    font-size: 12px;
`;

const StyledCurrentPage = styled('div')`
    display: flex;
    justify-content: center;
    height: 100%;
    width: 20px;
    background-color: #c8e3de;
`;

type MyTablePageChangerProps = {
    sx?: SxProps;
} & Partial<Pick<TablePaginationInfo, 'pageCount' | 'onPageChange' | 'page'>>;

export const MyTablePageChanger = (props: MyTablePageChangerProps) => {
    const { pageCount, onPageChange, page } = props;

    const prevButtonDisabled = page && page === 1 ? true : false;
    const nextButtonDisabled = page && page === pageCount ? true : false;

    const onPrevPageClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        onPageChange && onPageChange(e, (page ?? 0) - 1);
    }
    const onNextPageClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        onPageChange && onPageChange(e, (page ?? 0) + 1);
    }

    return (
        <StyledTablePagination>
            <Stack direction='row' alignItems='center'>
                <ButtonBase disabled={prevButtonDisabled} onClick={onPrevPageClick}>
                    <ChevronLeftIcon color={prevButtonDisabled ? 'disabled' : 'action'} />
                </ButtonBase>
                <StyledCurrentPage>
                    <Typography variant='body2'>{page}</Typography>
                </StyledCurrentPage>
                <ButtonBase disabled={nextButtonDisabled} onClick={onNextPageClick}>
                    <ChevronRightIcon color={nextButtonDisabled ? 'disabled' : 'action'} />
                </ButtonBase>
            </Stack>
        </StyledTablePagination>
    )
}
