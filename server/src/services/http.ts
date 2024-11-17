import axios from "axios"

export interface RequestConfig {
    body?: any
    headers?: any
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    path: string
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
}

export interface HttpService {
    request<T>(config: RequestConfig): Promise<T>
}

export class AxiosHttpService implements HttpService {

    constructor(private baseUrl: string) {
    }

    request<T>(config: RequestConfig): Promise<T> {
        return axios({
            url: `${this.baseUrl}${config.path}`,
            data: config.body,
            headers: config.headers,
            method: config.method,
            responseType: config.responseType ?? 'json'
        }).then( response => {
            if (response.status < 300) {
                return response.data
            }
            throw new Error(response.data)
        }).catch( (error) => {
            console.log(`fetch-error: ${this.baseUrl}${config.path}`)
            console.log(config)
            
            throw Error(error)
        })
    }

}