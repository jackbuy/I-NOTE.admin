<template>
    <div class="ad">
        <div class="ad__cate">
            <div class="ad__cate-header">
                <el-button
                    icon="el-icon-plus"
                    type="primary"
                    plain
                    class="w100p"
                    @click="handleOpenCateAdd">广告位</el-button>
            </div>
            <div class="ad__cate-content">
                <ul>
                    <li v-for="item in cateData" :key="item._id" :class="{'active': activeCateId === item._id}">
                        <div class="title" @click="handleCateChange(item)">{{ item.title }}</div>
                        <div class="action">
                            <span @click="handleOpenCateEdit(item)">edit</span>
                            <span @click="handleCateDelete(item)">del</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="ad__list">
            <div class="ad__list-header">
                <el-button
                    icon="el-icon-plus"
                    type="primary"
                    @click="handleOpenAdAdd">广告</el-button>
            </div>
            <div class="ad__list-content">
                <el-table
                    :data="adData"
                    style="width: 100%">
                    <el-table-column
                        label="图片"
                        prop="img"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        label="标题"
                        prop="title">
                    </el-table-column>
                    <el-table-column
                        label="创建者"
                        prop="createUserId.nickname"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        :formatter="formatCreateDate"
                        label="创建时间"
                        prop="createTime"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                            <el-button
                                icon="el-icon-edit"
                                @click="handleOpenAdEdit(scope.row)"></el-button>
                            <el-button
                                icon="el-icon-delete"
                                type="danger"
                                @click="handleAdDelete(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 广告位 新增、编辑 -->
        <modal
            v-if="cateVisible"
            :title="cateModalTitle"
            :visible="cateVisible"
            width="400px"
            @close="handleCloseCate">
            <el-form
                label-width="60px">
                <el-form-item
                    label="名称：">
                    <el-input
                        v-model="cateForm.title"
                        placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item
                    label="描述：">
                    <el-input
                        v-model="cateForm.description"
                        :rows="3"
                        type="textarea"
                        placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        :loading="cateSaving"
                        type="primary"
                        @click="handleCateSave">确定</el-button>
                </el-form-item>
            </el-form>
        </modal>
        <!-- 广告 新增、编辑 -->
        <modal
            v-if="adVisible"
            :title="adModalTitle"
            :visible="adVisible"
            width="600px"
            @close="handleCloseAd">
            <el-form
                label-width="60px">
                <el-form-item
                    label="封面：">
                    <el-input
                        v-model="adForm.img"
                        placeholder="请输入URL"></el-input>
                </el-form-item>
                <el-form-item
                    label="名称：">
                    <el-input
                        v-model="adForm.title"
                        placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item
                    label="描述：">
                    <el-input
                        v-model="adForm.description"
                        :rows="3"
                        type="textarea"
                        placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        :loading="adSaving"
                        type="primary"
                        @click="handleAdSave">确定</el-button>
                </el-form-item>
            </el-form>
        </modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Modal from '_c/modal/index.vue';
import api from '@/utils/api';
import utils from '@/utils/utils';

@Component({
    components: {
        Modal,
    },
})
export default class User extends Vue {

    private cateLoading: boolean = false;
    private cateSaving: boolean = false;
    private cateData: any = [];
    private cateModalTitle: string = '';
    private cateVisible: boolean = false;
    private cateForm: object = {};
    private activeCateId: string = ''; // 加载的cateId
    private openCateId: string = ''; // 新增、编辑

    private adLoading: boolean = false;
    private adSaving: boolean = false;
    private adData: any = [];
    private adModalTitle: string = '';
    private adVisible: boolean = false;
    private adForm: object = {};
    private activeAdId: string = '';


    private created() {
        this.getCate();
    }

    private handleOpenCateAdd() {
        this.cateVisible = true;
        this.cateModalTitle = '新增广告位';
        this.cateForm = {};
    }

    private handleCloseCate() {
        this.cateVisible = false;
    }

    private handleOpenCateEdit(row: any) {
        const { _id, title, description } = row;
        this.cateVisible = true;
        this.cateModalTitle = '编辑广告位';
        this.openCateId = _id;
        this.cateForm = {
            title,
            description
        };
    }

