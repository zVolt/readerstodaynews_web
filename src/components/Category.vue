<template>
  <b-card img-src="https://picsum.photos/900/250/?image=3" text-variant="white"  class="m-2" overlay>
      <b-card-text>{{category.name}}</b-card-text>
  </b-card>
</template>
<script>
export default {
    props: ['category']
}
</script>