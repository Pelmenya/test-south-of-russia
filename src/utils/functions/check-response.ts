import { AxiosResponse } from 'axios';

export const checkResponse = (res: AxiosResponse) => {
    const { status } = res;
    if (status >= 200 && status < 300) {
        return res;
    }
    return res;
};
