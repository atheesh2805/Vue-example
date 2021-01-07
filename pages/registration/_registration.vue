<template>
  <v-card :loading="loading">
    <v-toolbar
      >Countries ( {{ tableData.length }} )<v-spacer></v-spacer
      ><v-icon @click="childDialog = false">close</v-icon></v-toolbar
    ><v-divider></v-divider>
    <v-data-table
      :loading="loading"
      fixed-header
      :headers="headers"
      :items="tableData"
      class="elevation-1 body-2"
      ><template v-slot:item.no="{ item }">{{
        tableData.indexOf(item) + 1
      }}</template>
      <template v-slot:item.flag="{ item }"
        ><a :href="item.flag" target="_blank">{{ item.flag }}</a></template
      >
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "Sl No",
          align: "start",
          sortable: false,
          value: "no"
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Capital", value: "capital", sortable: false },
        { text: "Native Name", value: "nativeName", sortable: false },

        { text: "Numeric Code", value: "numericCode", sortable: false },
        { text: "Region", value: "region", sortable: false },
        { text: "Subregion", value: "subregion", sortable: false },
        { text: "Population", value: "population", sortable: false },

        { text: "Area", value: "area", sortable: false },

        { text: "Flag", value: "flag", align: "center", sortable: false },
        { text: "Demonym", value: "demonym", sortable: false }
      ]
    };
  },
  created() {},
  computed: {
    ...mapState(["tableData", "childDialog", "loading"]),
    childDialog: {
      get() {
        return this.$store.state.childDialog;
      },
      set(value) {
        this.$store.commit("SET_CHILD_DIALOG", value);
      }
    }
  }
};
</script>

<style></style>
