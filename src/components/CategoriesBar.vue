<template>
  <div id="menu-container" class="bg-dark d-none d-md-block">
    <b-container>
      <b-nav>
        <b-nav-item to="/" active>Home</b-nav-item>
        <b-nav-item
          :to="'/category/' + cat.name"
          v-for="cat in categories"
          :key="cat.id"
          class="px-2"
        >{{cat.name}}</b-nav-item>
      </b-nav>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.fetch_categories();
  },
  methods: {
    fetch_categories() {
      var vm = this;
      this.axios.get("category/").then(
        response => {
          response.data.results.forEach(item => {
            vm.categories.push(item);
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

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap.scss";
#menu-container {
  background-color: #19232d !important;
  border-bottom: 2px solid $danger;
}
.nav-item {
  &:hover {
    background-color: darken($dark, 4%) !important;
    a {
      color: $light !important;
    }
  }
  a {
    color: $danger !important;
  }
}
</style>