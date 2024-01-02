import { useDispatch } from "react-redux"
import { AdminProvider } from "../../../../providers/admin/AdminProvider"
import { Hospital } from "../../components/hospital/Hospital"
import { useEffect } from "react";
import { setSelectedRow } from "../../../../stores/table/tableSlice";
import { TABLE_HOSPITAL } from "../../../../stores/table/tableInitialState";
import { ConnectedHospitalCreateModal } from "../../components/hospital/HospitalCreateModal";
import { ConnectedHospitalEditModal } from "../../components/hospital/HospitalEditModal";
import { AdminShell } from "../../../../providers/admin/AdminShell";
import { HospitalConfigPanel } from "../../components/hospital/HospitalConfigPanel";

export const AdminHospital = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Clean function
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_HOSPITAL,
                selectedRow: null
            }))
        }
    }, []);

    return (
        <AdminProvider >
            <AdminShell
                title={'Danh sách bệnh viện'}
                TableComponent={<Hospital />}
                PanelComponent={<HospitalConfigPanel />}
            />
            
            <ConnectedHospitalCreateModal />
            <ConnectedHospitalEditModal />
        </AdminProvider>
    )
}
