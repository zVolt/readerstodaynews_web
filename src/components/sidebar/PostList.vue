<template>
  <ul class="list-unstyled">
    <b-media tag="li" v-for="post in posts" :key="post.id" class="my-3">
      <template v-slot:aside>
        <router-link :to="{name: 'post_by_slug', params: {slug: post.slug}}">
          <b-img-lazy width="110" :src="get_image(post)" />
        </router-link>
      </template>
      <div class="text-muted">
        {{post.last_modified_on | moment("from", "now")}}
        <span class="float-right">
          <font-awesome-icon :icon="['fa', 'comments']" />
          {{post.commentCount}}
        </span>
      </div>
      <router-link :to="{name: 'post_by_slug', params: {slug: post.slug}}" class="text-body">
        <p>{{post.summary | truncate(100)}}</p>
      </router-link>
      <hr />
    </b-media>
  </ul>
</template>

<script>
export default {
  props: ["posts"],
  data() {
    return {};
  },
  methods: {
    get_image(post) {
      if (!post || !post.media_items || post.media_items.length == 0) {
        return null;
      }
      return post.media_items[0].image;
    }
  }
};
</script>
<style lang="scss" scoped>
.text-muted {
  font-size: 0.8em;
}
p {
  font-size: 0.9em;
}
</style>