<template>
    <div class="login">
        <div class="login__title">
            <img src="@/assets/images/logo.jpg" alt="">
            后台管理系统
        </div>
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            @submit.native.prevent>
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
                    type="password"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    :loading="loading"
                    class="submit"
                    type="primary"
                    native-type="submit"
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
        (this.$refs.form as any).validate((valid: boolean) => {
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
                    axios.defaults.headers.common.token = token;
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
    width: 400px;
    margin: 120px auto;
    padding: 30px;
    border: 1px solid #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    background: #fff;
    .submit{
        width: 100%;
    }
    &__title{
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #787878;
        margin-bottom: 30px;
        img{
            width: 20px;
            height: 20px;
            vertical-align: top;
            display: inline-block;
            margin-right: 5px;
        }
    }
}
</style>