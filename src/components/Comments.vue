<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <div>{{comment.author.name}}</div>
      <div>{{comment.author.image}}</div>
      <p class>{{comment.body}}</p>
      <a href>{{comment.like_count}}Like</a>
    </div>
  </div>
</template>

<script>
import { db } from "../db";

export default {
  props: ["post_id"],
  data() {
    return {
      comments: []
    };
  },
  watch: {
    post_id: {
      immediate: true,
      handler(post_id) {
        this.$bind(
          "comments",
          db
            .collection("comments")
            .doc(post_id)
            .collection("comments"),
          { maxRefDepth: 4 }
        );
      }
    }
  }
};
</script>