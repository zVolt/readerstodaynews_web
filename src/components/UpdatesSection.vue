<template>
  <div>
    <b-container fluid>
      <b-row class="section">
        <b-img
          src="https://res.cloudinary.com/readerstodaymedia/image/upload/v1585456071/web_images/banner_square.jpg"
        />
      </b-row>
      <b-row class="section">
        <b-tabs
          content-class="mt-3"
          align="left"
          pills
          nav-class="text-light"
          nav-wrapper-class="bg-dark"
          active-nav-item-class="text-light bg-danger"
        >
          <b-tab title="Popular">
            <p>I'm the first tab</p>
          </b-tab>
          <b-tab title="Recent">
            <p>I'm the second tab</p>
          </b-tab>
        </b-tabs>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabIndex: 0
    };
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["nav-link", "active"];
      } else {
        return ["nav-link"];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.section {
  margin-top: 50px;
}
</style>