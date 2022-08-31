import { AxiosResponse } from 'axios';

export const checkResponse = (res: AxiosResponse) => {
    const { data, status } = res;
    console.log(res);
    if (status >= 200 && status < 300) {
        return res;
    }
    return '';
/*     if (message) return Promise.reject(new Error(`Bad request: ${res.status} : ${String(message)}`));
    return Promise.reject(new Error(`Bad request: ${res.status}`));
 */ };
