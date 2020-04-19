<template>
  <b-list-group>
    <b-list-group-item
      class="m-0 p-2 no-border"
      v-for="comment in comments"
      :key="comment.id"
    >{{comment.body | truncate(100)}}</b-list-group-item>
  </b-list-group>
</template>
<script>
export default {
  props: ["comments"]
};
</script>