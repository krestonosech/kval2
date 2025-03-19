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
  color: white;
  font-family: sans-serif;
}
.class {
  background-color: black !important;
}

input {
  background-color: black;
  border: white 1px solid;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  transition: 0.7s;
}

button {
  padding: 10px;
  border: solid white 1px;
  background-color: black;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.7s;
}

textarea {
  padding: 10px;
  border: solid white 1px;
  background-color: black;
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
