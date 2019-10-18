<template>
    <div>
        <div class="user-info">
            <div class="img">
                <i v-if="!userImg" class="el-icon-user"></i>
                <img v-else :src="userImg" alt="">
            </div>
            <div class="info">
                <div class="name">{{ userName }}</div>
                <div class="role">超级管理员</div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { apiBaseUrl } from '@/constants/url-config';

@Component
export default class Userinfo extends Vue {
    @Prop(Object)
    private userInfo: any;

    get userImg() {
        if (this.userInfo && this.userInfo.avatar) {
            return `${apiBaseUrl}/${this.userInfo.avatar}`;
        }
    }

    get userName() {
        if (this.userInfo) {
            return this.userInfo.nickname;
        }
    }
}
</script>

<style lang="scss">
    .user-info{
        display: flex;
        padding: 10px;
        .img{
            display: inline-block;
            width: 54px;
            height: 54px;
            line-height: 54px;
            text-align: center;
            font-size: 0;
            background: rgba(255, 255, 255, 0.1);
            cursor: default !important;
            padding: 0 !important;
            overflow: hidden;
            border-radius: 5px;
            i{
                font-size: 16px;
                color: #aaa;
                vertical-align: middle;
            }
            img{
                width: 100%;
            }
        }
        .info{
            flex: 1;
            color: #aaa;
            padding: 0 10px;
            .name{
                line-height: 30px;
                font-size: 13px;
            }
            .role{
                font-size: 12px;
                line-height: 24px;
                color: #777;
            }
        }
    }
</style>