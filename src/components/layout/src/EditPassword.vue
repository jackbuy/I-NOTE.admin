<template>
    <modal
        :title="modalTitle"
        :visible="visible"
        :width="modelWidth"
        @handleClose="handleClose">
        <el-form
            ref="form"
            :label-width="labelWidth"
            :rules='formRules'
            :model="form"
            @submit.native.prevent>
            <el-form-item
                prop="oldPassword"
                label="当前密码">
                <el-input
                    type="password"
                    show-password
                    placeholder="请输入当前密码"
                    v-model="form.oldPassword">
                </el-input>
            </el-form-item>
            <el-form-item
                prop="newPassword"
                label="新密码">
                <el-input
                    type="password"
                    show-password
                    placeholder="请输入新密码"
                    v-model="form.newPassword">
                </el-input>
            </el-form-item>
            <el-form-item
                prop="newPasswordRepeat"
                label="确认密码">
                <el-input
                    type="password"
                    show-password
                    placeholder="请再次输入新密码"
                    v-model="form.newPasswordRepeat">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="handleEdit">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </modal>
</template>

<script>
import Modal from '@/common/components/modal';
import message from '@/common/mixins/message';
import api from '@/api';
export default {
    name: 'EditPassword',
    components: { Modal },
    mixins: [message],
    props: {
        modalTitle: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value !== '') {
                if (this.form.newPasswordRepeat !== '') {
                    this.$refs.form.validateField('newPasswordRepeat');
                }
                callback();
            } else {
                callback(new Error('新密码不能为空！'));
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (value !== '') {
                if (value !== this.form.newPassword) {
                    callback(new Error('两次密码输入不一致！'));
                } else {
                    callback();
                }
            } else {
                callback(new Error('请再次输入密码！'));
            }
        };
        return {
            modelWidth: '400px',
            labelWidth: '100px',
            form: {},
            formRules: {
                oldPassword: [
                    { required: true, message: '当前密码不能为空！', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                newPasswordRepeat: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        resetFrom() {
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
        },
        handleEdit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    const { oldPassword, newPassword } = this.form;
                    api.checkpassword({ password: oldPassword }).then((res) => {
                        api.editpassword({ password: newPassword }).then(() => {
                            this.showSuccessMsg('修改密码成功！');
                            this.handleClose();
                        });
                    }).catch((err) => {
                        this.showErrorMsg(err.message);
                    });
                }
            });
        },
        handleClose() {
            this.$emit('handleClose');
            this.resetFrom();
        }
    }
};
</script>
