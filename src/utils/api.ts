import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    userLogin: (params: any) => http('post', `${apiBaseUrl}/user/login`, params),
    // 用户信息
    userInfo: () => http('post', `${apiBaseUrl}/user/userInfo`),
    // 用户列表
    userQuery: (params: any) => http('post', `${apiBaseUrl}/user/query`, params),

    // Tag列表
    tagQuery: () => http('post', `${apiBaseUrl}/tag/query`),
    // Tag新增
    tagAdd: (params: any) => http('post', `${apiBaseUrl}/tag/add`, params),
    // Tag编辑
    tagEdit: (params: any) => http('post', `${apiBaseUrl}/tag/edit`, params),
    // Tag删除
    tagDelete: (tagId: string) => http('delete', `${apiBaseUrl}/tag/delete/${tagId}`),

    // 文件管理列表
    fileQuery: () => http('post', `${apiBaseUrl}/file/query`),

    // 广告管理
    adCateQuery: (params: any) => http('post', `${apiBaseUrl}/ad/cate/query`, params),
    adCateAdd: (params: any) => http('post', `${apiBaseUrl}/ad/cate/add`, params),
    adCateEdit: (params: any) => http('post', `${apiBaseUrl}/ad/cate/edit`, params),
    adCateDelete: (cateId: string) => http('delete', `${apiBaseUrl}/ad/cate/delete/${cateId}`),
    adListQuery: (params: any) => http('post', `${apiBaseUrl}/ad/query`, params),
    adAdd: (params: any) => http('post', `${apiBaseUrl}/ad/add`, params),
    adEdit: (params: any) => http('post', `${apiBaseUrl}/ad/edit`, params),
    adDelete: (adId: string) => http('delete', `${apiBaseUrl}/ad/delete/${adId}`),
};
