<template>

  <div class="box" v-if="selectedScooter > 0">
    <div v-if="!requested" class="active" >Scooter id: {{selectedScooter}}</div>
    <div @click="requestScooter(selectedScooter)" :class="requested ? 'request-btn-red' : 'request-btn'">Request</div>
    <div class="active" v-if="requested">Requested: {{selectedScooter}}</div>
    <div class="active" v-if="requested && !approved">Wait for and admin to confirm your request.</div>
    <div class="active" v-if="approved">Your Ride Was Aproved</div>
  </div>

  <MapboxMap
      style="height: 600px"
      access-token="pk.eyJ1IjoibGxhbGV4YW5kZXIiLCJhIjoiY2xvOXMwZXNwMGhubTJscGVuaHI1bTdpaSJ9.7rOXilB5zOzDHsQ3SvcpvQ"
      map-style="mapbox://styles/mapbox/streets-v11"
      :center="[21.227863, 45.753755]"
      :zoom="15"
      :max-zoom="20"
  >
    <div v-for="(scooter) in store.scooters">
      <MapboxMarker :lng-lat="scooter.longLat" :interactive="true" >
        <img alt="1" @click="showData(scooter.id)" class="marker" src="../assets/25613.png" height="30" width="30"/>
      </MapboxMarker>
    </div>
  </MapboxMap>
</template>


<script setup lang="ts">
import { MapboxMap, MapboxMarker} from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useStore} from "../stores/mainStore";
import {onBeforeMount, ref} from "vue";
import axios from "axios";

const store = useStore()
let approved = ref(false);

let selectedScooter = ref(0)
let requested = ref(false)

onBeforeMount(async ()=>{
  await store.getScooters()
})

const showData = (scooterId) => {
  selectedScooter.value = scooterId
}


const requestScooter = async (scooterId) => {
  requested.value = true
  await axios.post('http://localhost:3000/requests', {
    "userId": store.userId,
    "scooterId": scooterId
  })
  checkRequest()
}

const checkRequest = async () => {
  const response = await axios.get(`/users/${store.userId}`)
  const data = response.data
  if (data.scooterId != false){
    approved.value = true
  }
  console.log(data.scooterId)
}

// setInterval(() => {
//   checkRequest()
// }, 500)
</script>

<style scoped>
.marker {
  cursor: pointer;
}

.active {
  color: #111111;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.request-btn {
  padding: 10px;
  background-color: green;
  color: white;
  cursor: pointer;
}
</style>