import { styled, Box, Typography, IconButton } from '@mui/material';
import { DEFAULT_USERNAME } from '../../config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../providers/auth/AuthProvider';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../stores/auth/authSlide';
import { ROUTE_LOGIN } from '../../features/auth';

const StyledNavBar = styled('div')`
    height: 40px; // 40px ~ 6.5vh
    min-width: 100vw;
    max-width: 100vw;
    display: flex;
    position: relative;
    background-color: #fafafa;
`;

const StyledLogo = styled('img')`
    height: 100%;
    width: 100%;
`;

const StyledProfile = styled('div')`
    width: 121px;
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0px;
    right: 0px;
`;

type NavBarProps = {
    logo: string;
}

export function NavBar(props: NavBarProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logout = useCallback(() => {
        dispatch(clearToken());
        navigate(ROUTE_LOGIN);
    }, [dispatch, navigate]);

    return (
        <StyledNavBar>
            <Box 
                sx={{
                    height: '100%',
                    width: '204px',
                    position: 'absolute',
                    top: '0px',
                    left: '0px'
                }}
            >
                <StyledLogo src={props.logo} alt='logo'/>
            </Box>
            <StyledProfile>
                <AccountCircleIcon sx={{color: '#0e8a72'}}/>
                <Typography 
                    sx={{
                        fontSize: '13px', 
                        fontWeight: 400, 
                        color: '#0e8a72'
                    }}
                >
                    {DEFAULT_USERNAME}
                </Typography>
                <IconButton onClick={logout}>
                    <LogoutIcon sx={{color: '#0e8a72'}}/>
                </IconButton>
            </StyledProfile>
        </StyledNavBar>
    );
}