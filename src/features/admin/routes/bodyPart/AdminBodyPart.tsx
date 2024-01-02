import { useEffect } from "react";
import { AdminProvider } from "../../../../providers/admin/AdminProvider";
import { BodyPart } from "../../components/bodyPart/BodyPart";
import { useDispatch } from "react-redux";
import { setSelectedRow } from "../../../../stores/table/tableSlice";
import { TABLE_BODY_PART } from "../../../../stores/table/tableInitialState";
import { ConnectedBodyPartCreateModal } from "../../components/bodyPart/BodyPartCreateModal";
import { ConnectedBodyPartEditModal } from "../../components/bodyPart/BodyPartEditModal";

export function AdminBodyPart() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Clean function
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_BODY_PART,
                selectedRow: null
            }))
        }
    }, []);

    return (
        <AdminProvider>
            <BodyPart />
            <ConnectedBodyPartCreateModal />
            <ConnectedBodyPartEditModal />
        </AdminProvider>
    );
  }