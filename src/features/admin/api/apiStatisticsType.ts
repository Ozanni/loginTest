import { api } from "../../../lib/api";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult } from "../../../types/api";
import { StatisticsTypeDTO, StatisticsTypeDTODelete } from "../../../types/dto/statisticsType";
import { RESOURCES } from "../../../types/resources";

const apiStatisticsType = api.injectEndpoints({
    endpoints: (builder) => ({
        getOneStatisticsType: builder.query<StatisticsTypeDTO, StatisticsTypeDTO>({
            query: ({ id }) => ({
                url: `${RESOURCES.STATISTICS_TYPE}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.STATISTICS_TYPE, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        getStatisticsTypeList: builder.query<
            GetManyResourceQueryResult<StatisticsTypeDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, RESOURCES.STATISTICS_TYPE);
                return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.STATISTICS_TYPE, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.STATISTICS_TYPE, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        createStatisticsType: builder.mutation<StatisticsTypeDTO, StatisticsTypeDTO>({
            query: (data) => ({
                url: `${RESOURCES.STATISTICS_TYPE}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error) => error ? [] : [{ type: RESOURCES.STATISTICS_TYPE, id: 'LIST' }]
        }),
        updateStatisticsType: builder.mutation<StatisticsTypeDTO, StatisticsTypeDTO>({
            query: (data) => ({
                url: `${RESOURCES.STATISTICS_TYPE}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.STATISTICS_TYPE, id: arg.id }]
        }),
        deleteStatisticsType: builder.mutation<StatisticsTypeDTODelete, StatisticsTypeDTODelete>({
            query: (data) => ({
                url: `${RESOURCES.STATISTICS_TYPE}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.STATISTICS_TYPE, id: arg.id }]
        })
    })
})

export const {
    useGetOneStatisticsTypeQuery,
    useGetStatisticsTypeListQuery,
    useCreateStatisticsTypeMutation,
    useUpdateStatisticsTypeMutation,
    useDeleteStatisticsTypeMutation
} = apiStatisticsType;