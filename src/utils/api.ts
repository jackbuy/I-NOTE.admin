import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    userLogin: (params: any) => http('post', `${apiBaseUrl}/user/login`, params),

    // Tag列表
    tagQuery: (params: any) => http('post', `${apiBaseUrl}/tag/query`, params),
    // Tag新增
    tagAdd: (params: any) => http('post', `${apiBaseUrl}/tag/add`, params),
    // Tag编辑
    tagEdit: (params: any) => http('post', `${apiBaseUrl}/tag/edit`, params),
    // Tag删除
    tagDelete: (tagId: string) => http('delete', `${apiBaseUrl}/tag/delete/${tagId}`),
};
