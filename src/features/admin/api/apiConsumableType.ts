import { api } from "../../../lib/api";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult } from "../../../types/api";
import { ConsumableTypeDTO, ConsumableTypeDTOCreate, ConsumableTypeDTODelete, ConsumableTypeDTOUpdate } from "../../../types/dto/consumableType";
import { RESOURCES } from "../../../types/resources";

const apiConsumableType = api.injectEndpoints({
    endpoints: (builder) => ({
        getOneConsumableType: builder.query<ConsumableTypeDTO, { id: string }>({
            query: ({ id }) => ({
                url: `${RESOURCES.CONSUMABLE_TYPE}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.CONSUMABLE_TYPE, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        getConsumableTypeList: builder.query<
            GetManyResourceQueryResult<ConsumableTypeDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, RESOURCES.CONSUMABLE_TYPE);
                return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.CONSUMABLE_TYPE, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.CONSUMABLE_TYPE, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        createConsumableType: builder.mutation<ConsumableTypeDTOCreate, ConsumableTypeDTOCreate>({
            query: (data) => ({
                url: `${RESOURCES.CONSUMABLE_TYPE}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error) => error ? [] : [{ type: RESOURCES.CONSUMABLE_TYPE, id: 'LIST' }]
        }),
        updateConsumableType: builder.mutation<ConsumableTypeDTOUpdate, ConsumableTypeDTOUpdate>({
            query: (data) => ({
                url: `${RESOURCES.CONSUMABLE_TYPE}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.CONSUMABLE_TYPE, id: arg.id }]
        }),
        deleteConsumableType: builder.mutation<ConsumableTypeDTODelete, ConsumableTypeDTODelete>({
            query: (data) => ({
                url: `${RESOURCES.CONSUMABLE_TYPE}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.CONSUMABLE_TYPE, id: arg.id }]
        })
    })
})

export const {
    useGetOneConsumableTypeQuery,
    useGetConsumableTypeListQuery,
    useCreateConsumableTypeMutation,
    useUpdateConsumableTypeMutation,
    useDeleteConsumableTypeMutation
} = apiConsumableType;