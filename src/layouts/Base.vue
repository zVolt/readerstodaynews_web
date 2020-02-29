<template>
  <div>
    <menu-component></menu-component>
    <slot></slot>
    <footer-component></footer-component>
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