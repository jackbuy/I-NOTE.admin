<template>
    <div class="link">
        <div class="link__header">
            <el-button
                type="primary"
                @click="handleOpenModal('add')">新增</el-button>
        </div>
        <div class="link__content">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="名称">
                    <template slot-scope="scope">
                        <span @click="handleUrl(scope.row.url)" class="cursor">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="描述"
                    width="400">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleOpenModal('edit', scope.row)">编辑</el-button>
                        <el-button @click="handleDelete(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <link-modal
            v-if="showModal"
            v-model="showModal"
            :modal-type="modalType"
            :form-data="form"
            @save="handleSave"></link-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LinkModal from '_c/linkModal/index.vue';
import api from '@/utils/api';

@Component({
    components: {
        LinkModal
    }
})
export default class Link extends Vue {
    private tableData: any = [];
    private showModal: boolean = false;
    private activeId: string = '';
    private modalType: string = '';
    private form: any = {};
    private pageConfig: any = {
        currentPage: 1,
        pagesize: 10,
        total: 0
    };

    private created() {
        this.getListData();
    }

    private getListData() {
        const params: any = {
            ...this.pageConfig
        };
        api.linkQuery(params).then((res: any) => {
            this.tableData = res.data;
        });
    }

    private handleOpenModal(type: string, row: any) {
        if (type === 'edit') {
            const { _id, title, url, description } = row;
            this.activeId = _id;
            this.form = {
                title,
                url,
                description
            };
        } else {
            this.form = {};
        }
        this.modalType = type === 'add' ? type : 'edit';
        this.showModal = true;
    }

    private handleSave(form: any) {
        const params: any = {
            ...form,
            linkId: this.modalType === 'add' ? null : this.activeId
        };
        const apiStr: string = this.modalType === 'add' ? 'linkAdd' : 'linkEdit';
        const Api: any = api;
        Api[apiStr](params).then(() => {
            this.getListData();
        });
    }

    private handleDelete(linkId: string) {
        api.linkDelete(linkId).then(() => {
            this.getListData();
        });
    }

    private handleUrl(url: string) {
        window.open(url);
    }
}
</script>

<style lang="scss">
.link{
    &__header{
        margin-bottom: 1px;
        background: #fff;
        padding: 12px;
    }
    .cursor{
        cursor: pointer;
        color: #409EFF;
        &:hover{
            text-decoration: underline;
        }
    }
}
</style>
