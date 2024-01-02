import { FC, useMemo } from "react";
import { TABLE_HOSPITAL } from "../../../../stores/table/tableInitialState";
import { useSelector } from "react-redux";
import { CloseableCollapsiblePanel } from "../../../../components/Surfaces/CollapsiblePanel";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { AdminHospitalConfigPanel } from "./panel/AdminConfigPanel";

export const HospitalConfigPanel: FC = () => {
    const selectedRow = useSelector(
        (state: any) =>
            state.tableReducer.data[TABLE_HOSPITAL].selection.selectedRow
    );
    const hospitalId = selectedRow?.id;
    const { isOpen: initialExpanded, open, close } = useDisclosure(true);

    if (!selectedRow) return <></>;
    return (
        <CloseableCollapsiblePanel
            key={hospitalId}
            initialExpanded={initialExpanded}
            onExpand={open}
            onCollapse={close}
            onClose={close}
            title={selectedRow?.name}
        >
            <AdminHospitalConfigPanel hospitalID={hospitalId} />
        </CloseableCollapsiblePanel>
    )
}