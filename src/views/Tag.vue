<template>
    <div
        v-loading="loading"
        class="tag">
        <div class="tag__header">
            <el-button
                icon="el-icon-plus"
                type="primary"
                @click="handleOpenAdd">添加标签</el-button>
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
                    prop="articleCount"
                    label="文章数量"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="createUserId.nickname"
                    label="创建者">
                </el-table-column>
                <el-table-column
                    :formatter="formatCreateDate"
                    prop="createTime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="editUserId.nickname"
                    label="编辑者">
                </el-table-column>
                <el-table-column
                    :formatter="formatEditDate"
                    prop="createTime"
                    label="编辑时间">
                </el-table-column>
                <el-table-column
                    width="180">
                    <template slot-scope="scope">
                        <el-button
                            icon="el-icon-edit"
                            @click="handleOpenEdit(scope.row)"></el-button>
                        <el-button
                            icon="el-icon-delete"
                            type="danger"
                            @click="handleDelete(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <modal
            :title="modalTitle"
            :visible="visible"
            width="400px"
            @close="handleClose">
            <el-form
                label-width="60px">
                <el-form-item
                    label="名称：">
                    <el-input
                        v-model="form.title"
                        placeholder="请输入标签名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        :loading="loading"
                        type="primary"
                        @click="handleSave">确定</el-button>
                </el-form-item>
            </el-form>
        </modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Modal from '_c/modal/index.vue';
import api from '@/utils/api';
import utils from '@/utils/utils';

@Component({
    components: {
        Modal,
    },
})
export default class Tag extends Vue {
    private tableData: object[] = [];
    private loading: boolean = false;
    private visible: boolean = false;
    private modalType: string = 'add';
    private activeId: string = '';
    private form: any = {};

    get modalTitle() {
        return this.modalType === 'add' ? '新增' : '编辑';
    }

    private formatEditDate(row: any) {
        const { editTime } = row;
        return utils.formatTime(editTime);
    }

    private formatCreateDate(row: any) {
        const { createTime } = row;
        return utils.formatTime(createTime);
    }

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

    private handleClose() {
        this.visible = false;
    }

    private handleOpenAdd() {
        this.visible = true;
        this.modalType = 'add';
        this.form = {};
    }

    private handleOpenEdit(row: any) {
        const { _id, title } = row;
        this.visible = true;
        this.modalType = 'edit';
        this.activeId = _id;
        this.form = {
            title,
        };
    }

    private handleSave() {
        const { title } = this.form;
        const params: any = {
            title,
        };
        if (this.modalType === 'edit') {
            params.tagId = this.activeId;
        }
        this.loading = true;
        const apiStr = this.modalType === 'add' ? 'tagAdd' : 'tagEdit';
        api[apiStr](params).then((res: any) => {
            this.loading = false;
            this.handleClose();
            this.getList();
        }).catch(() => {
            this.loading = false;
        });
    }

    private async handleDelete(row: any) {
        this.$confirm('确认删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            confirmButtonClass: 'el-button--danger'
        }).then(() => {
            const { _id } = row;
            this.loading = true;
            api.tagDelete(_id).then(() => {
                this.loading = false;
                this.$message({
                    message: '删除成功！',
                    type: 'warning'
                });
                this.getList();
            }).catch(() => {
                this.loading = false;
            });
        }).catch(() => {});
    }

}
</script>
