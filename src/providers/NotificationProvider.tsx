import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import { useDisclosure } from "../hooks/useDisclosure";
import { Modal } from "@mui/material";
import { NotificationModalContent } from "../components/Elements/Modal/NotificationModalContent";
import { ModalNotification, SnackbarNotification } from "../types/notification";
import { OptionsObject, useSnackbar } from "notistack";
import { MyButton } from "../components";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { uuidv4 } from "../utils/uuidv4";

type NotifyModal = (payload: ModalNotification) => void;
type NotifySnackbar = (payload: SnackbarNotification) => void;

type NotificationProviderValues = {
    notifyModal: NotifyModal;
    notifySnackbar: NotifySnackbar;
};

const NotificationContext = createContext<NotificationProviderValues>({
    notifyModal: () => ({}),
    notifySnackbar: () => ({})
});

export const NotificationController: NotificationProviderValues = {
    notifyModal: () => {},
    notifySnackbar: () => {}
}

export function NotificationProvider({children}: PropsWithChildren) {
    const [modal, setModal] = useState<ModalNotification | undefined>();
    const {isOpen, open, close} = useDisclosure();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const notifyModal: NotifyModal = useCallback((payload) => {
        setModal(payload);
        if (payload) {
            open();
        }
    }, [open]);

    const SNACKBAR_DEFAULTS: OptionsObject = useMemo(() => ({
        variant: 'info',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 2000,
        action: (key) => (
            <MyButton onClick={() => closeSnackbar(key)} color="inherit">
                <HighlightOffIcon />
            </MyButton>
        )
    }), [closeSnackbar]);

    const notifySnackbar: NotifySnackbar = useCallback((payload) => {
        enqueueSnackbar(payload.message, {
            key: uuidv4(),
            ...SNACKBAR_DEFAULTS,
            ...payload.options
        });
    }, [SNACKBAR_DEFAULTS, enqueueSnackbar]);

    NotificationController.notifyModal = notifyModal;
    NotificationController.notifySnackbar = notifySnackbar;

    const value = useMemo(() => ({
        notifyModal,
        notifySnackbar
    }), [notifyModal, notifySnackbar]);

    return (
        <NotificationContext.Provider value={value}>
            {modal && (
                <Modal open={isOpen} onClose={close}>
                    <>
                        <NotificationModalContent {...modal} onClose={close}/>
                    </>
                </Modal>
            )}
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotifyModal = () => useContext(NotificationContext).notifyModal;
export const useNotifySnackbar = () => useContext(NotificationContext).notifySnackbar;