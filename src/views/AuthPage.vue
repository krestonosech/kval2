<template>
  <div class="class">
    <h1>Авторизация</h1>
    <input type="text" placeholder="Логин" v-model="username">
    <input type="password" placeholder="Пароль" v-model="password">
    <button @click="login">Авторизоваться</button>
    <p>Еще не зарегистрированы?</p>
    <button @click="router.push('/')">Зарегистрироваться</button>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';


const username = ref('')
const password = ref('')

async function login() {
  if (!username.value || !password.value ) return
  try {
    const data = {
      username: username.value,
      password: password.value
    }

    const token = await axios.post('http://127.0.0.1:5000/login', data)
    localStorage.setItem('token', token.data.access_token)
    localStorage.setItem('refreshToken', token.data.refresh_token)
    localStorage.setItem('username', username.value)
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
  height: 100vh;
  gap: 16px;
}
</style>
