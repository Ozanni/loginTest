import { useMemo, useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import {
  ConnectionAccountDTO,
  ConnectionAccountDTOFormUpdate,
  ConnectionAccountDTOUpdate,
} from '../../../../types/dto/connectionAccount';
import { useUpdateConnectionAccountMutation } from '../../api/apiConnectionAccount';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { useDispatch } from 'react-redux';
import { TABLE_CONNECTION_ACCOUNT } from '../../../../stores/table/tableInitialState';
import { UseFormProps } from 'react-hook-form';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { MyFormGroupUnstyled, MyFormTextField } from '../../../../components';
import { MenuItem, Stack, Typography } from '@mui/material';
import { MyFormSelectField } from '../../../../components/Elements/Inputs/MyFormSelectField';

export type ConnectionAccountEditFormProps = {
  onSuccessCallback?: () => void;
  record: ConnectionAccountDTO;
};

export const ConnectionAccountEditForm = (
  props: ConnectionAccountEditFormProps
) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editConnectionAccount] = useUpdateConnectionAccountMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<ConnectionAccountDTOFormUpdate> = {
    mode: 'onChange',
    defaultValues: {
      id: record.id,
      secret: '',
      type: record.type,
      authorities: record.authorities,
      ipAllowed: record.ipAllowed[0],
    },
  };

  const onSubmit = async (formData: ConnectionAccountDTOFormUpdate) => {
    const submitForm: ConnectionAccountDTOUpdate = {
      id: formData.id ?? '',
      secret: formData.secret ?? '',
      type: formData.type ?? '',
      authorities: formData.authorities ?? [],
      ipAllowed: [formData.ipAllowed ?? ''],
    };
    if (
      submitForm.secret.length === 0 ||
      submitForm.type.length === 0 ||
      submitForm.authorities.length === 0
    )
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editConnectionAccount(submitForm);
      if ('error' in result) {
        notifySnackbar({
          message: 'Lỗi',
          options: {
            variant: 'error',
          },
        });
      } else {
        notifySnackbar({
          message: 'Thành công',
          options: {
            variant: 'success',
          },
        });
        dispatch(
          setSelectedRow({
            tableId: TABLE_CONNECTION_ACCOUNT,
            selectedRow: null,
          })
        );
        onSuccessCallback && onSuccessCallback();
      }
    }
  };

  const types = useMemo<Array<string>>(() => ['sysadmin', 'connector'], []);
  const authorities = useMemo<Array<string>>(
    () => ['admin', 'query', 'create', 'update', 'delete'],
    []
  );

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'submitEditForm',
          () => formInstance.submit && formInstance.submit()
        )
      }
      onSubmit={onSubmit}
      submitOnEnter={true}
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <Stack spacing={1} alignItems="center">
          {errorMessage && (
            <Typography fontSize="12px" color="red">
              {errorMessage}
            </Typography>
          )}
          <MyFormTextField
            name="id"
            control={control}
            MyTextFieldProps={{
              label: 'ID',
              placeholder: 'ID',
              fullWidth: true,
              required: true,
              size: 'small',
              autoComplete: 'off',
              disabled: true,
            }}
          />
          <MyFormTextField
            name="secret"
            control={control}
            MyTextFieldProps={{
              label: 'Secret',
              placeholder: 'Secret',
              fullWidth: true,
              required: true,
              size: 'small',
              autoComplete: 'off',
            }}
          />
          <MyFormSelectField
            name="type"
            control={control}
            MySelectProps={{
              label: 'Tài khoản',
              size: 'small',
              fullWidth: true,
              disabled: types.length === 0,
            }}
            required={true}
          >
            {types.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </MyFormSelectField>
          <MyFormSelectField
            name="authorities"
            control={control}
            MySelectProps={{
              label: 'Quyền',
              size: 'small',
              fullWidth: true,
              multiple: true,
              disabled: authorities.length === 0,
            }}
            required={true}
          >
            {authorities.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </MyFormSelectField>
          <MyFormTextField
            name="ipAllowed"
            control={control}
            MyTextFieldProps={{
              label: 'Địa chỉ IP',
              placeholder: 'Địa chỉ IP',
              fullWidth: true,
              size: 'small',
              autoComplete: 'off',
            }}
          />
        </Stack>
      )}
    />
  );
};
