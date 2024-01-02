import { styled, Box } from '@mui/material';
import { SidebarLayout } from '../../../components/Elements/Navigation';
import { AdminSidebar } from './AdminSidebar';

type LayoutProps = {
    children: React.ReactNode;
};

const StyledLayout = styled(Box)`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: auto minmax(50vw, 1fr);
    grid-template-rows: minmax(50vh, 1fr);
`;

const StyledContentContainer = styled('div')`
    height: 100%;
    width: 100%;
`;

export function AdminLayout({children}: LayoutProps) {
    return (
        <StyledLayout>
            <SidebarLayout title='QUẢN TRỊ HỆ THỐNG'>
                <AdminSidebar/>
            </SidebarLayout>
            <StyledContentContainer>{children}</StyledContentContainer>
        </StyledLayout>
    )
}