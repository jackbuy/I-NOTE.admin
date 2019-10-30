<template>
    <div class="photo">
        <div class="photo__header"></div>
        <div class="photo__content">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="文件"
                    width="100">
                    <template slot-scope="scope">
                        <el-image
                            style="width: 100px; height: 60px"
                            :src="`${baseUrl}/${scope.row.fileName}`"
                            fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="fileName"
                    label="文件名">
                </el-table-column>
                <el-table-column
                    prop="mimetype"
                    label="文件类型"
                    width="100">
                </el-table-column>
                <el-table-column
                    :formatter="formatSize"
                    prop="size"
                    label="文件大小"
                    width="100">
                </el-table-column>
                <el-table-column
                    :formatter="formatCreateDate"
                    prop="createTime"
                    label="上传时间"
                    width="160">
                </el-table-column>
                <el-table-column
                    :formatter="formatType"
                    prop="type"
                    label="来源"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="userId.nickname"
                    label="用户"
                    width="150">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { apiBaseUrl } from '@/constants/url-config';
import api from '@/utils/api';
import utils from '@/utils/utils';

@Component
export default class Photo extends Vue {
    private tableData: object[] = [];
    private loading: boolean = false;
    private baseUrl: string = apiBaseUrl;

    private created() {
        this.getTagList();
    }

    private getTagList() {
        this.loading = true;
        api.fileQuery().then((res: any) => {
            this.tableData = res.data;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }

    private formatCreateDate(row: any) {
        const { createTime } = row;
        return utils.formatTime(createTime);
    }

    private formatSize(row: any) {
        const { size } = row;
        const s = (size / 1024).toFixed(2);
        return `${s} KB`;
    }

    private formatType(row: any) {
        const { type } = row;
        if (type === '0') { return '文章内容'; }
        if (type === '1') { return '专题封面'; }
        if (type === '2') { return '用户头像'; }
    }
}
</script>
