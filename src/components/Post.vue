<template>
  <b-card :title="post.title" :img-src="post.media_items[0].image" img-alt="Image" img-top img-width="100">
    <b-card-text>{{post.summary}}</b-card-text>
    <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    post: Object
  }
};
</script>