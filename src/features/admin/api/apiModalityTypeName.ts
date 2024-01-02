import { api } from "../../../lib/api";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult } from "../../../types/api";
import { ModalityTypeNameDTO, ModalityTypeNameDTOCreate, ModalityTypeNameDTODelete, ModalityTypeNameDTOUpdate } from "../../../types/dto/modalityTypeName";
import { RESOURCES } from "../../../types/resources";

const apiModalityTypeName = api.injectEndpoints({
    endpoints: (builder) => ({
        getOneModalityTypeName: builder.query<ModalityTypeNameDTO, { id: string }>({
            query: ({ id }) => ({
                url: `${RESOURCES.MODALITY_TYPE_NAME}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.MODALITY_TYPE_NAME, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        getModalityTypeNameList: builder.query<
            GetManyResourceQueryResult<ModalityTypeNameDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, RESOURCES.MODALITY_TYPE_NAME);
                return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.MODALITY_TYPE_NAME, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.MODALITY_TYPE_NAME, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        createModalityTypeName: builder.mutation<ModalityTypeNameDTOCreate, ModalityTypeNameDTOCreate>({
            query: (data) => ({
                url: `${RESOURCES.MODALITY_TYPE_NAME}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error) => error ? [] : [{ type: RESOURCES.MODALITY_TYPE_NAME, id: 'LIST' }],
        }),
        updateModalityTypeName: builder.mutation<ModalityTypeNameDTOUpdate, ModalityTypeNameDTOUpdate>({
            query: (data) => ({
                url: `${RESOURCES.MODALITY_TYPE_NAME}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.MODALITY_TYPE_NAME, id: arg.id }]
        }),
        deleteModalityTypeName: builder.mutation<ModalityTypeNameDTODelete, ModalityTypeNameDTODelete>({
            query: (data) => ({
                url: `${RESOURCES.MODALITY_TYPE_NAME}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.MODALITY_TYPE_NAME, id: arg.id }]
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetOneModalityTypeNameQuery,
    useGetModalityTypeNameListQuery,
    useCreateModalityTypeNameMutation,
    useUpdateModalityTypeNameMutation,
    useDeleteModalityTypeNameMutation
} = apiModalityTypeName;