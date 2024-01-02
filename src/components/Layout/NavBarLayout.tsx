import { styled } from '@mui/material';
import * as React from 'react';
import { NavBar } from './NavBar';
import logo from '../../assets/images/itech_logo_with_title.png';

const StyledNavBarLayout = styled('div')`
    min-height: 100vh;
    max-height: 100vh;
    min-width: 100vw;
    max-width: 100vw;
    display: grid;
    grid-template-rows: auto 1fr;
`;

const MainContentContainer = styled('div')`
    max-height: calc(100vh - 40px);
    background-color: #f0f1f4;
`;

type NavBarLayoutProps = {
    children?: React.ReactNode;
}

// Contains NavBar and the page contents of protected route
export const NavBarLayout = ({ children }: NavBarLayoutProps) => {
    return (
        <StyledNavBarLayout>
            <NavBar logo={logo}/>
            <MainContentContainer>{children}</MainContentContainer>
        </StyledNavBarLayout>
    )
}