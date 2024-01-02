import { MyTablePagination, MyTablePaginationProps } from "./MyTablePagination";

type MyTablePaginationWrapperProps = {
} & MyTablePaginationProps;

export const MyTablePaginationWrapper = (props: MyTablePaginationWrapperProps) => {
    return (
        <MyTablePagination 
            {...props}
        />
    )
}
