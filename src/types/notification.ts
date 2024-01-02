import { SnackbarOrigin, VariantType } from 'notistack';

export type ModalNotificationOptions = {
    variant: 'info' | 'error' | 'warning';
    onConfirm?: () => void;
    onCancel?: () => void;
}

export type ModalNotification = {
    message: string;
    options?: ModalNotificationOptions;
}

export type SnackbarNotification = {
    message: string;
    options?: {
        variant: VariantType;
        autoHideDuration?: number;
        anchorOrigin?: SnackbarOrigin;
        persist?: boolean;
    }
}