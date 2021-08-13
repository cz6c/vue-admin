//配置文件路径
module.exports = {
    configureWebpack: {
        resolve: {
            extensions: [],
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}

//配置打包环境
// module.exports = {
//     chainWebpack: config => {
//         //发布
//         config.when(process.env.NODE_ENV === 'production', config => {
//             config.entry('app').clear().add('./src/main-prod.js')
//         })

//         //开发
//         config.when(process.env.NODE_ENV === 'development', config => {
//             config.entry('app').clear().add('./src/main-dev.js')
//         })
//     }
// }