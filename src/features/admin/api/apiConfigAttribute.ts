import { api } from "../../../lib/api";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult } from "../../../types/api";
import { ConfigAttributeDTO, ConfigAttributeDTOCreate, ConfigAttributeDTODelete, ConfigAttributeDTOUpdate } from "../../../types/dto/configAttribute";
import { RESOURCES } from "../../../types/resources";

const apiConfigAttribute = api.injectEndpoints({
    endpoints: (builder) => ({
        getOneConfigAttribute: builder.query<ConfigAttributeDTO, { id: string }>({
            query: ({ id }) => ({
                url: `${RESOURCES.CONFIG_ATTRIBUTE}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.CONFIG_ATTRIBUTE, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        getConfigAttributeList: builder.query<
            GetManyResourceQueryResult<ConfigAttributeDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, RESOURCES.CONFIG_ATTRIBUTE);
                return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.CONFIG_ATTRIBUTE, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.CONFIG_ATTRIBUTE, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        createConfigHospital: builder.mutation<ConfigAttributeDTOCreate, ConfigAttributeDTOCreate>({
            query: (data) => ({
                url: `${RESOURCES.CONFIG_ATTRIBUTE}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error) => error ? [] : [{ type: RESOURCES.CONFIG_ATTRIBUTE, id: 'LIST' }]
        }),
        updateConfigAttribute: builder.mutation<ConfigAttributeDTOUpdate, ConfigAttributeDTOUpdate>({
            query: (data) => ({
                url: `${RESOURCES.CONFIG_ATTRIBUTE}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.CONFIG_ATTRIBUTE, id: arg.id }]
        }),
        deleteConfigAttribute: builder.mutation<ConfigAttributeDTODelete, ConfigAttributeDTODelete>({
            query: (data) => ({
                url: `${RESOURCES.CONFIG_ATTRIBUTE}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.CONFIG_ATTRIBUTE, id: arg.id }]
        })
    }), 
})

export const {
    useGetOneConfigAttributeQuery,
    useGetConfigAttributeListQuery,
    useCreateConfigHospitalMutation,
    useUpdateConfigAttributeMutation,
    useDeleteConfigAttributeMutation
} = apiConfigAttribute;