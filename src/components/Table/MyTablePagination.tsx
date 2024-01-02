import { Stack, styled } from "@mui/material"
import { TablePaginationInfo } from "../../hooks/useTablePagination";
import { ReactNode } from "react";
import { MyTablePageChanger } from "./MyTablePageChanger";

const StyledTablePagination = styled(Stack)``;

export type MyTablePaginationProps = {
    showPageChanger: boolean;
    paginationProps: TablePaginationInfo;
    renderPagination?: (paginationProps: TablePaginationInfo) => ReactNode;
}

export const MyTablePagination = (props: MyTablePaginationProps) => {
    const {
        showPageChanger,
        paginationProps,
        renderPagination
    } = props;

    return (
        <StyledTablePagination
            spacing={0}
            direction='row'
        >
            {showPageChanger && (renderPagination ? renderPagination(paginationProps) : (
                <MyTablePageChanger
                    pageCount={paginationProps.pageCount}
                    onPageChange={paginationProps.onPageChange}
                    page={paginationProps.page}
                />
            ))}
        </StyledTablePagination>
    )
}
