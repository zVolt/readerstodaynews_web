<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand :to="'/'">Reader Today News</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/categories">Categories</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item v-bind:key="item.id" :to="item.url" v-for="item in main_menu">{{item.name}}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <template v-if="!user.logged_in">
          <b-nav-item v-b-modal="'modal-login'">Login</b-nav-item>
        </template>
        <template v-else>
          <b-img
            :src="get_user_photo_url()"
            rounded="circle"
            width="36"
            height="36"
            :alt="user.name"
            :title="user.name"
          />
          <b-nav-item @click="sign_out">Logout</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
    <b-modal
      id="modal-login"
      :static="true"
      @show="start_login"
      :hide-footer="true"
      title="Readers Today News"
    >
      <div id="firebaseui-auth-container"></div>
    </b-modal>
  </b-navbar>
</template>

<script>
import * as firebase from "firebase";
import { mapGetters } from "vuex";
import * as md5 from "js-md5";
import { auth_ui } from "../main";
export default {
  data() {
    return {
      main_menu: [],
      sec_menu: []
    };
  },
  mounted() {
    this.get_menu_items();
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    get_menu_items: function() {
      var vm = this;
      this.axios.get("/menu").then(
        response => {
          var all_items = response.data.results;
          all_items.forEach(item => {
            if (item.url === window.location.pathname) {
              item.active = true;
            }
            if (item.menu == 0) {
              vm.main_menu.push(item);
            } else {
              vm.sec_menu.push(item);
            }
          });
        },
        error => {
          // eslint-disable-next-line
          console.log(error);
        }
      );
    },
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
    },
    sign_out() {
      firebase.auth().signOut();
    },
    get_user_photo_url() {
      if (this.user.image) return this.user.image;

      return "https://www.gravatar.com/avatar/" + md5(this.user.email);
    }
  }
};
</script>