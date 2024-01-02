import { api } from "../../../lib/api";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult } from "../../../types/api";
import { ConnectionAccountDTO, ConnectionAccountDTOCreate, ConnectionAccountDTODelete, ConnectionAccountDTOUpdate } from "../../../types/dto/connectionAccount";
import { RESOURCES } from "../../../types/resources";

const apiConnectionAccount = api.injectEndpoints({
    endpoints: (builder) => ({
        getOneConnectionAccount: builder.query<ConnectionAccountDTO, { id: string }>({
            query: ({ id }) => ({
                url: `${RESOURCES.CONNECTION_ACCOUNT}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.CONFIG_ATTRIBUTE, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        getConnectionAccountList: builder.query<
            GetManyResourceQueryResult<ConnectionAccountDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, RESOURCES.CONNECTION_ACCOUNT);
                return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.CONNECTION_ACCOUNT, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.CONNECTION_ACCOUNT, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        createConnectionAccount: builder.mutation<ConnectionAccountDTOCreate, ConnectionAccountDTOCreate>({
            query: (data) => ({
                url: `${RESOURCES.CONNECTION_ACCOUNT}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error) => error ? [] : [{ type: RESOURCES.CONNECTION_ACCOUNT, id: 'LIST' }]
        }),
        updateConnectionAccount: builder.mutation<ConnectionAccountDTOUpdate, ConnectionAccountDTOUpdate>({
            query: (data) => ({
                url: `${RESOURCES.CONNECTION_ACCOUNT}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.CONNECTION_ACCOUNT, id: arg.id }]
        }),
        deleteConnectionAccount: builder.mutation<ConnectionAccountDTODelete, ConnectionAccountDTODelete>({
            query: (data) => ({
                url: `${RESOURCES.CONNECTION_ACCOUNT}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.CONNECTION_ACCOUNT, id: arg.id }]
        })
    })
})

export const {
    useGetOneConnectionAccountQuery,
    useGetConnectionAccountListQuery,
    useCreateConnectionAccountMutation,
    useUpdateConnectionAccountMutation,
    useDeleteConnectionAccountMutation
} = apiConnectionAccount;