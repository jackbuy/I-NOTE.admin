<template>
    <div class="page404">
        <div class="page404-title">404</div>
        <div class="page404-descript">抱歉，您访问页面不存在！</div>
        <div class="page404-button"><el-button size="mini " round @click="handleToHome">返回首页</el-button></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Page404 extends Vue {
    private handleToHome() {
        this.$router.push('/');
    }
}
</script>

<style lang="scss">
    .page404{
        padding: 50px;
        &-title{
            font-size: 24px;
        }
        &-descript{
            padding-top: 20px;
        }
        &-button{
            margin-top: 15px;
        }
    }
</style>
