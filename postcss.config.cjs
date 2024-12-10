// export.exports = {
//     plugins: {
//         autoprefixer: {
//             overrideBrowserslist: [
//                 "Android 4.1",
//                 "iOS 7.1",
//                 "Chrome > 31",
//                 "ff > 31",
//                 "ie >= 8",
//                 "last 10 versions", // 所有主流浏览器最近10版本用
//             ],
//             grid: true,
//         },
//         'postcss-pxtorem': {
//             rootValue({ file }) {
//                 return file.indexOf('vant') !== -1 ? 37.5 : 75;
//             },
//             propList: ['*'],
//             unitPrecision: 5
//         }
//     }
// }

// module.exports = {
//     'plugins': {
//         'autoprefixer': {
//             overrideBrowserslist: [
//                 'Android 4.1',
//                 'iOS 7.1',
//                 'Chrome > 31',
//                 'not ie <= 11',
//                 'ff >= 30',
//                 '> 1%',
//                 'last 2 versions', // 所有主流浏览器最近2个版本
//             ],
//             grid: true,
//         },
//         'postcss-pxtorem': {
//             rootValue({ file }) {
//                 return file.indexOf('vant') !== -1 ? 37.5 : 75;
//                 // return 75
//             },
//             unitPrecision: 5,
//             selectorBlackList: ['.no-rem', 'no-rem'],
//             propList: ['*'],
//             replace: true,
//             mediaQuery: true,
//             minPixelValue: 2,
//             exclude: /node_modules/i
//         }
//     }
// }


module.exports = {
    'plugins': {
        'autoprefixer': {
            overrideBrowserslist: [
                'Android 4.1',
                'iOS 7.1',
                'Chrome > 31',
                'not ie <= 11',
                'ff >= 30',
                '> 1%',
                'last 2 versions', // 所有主流浏览器最近2个版本
            ],
            grid: true,
        },
        'postcss-pxtorem': {
            // rootValue({ file }) {
            //     // return file.indexOf('vant') !== -1 ? 37.5 : 75;
            //     return 75
            // },
            rootValue: 37.5,
            unitPrecision: 6,
            selectorBlackList: ['.no-rem', 'no-rem'],
            propList: ['*'],
            replace: true,
            mediaQuery: true,
            minPixelValue: 2,
            exclude: /node_modules/i
        }
    }
}


// const path = require('path');
// module.exports = (res) => {
//     let file = ''
//     console.log(file)
//     console.log(JSON.stringify(res))
//     const designWidth = file ? file.dirname.includes(path.join('node_modules', 'vant')) ? 37.5 : 75.0 : 75;
//     return {
//         plugins: {
//             autoprefixer: {
//                 browsers: ['Android >= 4.0', 'iOS >= 8'],
//             },
//             'postcss-pxtorem': {
//                 rootValue: designWidth,
//                 propList: ['*'],
//             },
//         },
//     }

// };
