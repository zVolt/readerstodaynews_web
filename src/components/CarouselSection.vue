<template>
  <div class="bg-light py-5" fluid>
    <b-container>
      <b-row>
        <b-col cols="12" lg="8">
          <agile
            v-if="posts"
            :speed="300"
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
        <b-col cols="0" lg="4" class="d-none d-lg-block" v-if="posts">
          <b-row>
            <agile unagile>
              <div class="side-slide">
                <div>
                  <img :src="get_image(posts[0])" />
                </div>
                <div class="caption p-2 pt-3">
                  <div class="text-light">{{posts[0].title}}</div>
                </div>
              </div>
            </agile>
          </b-row>
          <b-row class="pt-3">
            <b-col class="p-0 mr-3">
              <agile unagile>
                <div class="side-slide low">
                  <div>
                    <img :src="get_image(posts[1])" />
                  </div>
                  <div class="caption p-2 pt-3">
                    <div class="text-light">{{posts[1].title}}</div>
                  </div>
                </div>
              </agile>
            </b-col>
            <b-col class="p-0">
              <agile unagile>
                <div class="side-slide low">
                  <div>
                    <img :src="get_image(posts[2])" />
                  </div>
                  <div class="caption p-2 pt-3">
                    <div class="text-light">{{posts[2].title}}</div>
                  </div>
                </div>
              </agile>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
.side-slide.low {
  height: 120px;
}
.side-slide {
  position: relative;
  img {
    height: 170px;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  .caption {
    font-size: 13px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(
      rgba($color: #000000, $alpha: 0),
      rgba($color: #000000, $alpha: 0.5)
    );
  }
}

img:hover {
  transform: scale(1.1);
  transition: all 0.6s;
}

.slide {
  position: relative;
  img {
    height: 310px;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  .caption {
    font-size: 18px;
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
    this.fetch_posts();
  },
  methods: {
    fetch_posts() {
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