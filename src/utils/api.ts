import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    userLogin: (params: any) => http('post', `${apiBaseUrl}/user/login`, params),

    // Tag列表
    tagQuery: (params: any) => http('post', `${apiBaseUrl}/tag/query`, params),
};
