<template>
    <div class="login">
        <el-form
            label-width="60px">
            <el-form-item
                label="邮箱">
                <el-input
                    v-model="form.email"
                    placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item
                label="密码">
                <el-input
                    v-model="form.password"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/utils/api';

@Component
export default class Login extends Vue {
    private form: any = {};
    private loading: boolean = false;

    private handleLogin() {
        const { email, password } = this.form;
        const params = {
            email,
            password,
        };
        this.loading = true;
        api.userLogin(params).then((res: any) => {
            const { token, userId } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            this.$router.push('/');
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }
}
</script>

<style lang="scss">
.login{
    width: 400px;
    margin: 80px auto;
    padding: 20px;
    border: 1px solid #f5f5f5;
}
</style>