const state = {
  feature: null,
  num: 0,
};
const mutations = {
  SET_FEATURE: (state, feature) => {
    state.feature = feature;
  },
  SET_NUM: (state, feature) => {
    state.num = feature;
  },
};

const actions = {
  getFeature({ commit }, feature) {
    commit("SET_FEATURE", feature);
  },
  getNum({ commit }, feature) {
    commit("SET_NUM", feature);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
