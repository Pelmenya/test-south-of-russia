import axios from 'axios';
import { BASE_URL } from 'utils/constants/api-routes';
import { checkResponse } from 'utils/functions/check-response';

export interface UserData {
    name: string;
    email: string;
    password: string;
}

class NewsAPI {
    server: string;

    constructor(server: string) {
        this.server = server;
    }

    getNews = async () => axios.get(BASE_URL).then(checkResponse);
}

export const newsAPI = new NewsAPI(BASE_URL);
