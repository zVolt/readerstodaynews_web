<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Reader Today News</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-bind:key="item.id" :href="item.url" v-for="item in main_menu">{{item.name}}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-bind:key="item.id" :href="item.url" v-for="item in sec_menu">{{item.name}}</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  data() {
    return {
      main_menu: [],
      sec_menu: []
    };
  },
  mounted(){
    this.get_menu_items()
  },
  methods: {
    get_menu_items: function() {
      var vm = this;
      this.axios.get("/menu").then(
        response => {
          var all_items = response.data.results;
          all_items.forEach(item => {
            if (item.url === window.location.pathname) {
              item.active = true;
            }
            if (item.menu == 0) {
              vm.main_menu.push(item);
            } else {
              vm.sec_menu.push(item);
            }
          });
        },
        error => {
          // eslint-disable-next-line
          console.log(error);
        }
      );
    }
  }
};
</script>