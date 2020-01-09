<template>
    <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
                v-for="item in breadcrumbList"
                :key="item">
                {{ item }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Breadcrumb extends Vue {

    private breadcrumbList: any = [];

    get metaTitle() {
        return this.$route.meta.title;
    }

    @Watch('metaTitle', {immediate: true, deep: true})
    private change(newVal: string, oldVal: string) {
        this.breadcrumbList = newVal.split('-');
    }

    // 展开与收起
    private handleToggle() {
        this.$message('开发中...');
    }
}
</script>

<style lang="scss">
.breadcrumb{
    padding: 15px;
    margin-bottom: 12px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
