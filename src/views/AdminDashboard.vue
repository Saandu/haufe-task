<template>
  <div v-if="store.requests && store.users">
    <h1>Scooter Requests</h1>
    <ul>
      <li v-for="request in store.requests" :key="request.id">
        {{ request.userId }} - {{ request.scooterId }}
        <button @click="approveScooterRequest(request.userId, request.scooterId, request.id)">Approve</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onBeforeMount} from 'vue';
import axios from 'axios';
import {useStore} from "../stores/mainStore";

const store = useStore()


const approveScooterRequest = async (userId, scooterId, requestId) => {

  await axios.patch(`/users/${userId}`, {
    scooterId: scooterId,
  });

  await axios.patch(`/scooters/${scooterId}`, {
    reserved: true,
  });

  await axios.delete(`/requests/${requestId}`);

  await store.getRequests()

};

onBeforeMount(async () => {
  await store.getUsers()
  await store.getRequests()
  setInterval(() => {
    store.getRequests()
  }, 500);
  setInterval(() => {
    store.getUsers()
  }, 500);

})
</script>