<template>
  <base-layout>
    <b-container class="mt-4">
      <h1 class="mb-2">{{categories.length}} Categories</h1>

      <b-card-group columns>
        <b-card v-for="cat in categories" :key="cat.id" bg-variant="secondary" text-variant="light">
          <b-card-text class="text-center">
            {{cat.name}}
            <br />
            <b-button @click="toggle_subscription(cat)">
              <b-icon :icon="get_icon(cat)" />
            </b-button>
          </b-card-text>
        </b-card>
      </b-card-group>
    </b-container>
  </base-layout>
</template>

<script>
import * as firebase from "firebase";
import BaseLayout from "@/layouts/Base";
import { db } from "@/main";
export default {
  components: {
    BaseLayout
  },
  data() {
    return {
      user: null,
      categories: []
    };
  },
  mounted() {
    this.fetch_categories();
  },
  watch: {
    user_id() {
      this.$bind("user", db.collection("users").doc(this.user_id));
    },
    user() {
      //eslint-disable-next-line
      console.log(this.user, "from watch");
    }
  },
  computed: {
    user_id() {
      return this.$store.getters.user.id;
    },
    subscribed_categories() {
      return this.user && this.user.categories;
    }
  },
  methods: {
    fetch_categories() {
      this.axios.get("/category").then(
        response => {
          response.data.results.forEach(cat => {
            this.categories.push(cat);
          });
        },
        error => {
          //eslint-disable-next-line
          console.log(error);
        }
      );
    },
    get_icon(cat) {
      if (!this.subscribed_categories) return "heart";
      return this.subscribed_categories.indexOf(cat.name) == -1
        ? "heart"
        : "heart-fill";
    },
    toggle_subscription(cat) {
      let user_ref = db.collection("users").doc(this.user_id);

      if (this.user.categories.indexOf(cat.name) == -1) {
        user_ref.update({
          categories: firebase.firestore.FieldValue.arrayUnion(cat.name)
        });
      } else {
        user_ref.update({
          categories: firebase.firestore.FieldValue.arrayRemove(cat.name)
        });
      }
    }
  }
};
</script>