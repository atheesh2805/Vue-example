/* eslint-disable prettier/prettier */
<template>
  <v-col cols="12" sm="8" md="4">
    <v-card :loading="loading" flat class="px-9 py-12">
      <v-row class="justify-center"> </v-row>
      <v-form ref="form" @submit.prevent="submit">
        <v-text-field
          v-model="fullName"
          :rules="[rules.fullNameRequired]"
          label="Full Name"
          :error="fullNameError"
          outlined
          @input="fullNameError = fullName.length === 0"
        >
        </v-text-field>
        <v-text-field
          v-model="email"
          :rules="[rules.emailIdRequired]"
          :error="emailError"
          label="Email"
          outlined
          @input="emailError = email.length === 0"
        >
        </v-text-field>

        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="selectedDOBFormatted"
              outlined
              :rules="[rules.dateRequired]"
              :error="dateError"
              :error-messages="dateError ? 'Age must be 18' : ''"
              label="Date of birth"
              readonly
              :value="selectedDOBFormatted"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            :max="new Date().toISOString().substr(0, 10)"
            v-model="selectedDOB"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(selectedDOB)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-select
          v-model="region"
          label="Select region"
          outlined
          :items="regionList"
          :rules="[rules.regionRequired]"
          required
        ></v-select>
        <v-checkbox
          color="black"
          :error="checkBoxError"
          :error-messages="
            checkBoxError
              ? 'You must agree terms and conditions to countinue'
              : ''
          "
          v-model="checkBox"
          label="I agree to Terms and Conditions"
        ></v-checkbox>
        <v-btn :loading="loading" type="submit"  color="primary" 
          >Submit</v-btn
        >
      </v-form>
    </v-card>
    <v-dialog v-model="childDialog">
      <v-card outlined>
        <nuxt-child :key="$route.params.id"> </nuxt-child>
      </v-card>
    </v-dialog>
  </v-col>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import moment from "moment";
export default {
  layout: "centered",
  auth: false,
  data() {
    return {
      checkBox: false,
      checkBoxError: false,
      regionList: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      fullName: "",
      email: "",
      dob: "",

      dialog: false,
      checkBox: false,
      region: "",
      fullNameError: false,
      regionError: false,
      emailError: false,
      dobError: false,
      regionError: false,
      checkBoxError: false,
      loading: false,
      dateError: false,
      selectedDOB: "",
      menu: false,
      selectedDOBFormatted: "",
      rules: {
        fullNameRequired: v =>
          (v || "").length > 0
            ? /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(v) ||
              "Allows alphabets only"
            : "Enter fullname.",

        emailIdRequired: value =>
          (value || "").length > 0
            ? /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(value) ||
              "Invalid email id"
            : "Email id required.",
        regionRequired: value => !!value || "Select a region",
        dateRequired: value => !!value || "Select your date of birth"
      }
    };
  },
  methods: {
    ...mapActions(["getData"]),
    async submit() {
      console.log(this.$refs.form.validate());
      if (!this.$refs.form.validate()) {
        if (!this.checkBox) {
          this.checkBoxError = true;
        }
        return;
      }
      if (!this.checkBox) {
        this.checkBoxError = true;
      }
      this.getData(this.region);

      this.$router.push({
        name: "registration-registration"
      });
      setTimeout(() => {
        this.childDialog = true;
      }, 50);
    },
    dateFormat(date) {
      let diff = moment().diff(moment(date).format("YYYY-MM-DD"), "months");

      if (diff < 216) {
        console.log(diff);
        this.selectedDOBFormatted = moment(date).format("MM-DD-YYYY");
        this.dateError = true;
      } else {
        console.log(diff, "else");
        this.dateError = false;
        this.selectedDOBFormatted = moment(date).format("MM-DD-YYYY");
      }
    }
  },
  watch: {
    selectedDOB(val) {
      if (val) this.dateFormat(val);
    },
    checkBox(val) {
      if (val) this.checkBoxError = false;
    },
    childDialog(val) {
      if (!val) {
        this.$router.replace({
          name: "registration"
        });
      }
    }
  },
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
