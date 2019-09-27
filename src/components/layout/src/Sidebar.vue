<template>
    <div class="layout-sidebar">
        <vue-scroll>
            <div class="layout-sidebar-content">
                <div class="systems-item">
                    <div
                        v-for="item in systemList"
                        class="systems-item-list"
                        :key="item._id"
                        :title="item.name"
                        :class="{'active': item.url === currentRoute}"
                        @click="handleRouterPush(item.url)">
                        <i :class="item.icon"></i>
                    </div>
                </div>
            </div>
        </vue-scroll>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'LayoutSideBar',
    computed: {
        ...mapState({
            systems: 'systems'
        }),
        currentRoute() {
            return `/${this.$route.path.split('/')[1]}`;
        },
        systemList() {
            let array = [];
            this.systems.map((ele) => {
                if (ele.url !== '/personcenter' && ele.url !== '/msg') array.push(ele);
            });
            return array;
        },
        personcenter() {
            let obj = {};
            this.systems.map((ele) => {
                if (ele.url === '/personcenter') obj = ele;
            });
            return obj;
        }
    },
    methods: {
        handleRouterPush(path) {
            this.$router.push(path);
        }
    }
};
</script>
