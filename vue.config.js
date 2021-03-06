const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// const fs = require('fs')

module.exports = {
    // baseUrl vue-cli 3.3 已废弃
    publicPath: process.env.NODE_ENV === 'production'
    ? '/' // build时的路劲，绝对路劲
    : '/',
    outputDir: 'dist',
    // 配置路径别名
    chainWebpack: config => {
        config.resolve.alias
        .set('@', resolve('src'))
        .set('_c', resolve('src/components/'))
        .set('_as', resolve('src/assets/'))
    },
    // 传递第三方插件选项
    // pluginOptions: {
    //     'AMap': 'AMap',
    //     'QRCode': 'QRCode'
    // },
    // 全局注入通用样式
    // css: {
    //     loaderOptions: {
    //         stylus: {
    //             data: fs.readFileSync('./src/assets/stylus/mixins.styl', 'utf-8')
    //         }
    //     }
    // }
}