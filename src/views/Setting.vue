<template>
    <div>
        <el-form
            :label-width="labelWidth">
            <el-form-item
                label="系统名称">
                <el-input
                    v-model="form.name"
                    placeholder="请输入系统名称"></el-input>
            </el-form-item>
            <el-form-item
                label="系统描述">
                <el-input
                    v-model="form.description"
                    placeholder="请输入系统描述"></el-input>
            </el-form-item>
            <el-form-item
                label="系统关键字">
                <el-input
                    v-model="form.key"
                    placeholder="请输入系统关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSave">确定</el-button>
            </el-form-item>
        </el-form
        >
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/utils/api';

@Component
export default class Setting extends Vue {
    private labelWidth: string = '100px';
    private form: any = {};
    private isEdit: boolean = false;

    private created() {
        this.getSystemDetail();
    }

    private getSystemDetail() {
        api.systemDetail().then((res: any) => {
            if (res.data) {
                this.isEdit = true;
                this.form = res.data;
            } else {
                this.isEdit = false;
            }
        });
    }

    private handleSave() {
        const params: any = {
            ...this.form
        };
        const apiStr = this.isEdit === true ? 'systemEdit' : 'systemAdd';
        api[apiStr](params).then((res: any) => {
            this.getSystemDetail();
        }).catch(() => {
        });
    }

}
</script>
