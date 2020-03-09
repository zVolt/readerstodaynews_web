<template>
  <div class="mt-3">
    <b-card img-src="https://picsum.photos/900/250/?image=3" text-variant="white" no-body>
      <b-card-body class="text-center card-img-overlay h5">{{category.name}}</b-card-body>
    </b-card>
  </div>
</template>
<script>
export default {
  props: ["category"]
};
</script>

<style lang="sass" scoped>
</style>