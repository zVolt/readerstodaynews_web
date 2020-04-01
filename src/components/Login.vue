<template>
  <b-modal
    :static="true"
    @show="start_firebaseui"
    :hide-footer="true"
    v-model="show_modal"
    title="Readers Today News"
  >
    <div id="firebaseui-auth"></div>
  </b-modal>
</template>
<script>
import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import { auth_ui } from "@/main";
export default {
  props: ["show"],
  data() {
    return {
      show_modal: false
    };
  },
  watch: {
    show(value) {
      if (value) {
        this.show_modal = true;
      }
    }
  },
  methods: {
    start_firebaseui() {
      var uiConfig = {
        signInFlow: "popup",
        signInSuccessUrl: this.$route.path,
        tosUrl: "https://google.com",
        privacyPolicyUrl: "https://google.com",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID
        ]
      };
      auth_ui.start("#firebaseui-auth", uiConfig);
      //eslint-disable-next-line
      console.log("login_started", uiConfig);
    }
  }
};
</script>