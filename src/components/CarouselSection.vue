<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="12" lg="8">
        <agile
          v-if="posts"
          :speed="200"
          :dots="false"
          :autoplay="true"
          :slides-to-show="1"
          :navButtons="false"
        >
          <div
            v-for="(post, index) in posts"
            :key="post.id"
            class="slide"
            :class="`slide--${index}`"
          >
            <div>
              <img :src="get_image(post)" />
            </div>
            <div class="caption">
              <h4 class="p-3 text-light">{{post.title}}</h4>
            </div>
          </div>
        </agile>
      </b-col>
      <b-col cols="0" lg="4" class="d-none d-lg-block">
        <b-container fluid>
          <b-col cols="8">
            <b-img src="https://picsum.photos/id/237/100/100" />
          </b-col>
          <b-col>
            <b-row>
              <b-img src="https://picsum.photos/id/237/100/100" />
            </b-row>
            <b-row>
              <b-img src="https://picsum.photos/id/237/100/100" />
            </b-row>
          </b-col>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>
<style lang="scss" scoped>
.slide {
  display: relative;
  img {
    height: 350px;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  .caption {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-top: 20px;
    background: linear-gradient(
      rgba($color: #000000, $alpha: 0),
      rgba($color: #000000, $alpha: 0.5)
    );
  }
}
.carousel-caption {
  background: red;
}
</style>
<script>
import { VueAgile } from "vue-agile";
export default {
  components: {
    agile: VueAgile
  },
  data() {
    return {
      posts: null
    };
  },
  mounted() {
    this.fetch_images();
  },
  methods: {
    fetch_images() {
      this.axios.get("post").then(response => {
        this.posts = response.data.results;
      });
    },
    get_image(post) {
      if (post.media_items && post.media_items.length > 0)
        return post.media_items[0].image;
    }
  }
};
</script>