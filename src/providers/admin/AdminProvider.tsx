import { MutableRefObject, ReactNode, createContext, useCallback, useContext, useMemo, useRef } from "react";
import { LiteralUnion } from "react-hook-form";

const noop = () => {};

type AnyFn = (...args: any) => any;


type PredefinedAdminFunctions = {
  openCreateModal: AnyFn;
  submitCreateForm: AnyFn;
  openEditModal: AnyFn;
  submitEditForm: AnyFn,
  submitDelete: AnyFn;
  openCreateModalPanel: AnyFn;
  submitCreateFormPanel: AnyFn;
  openEditModalPanel: AnyFn;
  submitEditFormPanel: AnyFn,
  submitDeletePanel: AnyFn;
}

type AdminFunctions = PredefinedAdminFunctions & Record<string, AnyFn>;

const ADMIN_FUNCTIONS_DEFAULT: AdminFunctions = {
  openCreateModal: noop,
  submitCreateForm: noop,
  openEditModal: noop,
  submitEditForm: noop,
  submitDelete: noop,
  openCreateModalPanel: noop,
  submitCreateFormPanel: noop,
  openEditModalPanel: noop,
  submitEditFormPanel: noop,
  submitDeletePanel: noop,

}

type AdminContextValues = {
  fnRef: MutableRefObject<AdminFunctions>;
  registerFn: (
    name: LiteralUnion<keyof PredefinedAdminFunctions, string>,
    fn: AnyFn
  ) => void;
  debug: () => void;
}

const AdminContext = createContext<AdminContextValues>({
  fnRef: {
    current: ADMIN_FUNCTIONS_DEFAULT
  },
  registerFn: noop,
  debug: noop
})

function AdminProvider(props: {children: ReactNode}) {
  const ref = useRef<AdminFunctions>(ADMIN_FUNCTIONS_DEFAULT);
  const registerFn: AdminContextValues['registerFn'] = useCallback((name, fn) => {
    ref.current[name] = fn;
  }, []);
  const providerValue = useMemo(() => ({
    fnRef: ref,
    registerFn,
    debug: () => {}
  }), [registerFn])

  return <AdminContext.Provider value={providerValue} {...props}>{props.children}</AdminContext.Provider>;
}

const useAdminContext = () => useContext(AdminContext);

const useAdminFunctions = () => {
  const context = useContext(AdminContext);
  return context.fnRef.current;
}

const useRegisterAdminFunctions = () => {
  const context = useContext(AdminContext);
  return context.registerFn;
}

export {AdminProvider, useAdminContext, useAdminFunctions, useRegisterAdminFunctions};