import { loginApi } from "../../../lib/api";
import { IJwtToken } from "../../../types/dto/user";
import { LoginCredentialsDTO } from "../types";

const loginApiPermitAll = loginApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query<IJwtToken, LoginCredentialsDTO>({
            query: (credentials: LoginCredentialsDTO) => ({
                url: 'login',
                method: 'POST',
                data: credentials,
                useHospitalID: true,
            })
        })
    })
})

export const { useLazyLoginQuery, useLoginQuery } = loginApiPermitAll;
