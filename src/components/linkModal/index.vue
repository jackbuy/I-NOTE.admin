<template>
    <modal
        :title="modalTitle"
        :visible="visible"
        @close="handleClose">
        <el-form
            :label-width="labelWidth">
            <el-form-item
                label="名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item
                label="URL">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item
                label="描述">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSave">确定</el-button>
            </el-form-item>
        </el-form>
    </modal
    >
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Model } from 'vue-property-decorator';
import Modal from '_c/modal/index.vue';

@Component({
    components: {
        Modal
    }
})
export default class LinkModal extends Vue {
    @Model('change', { type: Boolean, default: false }) private visible!: boolean;

    @Prop(String) private modalType: string;
    @Prop(Object) private formData: any;

    private form: any = this.formData;
    private labelWidth: string = '60px';

    get modalTitle() {
        return this.modalType === 'add' ? '新增' : '编辑';
    }

    @Emit('change')
    private handleClose() {
        return false;
    }

    @Emit('save')
    private handleSave() {
        this.handleClose();
        return this.form;
    }
}
</script>