    private handleCateDelete(row: any) {
        const { _id } = row;
        api.adCateDelete(_id).then(() => {
            this.getCate();
            this.$message({
                message: '删除成功！',
                type: 'success',
            });
        });
    }

    // 广告位 保存
    private handleCateSave() {
        const isAdd: boolean = this.cateModalTitle === '新增广告位' ? true : false;
        this.cateSaving = true;
        const params: any = {
            ...this.cateForm
        };
        const apiStr: string = isAdd ? 'adCateAdd' : 'adCateEdit';
        const Api: any = api;
        if (!isAdd) {
            params.cateId = this.openCateId;
        }
        Api[apiStr](params).then((res: any) => {
            this.getCate();
            this.cateSaving = false;
            this.handleCloseCate();
        }).catch(() => {
            this.cateSaving = false;
        });
    }

    // 切换广告位
    private handleCateChange(row: any) {
        const { _id } = row;
        this.activeCateId = _id;
        this.getList(this.activeCateId);
    }

    private handleOpenAdAdd() {
        this.adVisible = true;
        this.adModalTitle = '新增广告';
        this.adForm = {};
    }

    private handleCloseAd() {
        this.adVisible = false;
    }

    private handleOpenAdEdit(row: any) {
        const { _id, title, img, description } = row;
        this.adVisible = true;
        this.adModalTitle = '编辑广告';
        this.activeAdId = _id;
        this.adForm = {
            _id,
            title,
            img,
            description
        };
    }

    private handleAdDelete(row: any) {
        const { _id } = row;
        api.adDelete(_id).then(() => {
            this.getList(this.activeCateId);
            this.$message({
                message: '删除成功！',
                type: 'success',
            });
        });
    }

    private handleAdSave() {
        const isAdd: boolean = this.adModalTitle === '新增广告' ? true : false;
        this.adSaving = true;
        const params: any = {
            ...this.adForm,
            cateId: this.activeCateId
        };
        const apiStr: string = isAdd ? 'adAdd' : 'adEdit';
        const Api: any = api;
        if (!isAdd) {
            params.adId = this.activeAdId;
        }
        Api[apiStr](params).then((res: any) => {
            this.getList(this.activeCateId);
            this.adSaving = false;
            this.handleCloseAd();
        }).catch(() => {
            this.adSaving = false;
        });
    }

    private getCate() {
        const params: any = {
            currentPage: 1,
            pageSize: 15,
        };
        this.cateLoading = true;
        api.adCateQuery(params).then((res: any) => {
            this.cateData = res.data;
            if (this.cateData && this.cateData.length > 0 && !this.activeCateId) {
                const { _id } = this.cateData[0];
                this.activeCateId = _id;
                this.getList(this.activeCateId);
            }
            this.cateLoading = false;
        }).catch(() => {
            this.cateLoading = false;
        });
    }

    private getList(cateId: string) {
        const params: any = {
            currentPage: 1,
            pageSize: 15,
            cateId,
        };
        this.adLoading = true;
        api.adListQuery(params).then((res: any) => {
            this.adData = res.data;
            this.adLoading = false;
        }).catch(() => {
            this.adLoading = false;
        });
    }

    private formatCreateDate(row: any) {
        const { createTime } = row;
        return utils.formatTime(createTime);
    }

}
</script>

<style lang="scss">
    .ad{
        display: flex;
        min-height: 100%;
        .w100p{
            width: 100%;
        }
        &__cate{
            width: 240px;
            background: #eee;
            /* padding: 10px; */
            &-header{
                padding: 10px;
            }
            &-content{
                li{
                    line-height: 40px;
                    background: #fff;
                    margin-bottom: 1px;
                    cursor: pointer;
                    padding: 0 10px;
                    display: flex;
                    &.active{
                        background: #f5f5f5;
                    }
                    .title{
                        flex: 1;
                    }
                    .action{
                        span{
                            margin: 0 5px;
                            font-size: 12px;
                            color: #bbb;
                        }
                    }
                }
            }
        }
        &__list{
            flex: 1;
            padding: 10px;
            &-header{
                padding-bottom: 10px;
            }
        }
    }
</style>
