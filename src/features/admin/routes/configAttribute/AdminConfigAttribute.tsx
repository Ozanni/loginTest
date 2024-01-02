import { useDispatch } from "react-redux"
import { AdminProvider } from "../../../../providers/admin/AdminProvider"
import { ConfigAttribute } from "../../components/configAttribute/ConfigAttribute"
import { useEffect } from "react";
import { setSelectedRow } from "../../../../stores/table/tableSlice";
import { TABLE_CONFIG_ATTRIBUTE } from "../../../../stores/table/tableInitialState";
import { ConnectedConfigAttributeCreateModal } from "../../components/configAttribute/ConfigAttributeCreateModal";
import { ConnectedConfigAttributeEditModal } from "../../components/configAttribute/ConfigAttributeEditModal";

export const AdminConfigAttribute = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Clean function
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_CONFIG_ATTRIBUTE,
                selectedRow: null
            }))
        }
    }, []);

    return (
        <AdminProvider>
            <ConfigAttribute />
            <ConnectedConfigAttributeCreateModal />
            <ConnectedConfigAttributeEditModal />
        </AdminProvider>
    )
}
