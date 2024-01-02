import { useDispatch } from "react-redux"
import { AdminProvider } from "../../../../providers/admin/AdminProvider"
import { ConnectionAccount } from "../../components/connectionAccount/ConnectionAccount"
import { ConnectedConnectionAccountCreateModal } from "../../components/connectionAccount/ConnectionAccountCreateModal"
import { ConnectedConnectionAccountEditModal } from "../../components/connectionAccount/ConnectionAccountEditModal"
import { useEffect } from "react"
import { setSelectedRow } from "../../../../stores/table/tableSlice"
import { TABLE_CONNECTION_ACCOUNT } from "../../../../stores/table/tableInitialState"

export const AdminConnectionAccount = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_CONNECTION_ACCOUNT,
                selectedRow: null
            }))
        }
    }, []);

    return (
        <AdminProvider>
            <ConnectionAccount />
            <ConnectedConnectionAccountCreateModal />
            <ConnectedConnectionAccountEditModal />
        </AdminProvider>
    )
}
