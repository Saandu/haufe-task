<template>
  <div class="navbar-container">
    <div class="nav-content">
      <div class="logo-container">
        <h2>
          <router-link to="/" class="logo">LOGO</router-link>
        </h2>
      </div>
      <div class="btn-container">
        <ul class="nav-btn-list">
          <li class="logout-btn" @click="store.logout()">LOGOUT</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "../stores/mainStore";
import {useRoute, useRouter} from "vue-router";

const store = useStore();
const router = useRouter()
const route = useRoute()

</script>

<style scoped>
.navbar-container {
  font-weight: 900;
  margin: 0 auto;
  height: 80px;
  border-radius: 10px;
  width: 100%;
  background-color: #272727;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  filter: drop-shadow(0 0 10px rgba(46, 46, 56, 0.75));
}

.nav-content {
  font-weight: 900;
  margin: 0 auto;
  height: 80px;
  font-size: 1.1rem;
  border-radius: 10px;
  width: 100%;
  background-color: #272727;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  filter: drop-shadow(0 0 10px rgba(46, 46, 56, 0.75));
}

.side-nav {
  width: 100%;
}

.open-side-nav {
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.open-side-nav svg {
  cursor: pointer;
}

.logo-container {
  margin: 0 60px;
}

.logo-container .logo {
  cursor: pointer;
  color: #fff;
  text-decoration: none;
}

.btn-container {
  margin: 0 60px;
}

.nav-btn-list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.logout-btn {
  cursor: pointer;
  border-radius: 30px;
  padding: 12px 30px 10px 30px;
  background-color: #00a2ff;
}

.nav-btn {
  padding-top: 2px;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav span {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
  cursor: pointer;
}

.sidenav span:hover {
  color: #f1f1f1;
}

.sidenav .close-btn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

.side-opened {
  width: 250px;
}

.side-closed {
  width: 0;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav span {
    font-size: 18px;
  }
}

@media screen and (max-width: 800px) {
  .nav-content {
    display: none;
  }

  .side-nav {
    display: flex;
  }
}

@media screen and (min-width: 801px) {
  .nav-content {
    display: flex;
  }

  .side-nav {
    display: none;
  }

  .side-opened {
    width: 0;
  }
}

</style>
