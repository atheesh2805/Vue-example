export default {
  getData({ state, commit, rootState }, data) {
    commit("SET_LOADING", true);
    return this.$axios
      .$get("https://restcountries.eu/rest/v2/region/" + data)
      .then(data => {
        commit("SET_TABLE_DATA", data);
      })
      .catch(thrown => {
        commit("SET_LOADING", false);
      });
  }
};
