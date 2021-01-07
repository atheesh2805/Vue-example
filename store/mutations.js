export default {
  SET_TABLE_DATA(state, data) {
    state.tableData = data;
  },
  SET_CHILD_DIALOG(state, data) {
    state.childDialog = data;
    state.loading = false;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  }
};
