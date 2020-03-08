<template>
  <base-layout>
    <b-container class="mt-4">
      <template v-if="loading">
        <div class="text-center align-middle">
          <b-spinner variant="primary" label="Text Centered"></b-spinner>
          <div>Loading...</div>
        </div>
      </template>
      <template v-else>
        <h2>{{post.title}}</h2>
        <small>Published {{post.last_modified_on | moment("from", "now")}}</small>
        <b-badge v-for="cat in post.categories" :key="cat.id" :to="'/category/' + cat.name" />
        <br />
        <p>{{post.content}}</p>
        <comments :post_id="post.slug" v-if="post" />
      </template>
    </b-container>
  </base-layout>
</template>

<script>
import BaseLayout from "../layouts/Base";
import Comments from "../components/Comments";

export default {
  components: {
    Comments,
    BaseLayout
  },
  data() {
    return {
      post: undefined,
      loading: true
    };
  },
  mounted() {
    this.fetch_post();
  },
  methods: {
    fetch_post() {
      this.axios
        .get("post/" + this.$route.params.slug)
        .then(
          response => {
            this.post = response.data;
          },
          error => {
            //eslint-disable-next-line
            console.log(error);
          }
        )
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>