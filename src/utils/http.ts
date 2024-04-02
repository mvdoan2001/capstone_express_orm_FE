import axios, { AxiosInstance } from "axios";

export const BASE_URL = 'http://localhost:8080'
export const BASE_URL_IMAGE = 'http://localhost:8080/public/img'

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000,
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("LOGIN_USER"),
                'Content-Type': 'application/json'
            },
        })
    }
}

const http = new Http().instance
export default http;