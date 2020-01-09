<template>
    <el-dialog
        :title="title"
        :visible="visible"
        :width="width"
        :append-to-body="true"
        :close-on-click-modal="false"
        @close="handleClose">
        <slot></slot>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
    @Prop({
        type: String,
        default: '标题',
    })
    private title: string;

    @Prop({
        type: String,
        default: '560px',
    })
    private width: string;

    @Prop({
        type: Boolean,
        default: true
    })
    private visible: boolean;

    @Emit('close')
    private handleClose() {}
}
</script>

<style lang="scss">
    .el-dialog__title{
        font-size: 16px;
    }
    .el-dialog__header{
        border-bottom: 1px solid #eee;
        padding: 15px;
    }
    .el-dialog__body{
        padding: 20px;
    }
    .el-form-item{
        &:last-child{
            margin-bottom: 10px;
        }
    }
</style>
