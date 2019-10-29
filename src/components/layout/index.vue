<template>
    <el-container>
        <el-container>
            <el-aside>
                <user-info :user-info="userInfo">
                    <action-menu></action-menu>
                </user-info>
                <ul class="menu">
                    <li
                        v-for="item in sideData"
                        :key="item._id"
                        :class="{'active': path === item.url}"
                        @click="handleRouter(item.url)">
                        <i :class="item.icon"></i>
                        {{ item.title }}
                    </li>
                </ul>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserInfo from './src/UserInfo.vue';
import ActionMenu from './src/ActionMenu.vue';
import api from '@/utils/api';

@Component({
    components: {
        UserInfo,
        ActionMenu,
    },
})
export default class Layout extends Vue {
    private userInfo: any = {};
    private sideData: any = [
        // {
        //     _id: '0',
        //     title: '数据统计',
        //     url: '/home',
        //     icon: 'el-icon-s-data',
        // },
        {
            _id: '1',
            title: '话题管理',
            url: '/tag',
            icon: 'el-icon-s-management',
        },
        {
            _id: '11',
            title: '文件管理',
            url: '/file',
            icon: 'el-icon-folder',
        },
        {
            _id: '2',
            title: '用户管理',
            url: '/user',
            icon: 'el-icon-s-custom',
        },
        // {
        //     _id: '3',
        //     title: '消息管理',
        //     url: '/user',
        //     icon: 'el-icon-message-solid',
        // },
        // {
        //     _id: '4',
        //     title: '广告管理',
        //     url: '/user',
        //     icon: 'el-icon-s-platform',
        // },
        // {
        //     _id: '5',
        //     title: '友情链接',
        //     url: '/user',
        //     icon: 'el-icon-s-claim',
        // },
        // {
        //     _id: '6',
        //     title: '系统设置',
        //     url: '/setting',
        //     icon: 'el-icon-s-tools',
        // },
    ];

    get path() {
        return this.$route.path;
    }

    private created() {
        this.getUserInfo();
    }

    private handleRouter(url: string) {
        this.$router.push(url);
    }

    // 获取用户信息
    private getUserInfo() {
        api.userInfo().then((res: any) => {
            this.userInfo = res.data;
        });
    }
}
</script>

<style lang="scss">
    .el-aside{
        position: absolute;
        left: 0;
        top: 0px;
        right: 220px;
        bottom: 0;
        background: #212323;
        width: 220px !important;
        .menu{
            border-top: 1px solid #151515;
            li{
                line-height: 44px;
                padding: 0 10px;
                cursor: pointer;
                border-bottom: 1px solid #151515;
                color: #888;
                transition: all 0.3s;
                font-size: 12px;
                &:hover{
                    color: #fff;
                }
                &.active{
                    color: #409EFF;
                }
            }
        }
    }
    .el-main{
        position: absolute;
        left: 220px;
        top: 0px;
        right: 0;
        bottom: 0;
        background: #f5f5f5;
        padding: 10px;
    }
</style>
