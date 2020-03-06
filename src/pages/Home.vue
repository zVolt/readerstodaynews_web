<template>
  <base-layout>
    <b-carousel id="carousel-1" background="#ababab" style="text-shadow: 1px 1px 2px #333;">
      <b-carousel-slide
        img-src="https://res.cloudinary.com/readerstodaymedia/image/upload/v1583398982/web_images/header.jpg"
      ></b-carousel-slide>
    </b-carousel>

    <b-container fluid="md">
      <b-row>
        <b-col md="2" class="d-sm-none d-md-block">
          <h4>Top Categories</h4>
          <category v-for="cat in categories" :key="cat.id" :category="cat"></category>
        </b-col>
        <b-col sm="12" md="10">
          <b-card-group columns>
            <post v-for="post in posts" :key="post.id" :post="post"></post>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </base-layout>
</template>

<script>
import BaseLayout from "../layouts/Base";
import Post from "../components/Post";
import Category from "../components/Category";
export default {
  name: "home",
  components: {
    BaseLayout,
    Post,
    Category
  },
  data() {
    return {
      posts: [],
      categories: []
    };
  },
  mounted() {
    this.fetch_posts();
    this.fetch_categories();
  },
  methods: {
    fetch_categories() {
      var vm = this;
      this.axios.get("tag/list").then(
        response => {
          response.data.forEach(item => {
            vm.categories.push(item);
          });
        },
        error => {
          //eslint-disable-next-line
          console.log(error);
        }
      );
    },
    fetch_posts() {
      var vm = this;
      this.axios.get("post/list").then(
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