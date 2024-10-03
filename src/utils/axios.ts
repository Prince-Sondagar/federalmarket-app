import axios, { AxiosResponse } from "axios";
import { generateUUId, getItemAsyncStorage } from ".";
import { ACCESS_TOKEN } from "../constants";

let prevRequestId: string | null = null;

const axiosClient = () => {
    const axiosInstance = axios.create({
        baseURL: "http://fdm-spring-1614418193.ap-south-1.elb.amazonaws.com"
    });

    axiosInstance.interceptors.request.use(async (config) => {
        config.headers["accept"] = "application/json";
        config.headers["X-FDM-Request-Id"] = prevRequestId ?? generateUUId();
        config.headers["Content-Type"] = "application/json";
        config.headers["X-Auth-Token"] = await getItemAsyncStorage(ACCESS_TOKEN);
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            // Reset prevRequestId on successful response
            prevRequestId = null;
            return response;
        },
        (error) => {
            // Store previous requestId on error 
            prevRequestId = error.config.headers['X-FDM-Request-Id'];
            return Promise.reject(error);
        }
    );
    return axiosInstance;
};

const API = axiosClient();

export default API;
