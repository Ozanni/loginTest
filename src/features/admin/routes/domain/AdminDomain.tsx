import { useEffect } from 'react';
import { AdminProvider } from '../../../../providers/admin/AdminProvider';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_DOMAIN } from '../../../../stores/table/tableInitialState';
import { AdminShell } from '../../../../providers/admin/AdminShell';
import { Domain } from '../../components/Domain/Domain';
import { ConnectedDomainCreateModal } from '../../components/Domain/DomainCreateModal';

export const AdminDomain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clean function
    return () => {
      dispatch(
        setSelectedRow({
          tableId: TABLE_DOMAIN,
          selectedRow: null,
        })
      );
    };
  }, []);

  return (
    <AdminProvider>
      <AdminShell 
        title='Tên miền'
        TableComponent={<Domain />}
      />
      <ConnectedDomainCreateModal />
    </AdminProvider>
  );
};
