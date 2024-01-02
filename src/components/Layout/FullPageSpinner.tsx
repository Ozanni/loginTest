import {styled, Stack, Typography, Skeleton} from '@mui/material';

const StyledContainer = styled(Stack)`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledText = styled(Typography)`
    font-size: 14px;
    font-weight: 400;
`;

export function FullPageSpinner() {
    return (
        <StyledContainer>
            <Skeleton
                sx={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    transform: 'none',
                }}
                animation='wave'
            />
            <StyledText>Đang tải</StyledText>
        </StyledContainer>
    )
}