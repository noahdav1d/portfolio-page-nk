<template>
  <div id="app">
    <MyComponent />
  </div>
</template>

<script>
import MyComponent from "./components/mycomponent.vue";

export default {
  components: {
    MyComponent,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}
</style>
