import axios, { AxiosRequestConfig, RawAxiosRequestHeaders, AxiosError } from 'axios';
import { type BaseQueryFn } from '@reduxjs/toolkit/query';
import urlJoin from 'url-join';
import { encode } from 'base-64';

export type ItechBaseRequest = {
    // Main identifying URL to be joined with Base URL + async + optional
    url: string;
    // HTML Method
    method: AxiosRequestConfig['method'];
    // HTML Request Body
    data?: AxiosRequestConfig['data'];
    // Params
    params?: AxiosRequestConfig['params'];
    // Add Async keyword to Base URL
    useAsync?: boolean;
    // Add HOSPITAL ID from local storage
    useHospitalID?: boolean;
    // Additional headers that needs to be merged with base headers
    headers?: RawAxiosRequestHeaders;
} & Partial<AxiosRequestConfig>;

type RequestError = {
    error: {
        status: number | UnderlyingByteSource;
        data: Record<string, unknown> | string;
    }
}

const prepareHeaders = (): RawAxiosRequestHeaders => ({
    Accept: '*/*',
    Authorization: 'Basic ' + encode('sysadmin:itrp142536'),
})

export type BaseQueryArgs = {
    baseUrl: string;
}
export const ITechBaseQuery = (
    args: BaseQueryArgs
): BaseQueryFn<ItechBaseRequest, unknown, unknown> => {
    return async (queryArgs, _api, _extraOptions) => {
        const {
            url,
            useAsync = false,
            useHospitalID = false,
            headers,
            ...axiosOptions
        } = queryArgs;
        try {
            // const hospitalID = localStorage.getItem('hID');
            const hospitalID = '72131';
            const hospitalURL = `hospital/${hospitalID}`;
            // const finalUrl = urlJoin(args.baseUrl, useAsync ? 'async' : '', useHospitalID ? hospitalURL : '', url);
            const finalHeaders = {...prepareHeaders(), ...headers};
            const result = await axios({
                url: args.baseUrl,
                // headers: finalHeaders,
                ...axiosOptions
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            throw {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message
                }
            }
        }
    }
}
export const ITechBaseQueryWithReauth = (
    args: BaseQueryArgs
): BaseQueryFn<ItechBaseRequest, unknown, unknown> => {
    return async (queryArgs, api, extraOptions) => {
        try {
            const result = await ITechBaseQuery(args)(queryArgs, api, extraOptions);
            return result;
        } catch (e) {
            const err = e as RequestError;
            // const { error } = err;
            return err;
        }
    }
}
