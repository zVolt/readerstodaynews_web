<template>
  <base-layout>
    <b-container class="text-center pt-5 mt-5">
      <b-card-group deck>
        <post v-for="post in posts" :key="post.id" :post="post"></post>
      </b-card-group>
    </b-container>
  </base-layout>
</template>

<script>
import BaseLayout from "../layouts/Base";
import Post from '../components/Post'
export default {
  name: "home",
  components: {
    BaseLayout,
    Post
  },
  data(){
    return {
      posts: []
    }
  },
  mounted(){
    this.fetch_posts();
  },
  methods: {
    fetch_posts(){
      var vm = this;
      this.axios.get('post/list').then(response=>{
        //eslint-disable-next-line
        console.log(response);
        response.data.results.forEach(post => {
          vm.posts.push(post)
        });
      }, error=>{
        //eslint-disable-next-line
        console.log(error);
      })
    }
  }
};
</script>