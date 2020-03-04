<template>
  <b-card class="m-3" no-body>
    <b-card-img-lazy :src="post.media_items[0].image" />
    <b-card-body>
      <b-card-title>{{post.title}}</b-card-title>
      <small>Published on {{post.last_modified_on | moment("from", "now") }}</small>
      <b-card-text>{{post.summary}}</b-card-text><b-button  size="sm" variant="primary">Read more</b-button>
      <br/>
      <b-badge class="mr-1" variant="dark" v-for="tag in post.tags" :key="tag.id">{{tag.name}}</b-badge>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    post: Object
  }
};
</script>