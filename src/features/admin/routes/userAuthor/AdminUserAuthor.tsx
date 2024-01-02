import { AdminProvider } from "../../../../providers/admin/AdminProvider";
import { UserAuthorization } from "../../components/userAuthorization/UserAuthorization";
import { ConnectedAuthorCreateModal } from "../../components/userAuthorization/UserAuthorCreateModal";
import { ConnectedUserAuthorEditModal } from "../../components/userAuthorization/UserAuthorEditModal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSelectedRow } from "../../../../stores/table/tableSlice";
import { TABLE_USER_AUTHOR } from "../../../../stores/table/tableInitialState";

export const AdminUserAuthor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      // Clean function
      return () => {
          dispatch(setSelectedRow({
              tableId: TABLE_USER_AUTHOR,
              selectedRow: null
          }))
      }
  }, []);

  return (
    <AdminProvider>
      <UserAuthorization />
      <ConnectedAuthorCreateModal />
      <ConnectedUserAuthorEditModal />
    </AdminProvider>
  )
}
