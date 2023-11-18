// import { getToken } from 'reducers/token/action';

import { API_URL } from 'utils/constant';

interface IApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    params?: any;
    body?: any;
    headers?: any;
}

class ApiBase {
    private _apiUrl = API_URL;
    get(url: string, options: IApiOptions = {}) {
        return this.makeRequest(url, { ...options, method: 'GET' });
    }

    post(url: string, options: IApiOptions = {}) {
        const body = this.createBody(options.body);
        return this.makeRequest(url, {
            ...options,
            body: body,
            method: 'POST',
        });
    }

    put(url: string, options: IApiOptions = {}) {
        const body = this.createBody(options.body);
        return this.makeRequest(url, { ...options, body: body, method: 'PUT' });
    }

    delete(url: string, options: IApiOptions = {}) {
        const body = this.createBody(options.body);
        return this.makeRequest(url, {
            ...options,
            body: body,
            method: 'DELETE',
        });
    }

    createHeader = ({ ...options }: IApiOptions) => {
        const newOptions: IApiOptions = options;
        newOptions.headers = newOptions.headers || {};
        if (!newOptions.headers['Content-Type']) {
            newOptions.headers['Content-Type'] = 'application/json';
        }
        // Uncomment this when back-end authorization is ready
        // const token = getToken();
        // if (token) {
        //     newOptions.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aWVucGh1YzI1MTFAZ21haWwuY29tIiwidXNlcklkIjoiNjUyNjZkOTAtNTQ3OC0xMWVlLWE5YTAtNGI0NGY4Yzc2Yzk1Iiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiJkOTE4MzdiNC1iYjU3LTQ5ZWQtYTMwYy1lZjAzZmU5MGE5OWQiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY5NTExMDc2MiwiZXhwIjoxNjk1MTE5NzYyLCJmaXJzdE5hbWUiOiJWacOqbiBNaW5oIiwibGFzdE5hbWUiOiJQaMO6YyIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIyZDEwMGY2MC01NDc4LTExZWUtYTlhMC00YjQ0ZjhjNzZjOTUiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.nobKg5EXkIy6I_0TK8fxYhB1VlcsK7y5woeGjO2UKRhtxyp915vcKBjcNRsgP2TlPrZSSaXJMPkfDKUXNR9nPg`;
        // }
        // Delete below line when back-end authorization is ready
        // newOptions.headers.Authorization = `Bearer ${process.env.REACT_APP_JWT_TOKEN}`;
        newOptions.headers['X-AIO-Key'] = process.env.REACT_APP_AIO_KEY;
        return newOptions;
    };

    createBody = (data: any) => {
        return JSON.stringify(data);
    };

    makeRequest = async (pathUrl: string, options: IApiOptions) => {
        let url = this._apiUrl + pathUrl;
        if (options.params) {
            const paramsString = Object.keys(options.params)
                .map(key => {
                    return `${key}=${options.params[key]}`;
                })
                .join('&');
            url += `?${paramsString}`;
        }
        try {
            let optionsWithHeader = this.createHeader(options);
            let response = await fetch(url, {
                ...optionsWithHeader,
            });
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json();
            }
            return response.text();
        } catch (error: any) {
            console.log(error);
        }
    };
}

export default ApiBase;
