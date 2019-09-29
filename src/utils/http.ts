import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs';

axios.defaults.headers.common.token = localStorage.getItem('token') || '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use((config: any) => {
    if (config.method === 'post' || config.method === 'put') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error: any) => {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use((config: any): any => {
    if (config.status === 200) {
        if (config.data.code === 200) {
            return Promise.resolve(config.data);
        } else {
            if (config.data.msg) {
                Message.warning({ message: config.data.msg });
            }
            if (config.data.code === 401) {
                localStorage.clear();
                window.location.reload();
            }
            return Promise.reject(config.data);
        }
    } else {
        Message.warning({message: '数据请求异常！'});
    }
}, (error: any) => {
    Message.warning({message: '数据请求异常！'});
    return Promise.reject(error);
});

const http = (method: any, url: string, data?: any) => {
    return new Promise((resolve, reject) => {
        axios({
            method,
            url,
            data,
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

export default http;
