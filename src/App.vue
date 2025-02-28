<template>
  <div id="app">
    <h1>Meine Vue App</h1>
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
}
</style>
