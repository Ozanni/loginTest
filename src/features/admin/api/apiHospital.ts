import { api } from "../../../lib/api";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult } from "../../../types/api";
import { HospitalDTO } from "../../../types/dto/hospital";
import { RESOURCES } from "../../../types/resources";

const apiHospital = api.injectEndpoints({
    endpoints: (builder) => ({
        getOneHospital: builder.query<HospitalDTO, { id: string }>({
            query: ({ id }) => ({
                url: `${RESOURCES.HOSPITAL}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.HOSPITAL, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        getHospitalList: builder.query<
            GetManyResourceQueryResult<HospitalDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, RESOURCES.HOSPITAL);
                return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.HOSPITAL, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.HOSPITAL, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        createHospital: builder.mutation<HospitalDTO, HospitalDTO>({
            query: (data) => ({
                url: `${RESOURCES.HOSPITAL}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error) => error ? [] : [{ type: RESOURCES.HOSPITAL, id: 'LIST' }]
        }),
        updateHospital: builder.mutation<HospitalDTO, HospitalDTO>({
            query: (data) => ({
                url: `${RESOURCES.HOSPITAL}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.HOSPITAL, id: arg.id }]
        }),
        deleteHospital: builder.mutation<HospitalDTO, { id: string }>({
            query: (data) => ({
                url: `${RESOURCES.HOSPITAL}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.HOSPITAL, id: arg.id }]
        })
    })
})

export const {
    useGetOneHospitalQuery,
    useGetHospitalListQuery,
    useCreateHospitalMutation,
    useUpdateHospitalMutation,
    useDeleteHospitalMutation
} = apiHospital;