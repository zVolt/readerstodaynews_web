<template>
  <b-row>
    <b-col md="8">
      <div class="flexslider">
        <agile :options="agile_options">
          <div class="slide" v-for="post in posts" :key="post.id">
            <h3>{{ post.title }}</h3>
          </div>
          <template slot="prevButton">
            <i class="fas fa-chevron-left"></i>
          </template>
          <template slot="nextButton">
            <i class="fas fa-chevron-right"></i>
          </template>
        </agile>
      </div>
    </b-col>
    <b-col>This is other</b-col>
  </b-row>
</template>
<script>
import { VueAgile } from "vue-agile";
export default {
  data() {
    return {
      posts: [],
      agile_options: {
        autoplay: true,
        navButtons: false,
        dots: false,
        fade: true,
        speed: 300
      }
    };
  },
  mounted() {
    this.fetch_posts();
  },
  components: {
    agile: VueAgile
  },
  methods: {
    fetch_posts() {
      this.axios.get("/post").then(
        response => {
          this.posts = response.data.results;
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