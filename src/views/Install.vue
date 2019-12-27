<template>
    <div class="install">
        <el-form>
            <el-form-item>
                <el-input
                    placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    placeholder="验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
</script>

<style lang="scss">
.install{
    width: 300px;
    margin: 80px auto;
    padding: 20px;
    border: 1px solid #f5f5f5;
    .submit{
        width: 100%;
    }
}
</style>
