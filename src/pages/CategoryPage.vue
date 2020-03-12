<template>
  <base-layout>
    <b-container>
      <template v-if="posts.length > 0">
        <b-card-group columns>
          <post v-for="post in posts" :key="post.id" :post="post" />
        </b-card-group>
      </template>
      <template v-else>
        <div class="text-center mt-5 pt-5 text-muted">
          <font-awesome-icon icon="newspaper" size="10x" />
          <p class="h3">No posts in this category</p>
        </div>
      </template>
    </b-container>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/Base";
import Post from "@/components/Post";
export default {
  components: {
    Post,
    BaseLayout
  },
  data() {
    return {
      category: undefined,
      posts: []
    };
  },
  computed: {
    category_name() {
      return this.$route.params.category_name;
    }
  },
  mounted() {
    this.fetch_category();
    this.fetch_posts();
  },
  methods: {
    fetch_category() {
      var vm = this;
      this.axios.get("/category/" + this.category_name).then(
        response => {
          vm.category = response;
        },
        error => {
          //eslint-disable-next-line
          console.log(error);
        }
      );
    },
    fetch_posts() {
      var vm = this;
      this.axios.get("/post/?categories__name=" + this.category_name).then(
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