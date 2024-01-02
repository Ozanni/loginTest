import { useEffect } from "react";
import { AdminProvider } from "../../../../providers/admin/AdminProvider";
import { ConsumableType } from "../../components/consumableType/ConsumableType";
import { ConnectedConsumableTypeCreateModal } from "../../components/consumableType/ConsumableTypeCreateModal";
import { ConnectedConsumableTypeEditModal } from "../../components/consumableType/ConsumableTypeEditModal";
import { useDispatch } from "react-redux";
import { setSelectedRow } from "../../../../stores/table/tableSlice";
import { TABLE_CONSUMABLE_TYPE } from "../../../../stores/table/tableInitialState";

export const AdminConsumableType = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Clean function
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_CONSUMABLE_TYPE,
                selectedRow: null
            }))
        }
    }, []);

    return (
        <AdminProvider>
            <ConsumableType />
            <ConnectedConsumableTypeCreateModal />
            <ConnectedConsumableTypeEditModal />
        </AdminProvider>
    )
}