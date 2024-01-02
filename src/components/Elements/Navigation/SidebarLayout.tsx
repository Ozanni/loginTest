import * as React from 'react';
import { styled, Box, Typography } from '@mui/material';

const StyledSidebarContainer = styled(Box)`
    max-height: 100%;
    width: 250px;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #0E8A72;
    overflow: hidden;
`;

const StyledSidebarHeader = styled(Box)`
    height: 30px;
    background-color: #0e8a72;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledContentWrapper = styled(Box)`
    height: 100%;
`;

type SidebarLayoutProps = {
    children: React.ReactNode;
    title: string;
}

export function SidebarLayout({children, title}: SidebarLayoutProps) {
    return (
        <StyledSidebarContainer>
            <StyledSidebarHeader>
                <Typography sx={{fontSize: '18px', textTransform: 'uppercase', color: 'white'}}>{title}</Typography>
            </StyledSidebarHeader>
            <StyledContentWrapper>
                {children}
            </StyledContentWrapper>
        </StyledSidebarContainer>
    );
}