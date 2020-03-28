<template>
  <base-layout>
    <b-container fluid="md">
      <b-row class="mt-4">
        <b-col sm="12" md="10">
          <b-card-group columns>
            <post v-for="post in posts" :key="post.id" :post="post" />
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/Base";
import Post from "@/components/Post";
export default {
  name: "home",
  components: {
    BaseLayout,
    Post
  },
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.fetch_posts();
  },
  methods: {
    fetch_posts() {
      var vm = this;
      this.axios.get("post/").then(
        response => {
          response.data.results.forEach(post => {
            vm.posts.push(post);
          });
        },
        error => {
          //eslint-disable-next-line
          console.log(error);
        }
      );
    }
  }
};
</script>

<style lang="css">
.breaking-news {
  color: red;
  font-style: bold;
  font-size: 1.5em;
}
</style>