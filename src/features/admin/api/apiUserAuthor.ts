import { api } from "../../../lib/api";
import { UserAuthorDTO, UserAuthorDTOCreate, UserAuthorDTODelete, UserAuthorDTOUpdate } from "../../../types/dto/userAuthor";
import { RESOURCES } from "../../../types/resources";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GetManyResourceQueryResult, GetManyResourceQuery, GenericFilter } from "../../../types/api";

const apiUserAuthor = api.injectEndpoints({
    endpoints: (builder) => ({
        getOneUserAuthor: builder.query<UserAuthorDTO, { id: string }>({
            query: ({ id }) => ({
                url: `${RESOURCES.USER_AUTHOR}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.USER_AUTHOR, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        getUserAuthorList: builder.query<
            GetManyResourceQueryResult<UserAuthorDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, 'role');
                return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.USER_AUTHOR, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.USER_AUTHOR, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        createUserAuthor: builder.mutation<UserAuthorDTOCreate, UserAuthorDTOCreate>({
            query: (data) => ({
                url: `${RESOURCES.USER_AUTHOR}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error) => error ? [] : [{ type: RESOURCES.USER_AUTHOR, id: 'LIST'}],
        }),
        updateUserAuthor: builder.mutation<UserAuthorDTOUpdate, UserAuthorDTOUpdate>({
            query: (data) => ({
                url: `${RESOURCES.USER_AUTHOR}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.USER_AUTHOR, id: arg.id }]
        }),
        deleteUserAuthor: builder.mutation<UserAuthorDTODelete, UserAuthorDTODelete>({
            query: (data) => ({
                url: `${RESOURCES.USER_AUTHOR}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (_result, error, arg) => error ? [] : [{ type: RESOURCES.USER_AUTHOR, id: arg.id }]
        })
    })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetOneUserAuthorQuery,
    useGetUserAuthorListQuery,
    useCreateUserAuthorMutation,
    useUpdateUserAuthorMutation,
    useDeleteUserAuthorMutation
} = apiUserAuthor;