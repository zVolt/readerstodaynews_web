<template>
  <div class="main-container">
    <trending-top-bar></trending-top-bar>
    <div id="contentsection">
      <div class="header">
        <b-container class="text-center">
          <b-row>
            <b-col>
              <b-img
                class="float-left"
                src="https://res.cloudinary.com/readerstodaymedia/image/upload/v1585399771/web_images/header_old.jpg"
                height="200px"
              />
            </b-col>
            <b-col class="d-none d-lg-inline" col lg="8">
              <b-img
                class="float-right"
                src="https://res.cloudinary.com/readerstodaymedia/image/upload/v1585456072/web_images/banner_long.jpg"
                fluid
                style="margin-top: 50px"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
      <categories-bar />
      <b-container>
        <b-row>
          <slot name="header" />
        </b-row>
        <b-row>
          <b-col cols="12" md="8">
            <slot name="content" />
          </b-col>
          <b-col cols="12" md="4">
            <sidebar />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <footer-component class="footer"></footer-component>
  </div>
</template>

<script>
import FooterComponent from "@/components/Footer";
import CategoriesBar from "@/components/CategoriesBar";
import TrendingTopBar from "@/components/TrendingTopBar";
import Sidebar from "@/components/Sidebar";

export default {
  name: "baselayout",
  components: {
    FooterComponent,
    TrendingTopBar,
    CategoriesBar,
    Sidebar
  }
};
</script>


<style lang="scss">
.header {
  background-color: black;
}
* {
  box-sizing: border-box;
}
*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  position: relative;
}
.main-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  @media (min-width: 0px) {
    /* Target devices wider than 0px. */
    padding-bottom: 1000px; /* height of your footer */
  }
  @media (min-width: 230px) {
    /* Target devices wider than 0px. */
    padding-bottom: 710px; /* height of your footer */
  }
  @media (min-width: 460px) {
    /* Target devices wider than 0px. */
    padding-bottom: 750px; /* height of your footer */
  }
  @media (min-width: 767px) {
    /* Target devices wider than 768px. */
    padding-bottom: 500px; /* height of your footer */
  }
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
