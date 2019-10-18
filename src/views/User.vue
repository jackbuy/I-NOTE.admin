<template>
    <div
        v-loading="loading"
        class="user">
        <el-table
            :data="listData"
            style="width: 100%">
            <el-table-column
                prop="nickname"
                label="昵称">
            </el-table-column>
            <el-table-column
                :formatter="formatLevel"
                prop="level"
                label="等级"
                width="100">
            </el-table-column>
            <el-table-column
                prop="articleCount"
                label="文章数量"
                width="100">
            </el-table-column>
            <el-table-column
                prop="topicCount"
                label="专题数量"
                width="100">
            </el-table-column>
            <el-table-column
                prop="fansCount"
                label="粉丝数量"
                width="100">
            </el-table-column>
            <el-table-column
                :formatter="formatCreateDate"
                prop="createTime"
                label="注册时间"
                width="140">
            </el-table-column>
            <el-table-column
                :formatter="formatLastSignAtDate"
                prop="lastSignAt"
                label="上次登录时间"
                width="140">
            </el-table-column>
            <!-- <el-table-column
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button
                        icon="el-icon-edit"
                        @click="handleOpenEdit(scope.row)"></el-button>
                    <el-button
                        icon="el-icon-delete"
                        type="danger"
                        @click="handleDelete(scope.row)"></el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/utils/api';
import utils from '@/utils/utils';

@Component
export default class User extends Vue {

    private loading: boolean = false;
    private listData: any = [];

    private created() {
        this.getUserList();
    }

    private getUserList() {
        const params = {
            currentPage: 1,
            pageSize: 15,
        };
        this.loading = true;
        api.userQuery(params).then((res: any) => {
            this.listData = res.data;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }

    private formatCreateDate(row: any) {
        const { createTime } = row;
        return utils.formatTime(createTime);
    }

    private formatLastSignAtDate(row: any) {
        const { lastSignAt } = row;
        return utils.formatTime(lastSignAt);
    }

    private formatLevel(row: any) {
        const { level } = row;
        return level === 0 ? '会员' : '管理员';
    }
}
</script>
