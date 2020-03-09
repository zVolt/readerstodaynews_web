<template>
  <base-layout>
    <div v-for="cat in categories" :key="cat.id">{{cat}}</div>
  </base-layout>
</template>

<script>
import BaseLayout from "../layouts/Base";
export default {
  components: {
    BaseLayout
  },
  data() {
    return {
      categories: []
    };
  },
  methods: {
    fetch_categories() {
      var vm = this;
      this.axios.get("/category").then(
        response => {
          response.data.results.forEach(cat => {
            vm.categories.push(cat);
          });
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