<template>
  <b-card class="m-3" no-body>
    <b-card-img-lazy v-if="is_media_available" :src="get_post_image()" />
    <b-card-body>
      <b-card-title>{{title}}</b-card-title>
      <small>Published {{last_modified_on | moment("from", "now")}}</small>
      <b-card-text>{{summary}}</b-card-text>
      <b-button size="sm" variant="primary" :href="'/post/' + slug">Read more</b-button>
      <br />
      <b-badge class="mr-1" variant="dark" v-for="tag in tags" :key="tag.id">{{tag.name}}</b-badge>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    post: Object
  },
  computed: {
    is_media_available() {
      return this.post && this.post.media_items.length > 0;
    },
    title() {
      if (this.post) return this.post.title;
      return "";
    },
    summary() {
      if (this.post) return this.post.summary;
      return "";
    },
    slug() {
      if (this.post) return this.post.slug;
      return "";
    },
    last_modified_on() {
      if (this.post) return this.post.last_modified_on;
      return "";
    },
    tags() {
      if (this.post) return this.post.tags;
      return [];
    }
  },
  methods: {
    get_post_image() {
      if (this.post && this.post.media_items.length > 0)
        return this.post.media_items[0].image;
    }
  }
};
</script>