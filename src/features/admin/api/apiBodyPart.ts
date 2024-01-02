import { api } from "../../../lib/api";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult } from "../../../types/api";
import { BodyPartDTO, BodyPartDTOCreate, BodyPartDTODelete, BodyPartDTOUpdate } from "../../../types/dto/bodyPart";
import { RESOURCES } from "../../../types/resources";

const apiBodyPart = api.injectEndpoints({
    endpoints: (builder) => ({
        getBodyPart: builder.query<BodyPartDTO, { id: string }>({
            query: ({ id }) => ({
                url: `${RESOURCES.BODY_PART}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false,
            }),
            providesTags: (result, error) =>
                error ? [] : [{ type: RESOURCES.BODY_PART, id: result?.id }],
            transformResponse: transformResponseGeneric,
        }),
        getBodyPartList: builder.query<
            GetManyResourceQueryResult<BodyPartDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, RESOURCES.BODY_PART);
                return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.BODY_PART, id: 'LIST' },
                    ...result.list.map((item) => ({
                    type: RESOURCES.BODY_PART,
                    id: item.id,
                })),
            ],
            transformResponse: transformListResponseGeneric,
        }),
        createBodyPart: builder.mutation<BodyPartDTOCreate, BodyPartDTOCreate>({
            query: (data) => ({
                url: `${RESOURCES.BODY_PART}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false,
            }),
            invalidatesTags: (_result, error) =>
                error ? [] : [{ type: RESOURCES.BODY_PART, id: 'LIST' }],
        }),
        updateBodyPart: builder.mutation<BodyPartDTOUpdate, BodyPartDTOUpdate>({
            query: (data) => ({
                url: `${RESOURCES.BODY_PART}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false,
            }),
            invalidatesTags: (_result, error, arg) =>
                error ? [] : [{ type: RESOURCES.BODY_PART, id: arg.id }],
        }),
        deleteBodyPart: builder.mutation<BodyPartDTODelete, BodyPartDTODelete>({
            query: (data) => ({
                url: `${RESOURCES.BODY_PART}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false,
            }),
            invalidatesTags: (_result, error, arg) =>
                error ? [] : [{ type: RESOURCES.BODY_PART, id: arg.id }],
        }),
      }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetBodyPartQuery,
    useGetBodyPartListQuery,
    useCreateBodyPartMutation,
    useUpdateBodyPartMutation,
    useDeleteBodyPartMutation,
} = apiBodyPart;