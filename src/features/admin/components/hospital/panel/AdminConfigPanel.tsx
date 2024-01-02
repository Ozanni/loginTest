import { FC, useEffect } from "react";
import { useDispatch } from "react-redux"
import { setSelectedRow } from "../../../../../stores/table/tableSlice";
import { TABLE_HOSPITAL_CONFIG } from "../../../../../stores/table/tableInitialState";
import { AdminProvider } from "../../../../../providers/admin/AdminProvider";
import { Config } from "./Config";
import { ConnectedConfigCreateModal } from "./ConfigCreateModal";
import { ConnectedConfigEditModal } from "./ConfigEditModal";
// import { ConnectedConfigAttributeCreateModal } from "../../configAttribute/ConfigAttributeCreateModal";
// import { ConnectedConfigAttributeEditModal } from "../../configAttribute/ConfigAttributeEditModal";

type ConfigTableProps = {
    hospitalID?: string;
};

export const AdminHospitalConfigPanel:FC<ConfigTableProps> = (props) => {
    const { hospitalID } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_HOSPITAL_CONFIG,
                selectedRow: null
            }))
        }
    }, []);

    return (
        <AdminProvider>
            <Config hospitalID={hospitalID}/>
            <ConnectedConfigCreateModal />
            <ConnectedConfigEditModal />
        </AdminProvider>
    )
}
