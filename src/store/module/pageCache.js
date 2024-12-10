// 全局store,存放全局使用共享的数据
export default { // 注意：全局模块中不需要开启命名空间
    namespaced: true,
    state: () => ({
        keepAliveViews: [],
        notAliveViews: [],
        keepAliveViewsScrollPostion: [],
    }),
    mutations: {
        /**
         * 记录需要缓存的路由视图
         */
        SET_SAVE_KEEP_ALIVE_VIEWS(state, { keepAliveViews }) {

            state.keepAliveViews = keepAliveViews;
        },



        /**
         * 清除页面缓存
         */
        SET_CLEAR_CACHE_VIEW(state, { notAliveViews }) {
            state.notAliveViews = notAliveViews;
        },





        // 设置缓存页面滚动元素的位置
        SET_KEEP_ALIVE_VIEWS_SCROLL_POSTION(state, { routeName, list }) {
            const item = state.keepAliveViewsScrollPostion.find((t) => t.routeName === routeName);
            if (!item) {
                state.keepAliveViewsScrollPostion.push({ routeName, list });
            } else {
                item.list = list;
            }
        },
    },
    actions: {
    },
    getters: {
    }





}