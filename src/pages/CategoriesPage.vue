<template>
  <base-layout>
    <b-container class="mt-4">
      <h1 class="mb-3">Categories</h1>

      <template v-if="loading">
        <p>Loading categories...</p>
      </template>
      <template v-else>
        <b-card-group columns>
          <b-card
            v-for="cat in categories"
            :key="cat.id"
            :bg-variant="is_subscribed(cat) ? 'primary' : 'secondary'"
            text-variant="light"
            :img-src="get_cat_image(cat)"
            body-class="text-center pt-5"
            :title="cat.name"
            overlay
          >
            <b-button
              @click="toggle_subscription(cat)"
              :variant="is_subscribed(cat) ? 'secondary' : 'primary'"
              size="sm"
            >{{is_subscribed(cat) ? 'Subscribed' : 'Subscribe'}}</b-button>
            <b-button size="sm" class="ml-2" :to="'/category/' + cat.name">Posts</b-button>
          </b-card>
        </b-card-group>
      </template>
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
    if (this.user_id)
      this.$bind("user", db.collection("users").doc(this.user_id));
  },
  watch: {
    user_id() {
      if (this.user_id)
        this.$bind("user", db.collection("users").doc(this.user_id));
    }
  },
  computed: {
    user_id() {
      return this.$store.getters.user.id;
    },
    subscribed_categories() {
      return this.user && this.user.categories;
    },
    loading() {
      return this.user == null || this.user.categories === undefined;
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
    is_subscribed(cat) {
      if (!this.subscribed_categories) return false;
      return this.subscribed_categories.indexOf(cat.name) != -1;
    },
    toggle_subscription(cat) {
      if (!this.user) return;
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
    },
    get_cat_image(cat) {
      if (cat.image) {
        return cat.image;
      }
      return "./cat_placeholder.png";
    }
  }
};
</script>

<style lang="scss" scoped>
.card-body {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>