<template>
  <div class="container">
    {{ title }}
  </div>
</template>

<script>
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  async mounted() {
    const dio = await axios.get("http://localhost:3000/api/home");
    this.title = dio.data;
    console.log();
  },
  data: () => ({
    title: ""
  })
};
</script>

<style>


</style>
