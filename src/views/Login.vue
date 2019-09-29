<template>
    <div class="login">
        <el-form>
            <el-form-item>
                <el-input
                    v-model="form.email"
                    placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    v-model="form.password"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    class="submit"
                    @click="handleLogin">登录</el-button>
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
    width: 300px;
    margin: 80px auto;
    padding: 20px;
    border: 1px solid #f5f5f5;
    .submit{
        width: 100%;
    }
}
</style>