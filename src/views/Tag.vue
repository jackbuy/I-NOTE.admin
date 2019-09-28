<template>
    <div class="tag">
        <div class="tag__header">
            <el-button>添加标签</el-button>
        </div>
        <div class="tag__content">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="标签"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="createUserId._id"
                    label="创建者">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="articleCount"
                    label="文章数量"
                    width="180">
                </el-table-column>
                <el-table-column
                    width="180">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/utils/api';

@Component
export default class Tag extends Vue {
    private tableData: object[] = [];
    private loading: boolean = false;

    private created() {
        this.getList();
    }

    private getList() {
        const params: any = {
            currentPage: 1,
            pageSize: 10,
        };
        this.loading = true;
        api.tagQuery(params).then((res: any) => {
            this.tableData = res.data;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }

    private handleOpen(row: any) {
        // console.log(row);
    }

    private handleAdd(row: any) {
        // console.log(row);
    }

    private handleEdit(row: any) {
        // console.log(row);
    }

    private async handleDelete(row: any) {
        // console.log(row);
    }

}
</script>
