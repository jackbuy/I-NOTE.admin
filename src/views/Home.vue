<template>
    <div>
        home
        <div>{{ age }}</div>
        <Test></Test>
        <el-button>eeee</el-button>
        <el-input
            v-model="form.name"
            placeholder="请输入文章"></el-input>
        <el-select>
            <el-option>以i</el-option>
        </el-select>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Test from '_c/Test.vue';

@Component({
    components: {
        Test,
    },
})
export default class Home extends Vue {
    @Prop()
    private name: string;

    private age: number = 30;

    private form: any = {};

    private tableData: any = [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          }];

}
</script>
