<template>
  <div class="main-container">
    <menu-component></menu-component>
    <div id="contentsection">
      <slot></slot>
    </div>
    <footer-component class="footer"></footer-component>
  </div>
</template>

<script>
import FooterComponent from '@/components/Footer'
import MenuComponent from '@/components/Menu'
export default {
  name: 'baselayout',
  components: {
    FooterComponent,
    MenuComponent
  }
}
</script>


<style lang="css">
* {
 box-sizing: border-box;
}
*:before,
*:after {
 box-sizing: border-box;
}

html, body {
  height: 100%;
  position: relative;
}
.main-container {
 min-height: 100vh; /* will cover the 100% of viewport */
 overflow: hidden;
 display: block;
 position: relative;
 padding-bottom: 400px; /* height of your footer */
}

.footer {
 position: absolute;
 bottom: 0;
 width: 100%;
}
</style>
