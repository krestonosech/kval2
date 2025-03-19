<template>
  <div class="class">
    <h1>Регистрация</h1>
    <input type="text" v-model="username">
    <input type="password" v-model="password">
    <input type="password" v-model="confirmPassword">
    <button @click="register">Зарегистрироваться</button>
    <button @click="router.push('/login')">Авторизоваться</button>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

async function register() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  try {
    const data = {
      username: username.value,
      password: password.value
    }

    await axios.post('http://127.0.0.1:5000/register', data)
    router.push('/main')
  } finally {
    console.log('class');
  }
}
</script>

<style scoped>
.class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
}
</style>
