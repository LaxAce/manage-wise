import Axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

import constants from "@constants/index";
import { CookiesEnum } from "@constants/enums";
import { getCookie } from "app/server-actions/cookieActions";

interface ClientParamType {
    path: string;
    method: Method;
    data?: object;
    contentType?: string;
}

export async function Client(params: ClientParamType): Promise<AxiosResponse<{ status: "success" | "error", data: any, message: string }>> {
    const {
        path,
        method,
        data,
        contentType = "application/json",
    } = params;

    const token = await getCookie(CookiesEnum.AUTH_TOKEN) ?? "";

    const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': `${contentType}`
    };

    const url = `${constants.baseUrl}/api/v1${path}`;
    const requestConfig: AxiosRequestConfig = {
        method,
        url,
        data,
        headers,
        responseType: "json",
    };

    try {
        const response = await Axios(requestConfig);

        return response && response.data;
    } catch (error: any) {
        throw error?.response?.data ?? {
            status: "error",
            message: "Something went wrong. Please try again later",
            data: null
        };
    }
}
