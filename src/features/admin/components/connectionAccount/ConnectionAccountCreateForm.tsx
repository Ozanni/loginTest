import { useMemo, useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { useCreateConnectionAccountMutation } from "../../api/apiConnectionAccount";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { ConnectionAccountDTOCreate, ConnectionAccountDTOFormCreate } from "../../../../types/dto/connectionAccount";
import { UseFormProps } from "react-hook-form";
import { MyFormGroupUnstyled } from "../../../../components";
import { ConnectionAccountFormFields } from "./ConnectionAccountFormFields";
import { useSelector } from "react-redux";
import { TABLE_HOSPITAL } from "../../../../stores/table/tableInitialState";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetHospitalListQuery } from "../../api/apiHospital";

export const ConnectionAccountCreateForm = (props: {onSuccessCallback?: () => void}) => {
    const { onSuccessCallback } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [createConnectionAccount] = useCreateConnectionAccountMutation();
    const notifySnackbar = useNotifySnackbar();

    const query = useSelector((state: any) => state.tableReducer.data[TABLE_HOSPITAL].query);
    const { data } = useGetHospitalListQuery(query || skipToken);

    const onSubmit = async (formData: ConnectionAccountDTOFormCreate) => {
        const submitForm: ConnectionAccountDTOCreate = {
            id: formData.id ?? '',
            secret: formData.secret ?? '',
            type: formData.type ?? '',
            authorities: formData.authorities ?? [],
            ipAllowed: [formData.ipAllowed ?? ''],
            hospitalID: formData.hospitalID ?? ''
        }
        console.log(submitForm);
        if (submitForm.id.length === 0 || submitForm.secret.length === 0 || submitForm.type.length === 0 || submitForm.authorities.length === 0) setErrorMessage('Cần điền vào trường bắt buộc');
        else {
            const result = await createConnectionAccount(submitForm);
            if ('error' in result) {
                notifySnackbar({
                    message: 'Lỗi',
                    options: {
                        variant: 'error'
                    }
                })
            } else {
                notifySnackbar({
                    message: 'Thành công',
                    options: {
                        variant: 'success'
                    }
                })
                onSuccessCallback && onSuccessCallback();
            }
        }
    }

    const formOptions: UseFormProps<ConnectionAccountDTOFormCreate> = {
        mode: 'onChange',
        defaultValues: {
            id: '',
            secret: '',
            type: '',
            ipAllowed: '',
            authorities: [],
            hospitalID: ''
        }
    }

    const types = useMemo<Array<string>>(() => ["sysadmin", "connector"], []);
    const authorities = useMemo<Array<string>>(() => ["admin", "query", "create", "update", "delete"], []);

    return (
        <MyFormGroupUnstyled
            registerFormFunctions={(formInstance) => register('submitCreateForm', () => formInstance.submit && formInstance.submit())}
            onSubmit={onSubmit}
            submitOnEnter={true}
            formOptions={formOptions}
            renderInputs={({control}) => (
                <ConnectionAccountFormFields
                    control={control}
                    errorMessage={errorMessage}
                    disableIdField={false}
                    types={types}
                    authorities={authorities}
                    hospitals={data?.list}
                />
            )}
        />
    )
}
