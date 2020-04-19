<template>
  <b-list-group>
    <b-list-group-item
      class="m-0 p-2 no-border"
      v-for="post in posts"
      :key="post.id"
      :to="{name: 'post_by_slug', params: {slug: post.slug}}"
    >{{post.summary | truncate(100)}}</b-list-group-item>
  </b-list-group>
</template>
<script>
export default {
  props: ["posts"]
};
</script>