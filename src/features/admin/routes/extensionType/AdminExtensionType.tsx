import { useDispatch } from "react-redux"
import { AdminProvider } from "../../../../providers/admin/AdminProvider"
import { ExtensionType } from "../../components/extensionType/ExtensionType"
import { useEffect } from "react";
import { setSelectedRow } from "../../../../stores/table/tableSlice";
import { TABLE_EXTENSION_TYPE } from "../../../../stores/table/tableInitialState";
import { ConnectedExampleTypeCreateModal } from "../../components/extensionType/ExtensionTypeCreateModal";
import { ConnectedExtensionTypeEditModal } from "../../components/extensionType/ExtensionTypeEditModal";

export const AdminExtensionType = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Clean function
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_EXTENSION_TYPE,
                selectedRow: null
            }))
        }
    }, []);

    return (
        <AdminProvider>
            <ExtensionType />
            <ConnectedExampleTypeCreateModal />
            <ConnectedExtensionTypeEditModal />
        </AdminProvider>
    )
}
