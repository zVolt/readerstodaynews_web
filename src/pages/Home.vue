<template>
  <base-layout>
    <b-carousel id="carousel-1" background="#ababab" style="text-shadow: 1px 1px 2px #333;">
      <b-carousel-slide
        img-src="https://res.cloudinary.com/readerstodaymedia/image/upload/v1583398982/web_images/header.jpg"
      ></b-carousel-slide>
    </b-carousel>

    <b-container fluid="md">
      <b-card-group columns>
        <post v-for="post in posts" :key="post.id" :post="post"></post>
      </b-card-group>
    </b-container>
  </base-layout>
</template>

<script>
import BaseLayout from "../layouts/Base";
import Post from "../components/Post";
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
      this.axios.get("post/list").then(
        response => {
          //eslint-disable-next-line
          console.log(response);
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