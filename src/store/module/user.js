// 全局store,存放全局使用共享的数据
export default { // 注意：全局模块中不需要开启命名空间
    namespaced: true,

    state: {
        userData: {},  //用户数据
    },
    mutations: {

        //设置用户基本数据
        SET_USER_DATA(state, data) {
            Object.keys(data).forEach(key => {
                state.userData[key] = data[key]
            })
        },



    },
    actions: {
    },
    getters: {
    }
}