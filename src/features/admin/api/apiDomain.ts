import { api } from "../../../lib/api";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult } from "../../../types/api";
import { DomainDTO, DomainDTOCreate, DomainDTODelete } from "../../../types/dto/domain";
import { RESOURCES } from "../../../types/resources";

const apiDomain = api.injectEndpoints({
    endpoints: (builder) => ({
        getOneDomain: builder.query<DomainDTO, { id: string }>({
            query: ({ id }) => ({
                url: `${RESOURCES.DOMAIN}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.HOSPITAL, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        getDomainList: builder.query<
            GetManyResourceQueryResult<DomainDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, RESOURCES.DOMAIN);
                return request;
            },
            providesTags: (result = { list: [], meta: {totalRecords: 0} }) => [
                { type: RESOURCES.DOMAIN, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.DOMAIN, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        createDomain: builder.mutation<DomainDTOCreate, DomainDTOCreate>({
            query: (data) => ({
                url: `${RESOURCES.DOMAIN}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error) => error ? [] : [{ type: RESOURCES.DOMAIN, id: 'LIST' }]
        }),
        deleteDomain: builder.mutation<DomainDTODelete, { id: string}>({
            query: (data) => ({
                url: `${RESOURCES.DOMAIN}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.DOMAIN, id: arg.id }]
        })
    }),
})

export const {
    useGetOneDomainQuery,
    useGetDomainListQuery,
    useCreateDomainMutation,
    useDeleteDomainMutation
} = apiDomain;