<template>
  <router-view class="class"></router-view>
</template>

<script lang="ts" setup>
import axios from 'axios';

setInterval(async () => {
  const response = await axios.post('http://127.0.0.1:5000/refresh', {refresh_token: localStorage.getItem('refreshToken')})
  localStorage.setItem('token', response.data.access_token);
  localStorage.setItem('refreshToken', response.data.refresh_token);
}, 360000);
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  color: black;
  font-family: sans-serif;
}
.class {
  background-color: white !important;
}

input {
  background-color: white;
  border: rgb(160, 160, 160) 1px solid;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  padding: 10px;
  transition: 0.7s;
}

button {
  padding: 10px;
  border: solid white 1px;
  background-color: black;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: 0.7s;
  background-image: linear-gradient(135deg, #2c3e50, #3498db, #e74c3c);
  background-size: 200% 100%;
  background-position: 100% 0;
}

button:hover {
  background-position: 0 0;
}
textarea {
  padding: 10px;
  border: solid black 1px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.7s;
}

p {
  padding: 10px;
}

h3 {
  padding: 10px;
}

</style>
