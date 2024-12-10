// vue3中创建store实例对象的方法createStore()按需引入
import { createStore } from 'vuex'

import user from './module/user'
import pageCache from './module/pageCache'
import map from './module/map'

export default createStore({

    modules: {
        user,  //用户状态模块
        pageCache, //页面缓存模块
        map, //高校地图
    }
})