<template>
  <b-container>
    <post :post="post" v-if="post" />
    <comments :post_id="post.slug" v-if="post" />
  </b-container>
</template>

<script>
import Post from "../components/Post";
import Comments from "../components/Comments";
export default {
  components: {
    Post,
    Comments
  },
  data() {
    return {
      post: undefined
    };
  },
  mounted() {
    this.fetch_post();
  },
  methods: {
    fetch_post() {
      var vm = this;
      this.axios.get("post/" + this.$route.params.slug).then(
        response => {
          //eslint-disable-next-line
          console.log(response);
          vm.post = response.data;
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