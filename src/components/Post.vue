<template>
  <b-card class="m-3" no-body>
    <b-card-img-lazy v-if="is_media_available" :src="get_post_image()" />
    <b-card-body>
      <b-card-title>{{post.title}}</b-card-title>
      <small>Published {{post.last_modified_on | moment("from", "now")}}</small>
      <template v-if="detailed">
        <b-card-text>{{post.content}}</b-card-text>
      </template>
      <template v-else>
        <b-card-text>{{post.summary}}</b-card-text>
        <b-button size="sm" variant="primary" @click="navigate_to('/post/' + post.slug)">Read more</b-button>
      </template>
      <br />
      <b-badge
        class="mr-1"
        variant="dark"
        v-for="cat in post.categories"
        :key="cat.id"
        :to="'/category/'+cat.name"
      >{{cat.name}}</b-badge>
    </b-card-body>
  </b-card>
</template>

<script>
import Router from "../router";
export default {
  props: {
    post: Object,
    detailed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    is_media_available() {
      return this.post && this.post.media_items.length > 0;
    }
  },
  methods: {
    get_post_image() {
      if (this.post && this.post.media_items.length > 0)
        return this.post.media_items[0].image;
    },
    navigate_to(path) {
      Router.push(path);
    }
  }
};
</script>