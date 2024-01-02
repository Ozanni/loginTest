import { useDispatch } from "react-redux"
import { AdminProvider } from "../../../../providers/admin/AdminProvider"
import { ModalityTypeName } from "../../components/modalityTypeName/ModalityTypeName"
import { ConnectedModalityTypeNameCreateModal } from "../../components/modalityTypeName/ModalityTypeNameCreateModal"
import { ConnectedModalityTypeNameEditModal } from "../../components/modalityTypeName/ModalityTypeNameEditModal"
import { useEffect } from "react"
import { setSelectedRow } from "../../../../stores/table/tableSlice"
import { TABLE_MODALITY_TYPE_NAME } from "../../../../stores/table/tableInitialState"

export const AdminModalityTypeName = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Clean function
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_MODALITY_TYPE_NAME,
                selectedRow: null
            }))
        }
    }, []);

    return (
        <AdminProvider>
            <ModalityTypeName />
            <ConnectedModalityTypeNameCreateModal />
            <ConnectedModalityTypeNameEditModal />
        </AdminProvider>
    )
}