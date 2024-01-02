import { useEffect } from "react";
import { AdminProvider } from "../../../../providers/admin/AdminProvider"
import { StatisticsType } from "../../components/statisticsType/StatisticsType"
import { useDispatch } from "react-redux";
import { setSelectedRow } from "../../../../stores/table/tableSlice";
import { TABLE_STATISTICS_TYPE } from "../../../../stores/table/tableInitialState";
import { ConnectedStatisticsTypeCreateModal } from "../../components/statisticsType/StatisticsTypeCreateModal";
import { ConnectedStatisticsTypeEditModal } from "../../components/statisticsType/StatisticsTypeEditModal";

export const AdminStatisticsType = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Clean function
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_STATISTICS_TYPE,
                selectedRow: null
            }))
        }
    }, []);
    
    return (
        <AdminProvider>
            <StatisticsType />
            <ConnectedStatisticsTypeCreateModal />
            <ConnectedStatisticsTypeEditModal />
        </AdminProvider>
    )
}
