import axios, { type AxiosRequestHeaders } from "axios";
import type AuthResponse from "../Models/Auth/AuthResponse";

const $api = axios.create();

$api.interceptors.request.use(
    config => {
        if (!localStorage.getItem("accessToken")) {
            return config;
        }
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        } as AxiosRequestHeaders;

        return config;
    },
    e => Promise.reject(e)
);

$api.interceptors.response.use(
    r => r,
    async error => {
        if (error.response.status !== axios.HttpStatusCode.Unauthorized) {
            throw error;
        }
        if (!localStorage.getItem("refreshToken") || error.config.retry) {
            throw error;
        }

        console.log("Refresh Attempt");
        const { data } = await axios.get<AuthResponse>("/api/auth/refresh", { headers: { Authorization: `Bearer ${localStorage.getItem("refreshToken")}` } });;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        const newRequest = {
            ...error.config,
            retry: true,
        };

        return $api(newRequest);
    }
);

export default $api;