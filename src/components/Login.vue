<template>
  <b-modal
    :static="true"
    @show="start_login"
    :hide-footer="true"
    v-model="show"
    title="Readers Today News"
  >
    <div id="firebaseui-auth-container"></div>
  </b-modal>
</template>
<script>
import firebase from "firebase/app";
import { auth_ui } from "@/main";
export default {
  props: ["initiate_login"],
  data() {
    return {
      show: false
    };
  },
  watch: {
    initiate_login(value) {
      if (value) {
        this.show = true;
        this.$emit("login_initiated");
      }
    }
  },
  methods: {
    start_login() {
      var uiConfig = {
        signInFlow: "popup",
        signInSuccessUrl: this.$route.path,
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID
        ]
      };
      auth_ui.start("#firebaseui-auth-container", uiConfig);
      //eslint-disable-next-line
      console.log("start_login", uiConfig);
      this.$emit("logged_in");
    },
    sign_out() {
      firebase.auth().signOut();
      this.$emit("logged_out");
    }
  }
};
</script>