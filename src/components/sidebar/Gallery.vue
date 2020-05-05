<template>
  <agile
    v-if="show_images"
    class="sidebar-gallery"
    :dots="false"
    :speed="300"
    :autoplay="true"
    :slides-to-show="1"
    :navButtons="true"
  >
    <template slot="prevButton">
      <font-awesome-icon color="white" size="2x" :icon="['fa', 'angle-left']" />
    </template>
    <template slot="nextButton">
      <font-awesome-icon color="white" size="2x" :icon="['fa', 'angle-right']" />
    </template>
    <div v-for="(media, index) in images" :key="media.id" class="slide" :class="`slide--${index}`">
      <div>
        <img :src="media.image" />
      </div>
    </div>
  </agile>
</template>
<style lang="scss">
.sidebar-gallery {
  img {
    width: 100%;
  }
  .slide {
    max-height: 300px;
    width: 100%;
    position: relative;
  }
  .agile__actions {
    position: absolute;
    top: 50%;
    width: 100%;
    button {
      background: none;
      border: none;
    }
  }
}
</style>
<script>
import { VueAgile } from "vue-agile";
export default {
  props: ["images"],
  components: { agile: VueAgile },
  computed: {
    show_images() {
      return this.images && this.images.length > 0;
    }
  }
};
</script>
