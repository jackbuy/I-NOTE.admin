<template>
    <div class="layout-header">
        <el-row>
            <el-col :span="12">
                <span class="layout-header__logo">{{systemName}}</span>
                <span
                    v-for="breadcrumb in breadcrumbList"
                    :key="breadcrumb"
                    class="layout-header__breadcrumb">
                    {{breadcrumb}}
                </span>
            </el-col>
            <el-col :span="12" class="layout-header__menu">
                <el-dropdown class="item" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <span>{{userName}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personcenter">个人中心</el-dropdown-item>
                        <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="item" @click="handleRouterPush('/articlemanage/add')" title="写文章">
                    <i class="icon icon-xinzeng2"></i>
                </div>
                <div class="item relative" @click="handleRouterPush(messagecenter.url)" :title="messageName">
                    <span v-if="socketMsgCount > 0" class="count">{{formatCount(socketMsgCount)}}</span>
                    <i class="icon icon-xiaoxi"></i>
                </div>
                <!-- <el-dropdown class="item" @command="handleLang">
                    <span class="el-dropdown-link" title="语言">
                        <i class="icon icon-guojihua"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="en" :disabled="lang==='en'">English</el-dropdown-item>
                        <el-dropdown-item command="zh" :disabled="lang==='zh'">简体中文</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
                <!-- <div class="item relative" @click="handleFullScreen" title="皮肤">
                    <span class="red-point"></span>
                    <i class="icon icon-pifu"></i>
                </div> -->
                <div class="item" @click="handleFullScreen" title="全屏/收起全屏">
                    <i v-if="fullscreen" class="icon icon-quanpingsuoxiao"></i>
                    <i v-else class="icon icon-quanpingxianshi"></i>
                </div>
            </el-col>
        </el-row>
        <edit-password
            :modalTitle="passwordModalTitle"
            :visible="passwordModalVisible"
            @handleClose="handleClosePasswordModal">
        </edit-password>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import EditPassword from './EditPassword';
export default {
    name: 'LayoutHeader',
    components: { EditPassword },
    data() {
        return {
            fullscreen: false,
            passwordModalTitle: '',
            passwordModalVisible: false,
            lang: 'zh'
        };
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo',
            socketMsgCount: 'socketMsgCount',
            systems: 'systems',
            getSystemInfo: 'getSystemInfo'
        }),
        systemName() {
            return this.getSystemInfo.name;
        },
        userName() {
            if (this.userInfo.realname) return this.userInfo.realname;
            return this.userInfo.username;
        },
        breadcrumbList() {
            return this.$route.meta.title.split('-');
        },
        messagecenter() {
            let obj = {};
            this.systems.map((ele) => {
                if (ele.url === '/msg') obj = ele;
            });
            return obj;
        },
        messageName() {
            if (this.socketMsgCount === 0) return this.messagecenter.name;
            return `${this.messagecenter.name} - ( ${this.socketMsgCount} 条未读 )`;
        }
    },
    methods: {
        handleOpenPasswordModal() {
            this.passwordModalVisible = true;
            this.passwordModalTitle = '修改密码';
        },
        handleClosePasswordModal() {
            this.passwordModalVisible = false;
        },
        handleRouterPush(path) {
            this.$router.push(path);
        },
        handleMsgCenter(path) {
            this.handleRouterPush(path);
        },
        handleCommand(command) {
            if (command === 'loginOut') {
                this.$socket.emit('OFFLINE'); // 用户离线
                this.handleRouterPush('/login');
            } else if (command === 'editPassword') {
                this.handleOpenPasswordModal();
            } else if (command === 'personcenter') {
                this.handleRouterPush('/personcenter');
            }
        },
        handleLang(lang) {
            if (lang === 'zh') {
                this.lang = 'zh';
                localStorage.setItem('locale', 'zh');
                this.$i18n.locale = localStorage.getItem('locale') || '';
                this.$message({
                    message: '切换为中文！',
                    type: 'success'
                });
            } else if (lang === 'en') {
                this.lang = 'en';
                localStorage.setItem('locale', 'en');
                this.$i18n.locale = localStorage.getItem('locale') || '';
                this.$message({
                    message: 'Switch to English!',
                    type: 'success'
                });
            }
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        checkFull() {
            var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
            if (isFull === undefined) { isFull = false; }
            return isFull;
        },
        formatCount(count) {
            return count > 99 ? '99+' : count;
        }
    }
};
</script>
