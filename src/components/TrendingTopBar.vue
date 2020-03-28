<template>
  <b-container class="text-light bg-dark" fluid>
    <b-container class="p-2">
      <div class="heading text-uppercase font-weight-bold mr-3 d-inline">{{category_to_fetch}}</div>
      <agile ref="trending_agile" :options="agile_options" v-if="trending_items" class="d-inline">
        <span v-for="item in trending_items" :key="item.id">
          <router-link
            :to="{name: 'post_by_slug', params: {'slug': item.slug}}"
            class="text-light"
          >{{item.title}}</router-link>
        </span>
      </agile>
    </b-container>
  </b-container>
</template>
<script>
import { VueAgile } from "vue-agile";
export default {
  components: { agile: VueAgile },
  data() {
    return {
      category_to_fetch: "Trending",
      trending_items: null,
      agile_options: {
        autoplay: true,
        navButtons: false,
        dots: false,
        fade: true,
        speed: 300
      }
    };
  },
  mounted() {
    this.load_trending_posts();
  },
  methods: {
    load_trending_posts() {
      let vm = this;
      this.axios.get("/post/?categories__name=" + this.category_to_fetch).then(
        response => {
          vm.trending_items = response.data.results;
        },
        error => {
          //eslint-disable-next-line
          console.log(error);
        }
      );
    }
  }
};
</script>
<style lang="sass" scoped>
.agile
  position: absolute
</style>