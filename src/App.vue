<template>
  <div class="container">
    <NavBar v-if="store.userType === 'client' || store.userType === 'admin'"/>
    <router-view/>
  </div>
</template>


<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import axios from "axios";
import {useStore} from "./stores/mainStore.ts";
import {onBeforeMount} from "vue";

const store = useStore();
onBeforeMount(async () => {
  store.userType = localStorage.getItem("user_type");
})
axios.defaults.baseURL = "http://localhost:3000";

</script>

<style scoped>

</style>
