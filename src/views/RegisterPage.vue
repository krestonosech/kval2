<template>
  <div class="class">
    <h1>Регистрация</h1>
    <input type="text" placeholder="Логин" v-model="username">
    <input type="password" placeholder="Пароль" v-model="password">
    <input type="password" placeholder="Подтвердите пароль" v-model="confirmPassword">
    <button @click="register">Зарегистрироваться</button>
    <p>Уже зарегистрированы?</p>
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
  if (password.value !== confirmPassword.value || !username.value || !password.value ) {
    alert('Passwords do not match')
    return
  }
  try {
    const data = {
      username: username.value,
      password: password.value
    }

    await axios.post('http://127.0.0.1:5000/register', data)
    const token = await axios.post('http://127.0.0.1:5000/login', data)
    localStorage.setItem('token', token.data.access_token)
    localStorage.setItem('refreshToken', token.data.refresh_token)
    localStorage.setItem('username', username.value)
    console.log(localStorage.getItem('username'));
    
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
