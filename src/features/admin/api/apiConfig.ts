import { api } from "../../../lib/api";
import { createPaginationParams, createSortParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult, GetManyResourceWithHospitalID } from "../../../types/api";
import { ConfigDTO, ConfigDTOCreate, ConfigDTODelete, ConfigDTOUpdate } from "../../../types/dto/config";
import { RESOURCES } from "../../../types/resources";

const apiHospitalConfig = api.injectEndpoints({
    endpoints: (builder) => ({
        getConfigList: builder.query<
            GetManyResourceQueryResult<ConfigDTO>,
            GetManyResourceQuery<GenericFilter> & GetManyResourceWithHospitalID
        >({
            query: (arg) => {
                const { pagination, sort, hospitalID } = arg;
                const orderBy = createSortParams(sort);
                const params = {
                    ...createPaginationParams(pagination),
                    orderBy
                };
                    return {
                        url: `${RESOURCES.HOSPITAL}/${hospitalID}/${RESOURCES.CONFIG}`,
                        method: 'GET',
                        params,
                        useAsync: true,
                        useHospitalID: false
                    };
                // const request = getManyResourcesRequestParams(arg, `${RESOURCES.HOSPITAL}/72131/${RESOURCES.CONFIG}`);
                // return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.CONFIG_ATTRIBUTE, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.CONFIG, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        getOneConfig: builder.query<ConfigDTO, { id: string, hospitalID: string }>({
            query: ({ id, hospitalID }) => ({
                url: `${RESOURCES.HOSPITAL}/${hospitalID}/${RESOURCES.CONFIG}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.CONFIG, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        createConfig: builder.mutation<ConfigDTOCreate, {data: ConfigDTOCreate, hospitalID: any}>({
            query: ({data, hospitalID}) => ({
                url: `${RESOURCES.HOSPITAL}/${hospitalID}/${RESOURCES.CONFIG}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error) => error ? [] : [{ type: RESOURCES.CONFIG, id: 'LIST' }]
        }),
        updateConfig: builder.mutation<ConfigDTOUpdate, ConfigDTOUpdate & {hospitalID: string}>({
            query: (data) => ({
                url: `${RESOURCES.HOSPITAL}/${data.hospitalID}/${RESOURCES.CONFIG}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.CONFIG, id: arg.attributeID }]
        }),
        deleteConfig: builder.mutation<ConfigDTODelete, ConfigDTODelete & {hospitalID: string}>({
            query: (data) => ({
                url: `${RESOURCES.HOSPITAL}/${data.hospitalID}/${RESOURCES.CONFIG}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.CONFIG, id: arg.id }]
        })

        
    }), 
})

export const {
    useGetOneConfigQuery,
    useGetConfigListQuery,
    useCreateConfigMutation,
    useUpdateConfigMutation,
    useDeleteConfigMutation
} = apiHospitalConfig;