<template>
    <div class="action-menu">
        <span title="首页">
            <i class="el-icon-s-home"></i>
        </span>
        <span
            title="展开/收起"
            @click="handleToggle">
            <i class="el-icon-s-fold"></i>
        </span>
        <span
            title="刷新"
            @click="handleReoad">
            <i class="el-icon-refresh"></i>
        </span>
        <span
            title="退出"
            @click="handleLogOut">
            <i class="el-icon-switch-button"></i>
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ActionMenu extends Vue {

    // 展开与收起
    private handleToggle() {}

    // 刷新
    private handleReoad() {
        window.location.reload();
    }

    // 退出登录
    private handleLogOut() {
        this.$confirm('确认退出系统吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            confirmButtonClass: 'el-button--danger'
        }).then(() => {
            this.$router.push('/login');
        }).catch(() => {});
    }
}
</script>

<style lang="scss">
.action-menu{
    color: #999;
    border-top: 1px solid #151515;
    text-align: center;
    padding: 10px 0;
    span{
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 10px;
        margin: 0 9px;
        transition: all 0.3s;
        border-radius: 5px;
        font-size: 16px;
        &:hover{
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
        }
    }
}
</style>