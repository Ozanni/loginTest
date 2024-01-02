import { forwardRef } from 'react'
import { ModalNotification, ModalNotificationOptions } from '../../../types/notification';
import { Paper, styled, css } from '@mui/material';
import { ModalContent } from './ModalContent';
import { Box } from '@mui/system';
import { ModalFooterLayout } from '../../Layout/ModalFooterLayout';
import { MyButton } from '..';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { Markup } from 'interweave';

const StyledNotificationModalContent = styled(ModalContent)`
    border-radius: 3px;
`;

const StyledModalBodyText = styled('div')`
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
`;

const StyledConfirmButton = styled(MyButton)`
    border: 0.5px solid #1D1E3A99;
    color: #1D1E3A99;
    &:hover {
        color: white;
        background-color: #0e8a72;
        border: none;
    }
`;

const StyledCloseButton = styled(MyButton)`
    border: 0.5px solid #1D1E3A99;
    color: #1D1E3A99;
    &:hover {
        color: white;
        background-color: #5B5C6D;
        border: none;
    }
`;

const StyledNotificationModalTitle = styled('div')<{$variant: ModalNotificationOptions['variant']}>`
    font-weight: 400;
    font-size: 2rem;
    padding-left: 20px 20px;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    ${(props) => {
        switch (props.$variant) {
            case 'error':
                return css`
                    background-color: ${props.theme.palette.error.main};
                    color: ${props.theme.palette.error.contrastText};
                `;
            case 'info':
                return css`
                    background-color: ${props.theme.palette.success.main};
                    color: ${props.theme.palette.success.contrastText};
                `;
            case 'warning':
                return css`
                    background-color: ${props.theme.palette.warning.main};
                    color: ${props.theme.palette.warning.contrastText};
                `;
            default:
                return css`
                    background-color: white;
                    color: black;
                `;
            }
        }
    }
`;

const StyledNotificationModalBody = styled(Paper)`
    display: flex;
    flex-grow: 1;
    border-radius: 0;
    align-items: center;
    justify-content: center;
`;

export type NotificationModalContentProps = {
    onClose: () => void;
} & ModalNotification;

const getNotificationIcon = (variant: ModalNotificationOptions['variant']) => {
    switch (variant) {
        case 'error':
            return <ErrorIcon fontSize="large" />;
        case 'info':
            return <InfoIcon fontSize="large" />;
        case 'warning':
            return <WarningIcon fontSize="large" />;
    }
};

export const NotificationModalContent = forwardRef<HTMLElement, NotificationModalContentProps>((props, ref) => {
    const { message, options = { variant: 'info' }, onClose } = props;
    const { variant, onConfirm, onCancel } = options;

    return (
        <StyledNotificationModalContent
            ref={ref}
            width='min(85dvw, 500px)'
            height='300px'
            renderTitle={() => (
                <StyledNotificationModalTitle $variant={variant}>
                    <Box
                        p={1}
                        alignItems='left'
                        display='flex'
                    >
                        {getNotificationIcon(variant)}
                    </Box>
                    {variant == 'warning' ? 'Cảnh báo' : null}
                    {variant == 'info' ? 'Thông báo' : null}
                    {variant == 'error' ? 'Lỗi' : null}
                </StyledNotificationModalTitle>
            )}
            renderBody={() => (
                <StyledNotificationModalBody>
                    <StyledModalBodyText>
                        <Markup content={message}/>
                    </StyledModalBodyText>
                </StyledNotificationModalBody>
            )}
            renderFooter={() => (
                <Box p={2}>
                    <ModalFooterLayout
                        actionButton={
                            onConfirm && (
                                <StyledConfirmButton
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                >
                                    Đồng ý
                                </StyledConfirmButton>
                            ) 
                        }
                        optionalButtons={[
                            <StyledCloseButton
                                key=''
                                onClick={() => {
                                    onCancel && onCancel();
                                    onClose();
                                }}
                            >
                                Đóng
                            </StyledCloseButton>
                        ]}
                    />
                </Box>
            )}
        />
    )
})
