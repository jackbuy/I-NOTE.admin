<template>
    <div class="login">
        <el-form
            ref="form"
            :rules="rules"
            :model="form">
            <el-form-item
                prop="email">
                <el-input
                    v-model="form.email"
                    placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item
                prop="password">
                <el-input
                    v-model="form.password"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    :loading="loading"
                    class="submit"
                    type="primary"
                    @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import api from '@/utils/api';

@Component
export default class Login extends Vue {
    private form: any = {};
    private loading: boolean = false;

    private rules: any = {
        email: [
            { required: true, message: '必填' }
        ],
        password: [
            { required: true, message: '必填' }
        ]
    };

    private handleLogin() {
        this.$refs['form'].validate((valid: any) => {
            if (valid) {
                const { email, password } = this.form;
                const params: any = {
                    email,
                    password,
                    type: 'super'
                };
                this.loading = true;
                api.userLogin(params).then((res: any) => {
                    const { token, userId } = res.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    axios.defaults.headers.common['token'] = token;
                    setTimeout(() => {
                        this.$router.push('/');
                    });
                }).catch(() => {
                    this.loading = false;
                });
            }
        });
    }
}
</script>

<style lang="scss">
.login{
    width: 300px;
    margin: 80px auto;
    padding: 20px;
    border: 1px solid #f5f5f5;
    .submit{
        width: 100%;
    }
}
</style>