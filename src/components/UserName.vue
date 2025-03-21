<template>
  <div class="class-class">
    <div @click="logout" class="claass">
      <p style="cursor: pointer; ">{{ userName }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import {ref} from 'vue'
const userName = ref(localStorage.getItem('username'));

async function logout() {
  try {
    router.push('/')
    localStorage.setItem('token', '')
    localStorage.setItem('refreshToken', '')
    localStorage.setItem('username', '')
  }finally {
    console.log('success');
  }
}
</script>

<style scoped>

.class-class {
  display: flex;
  height: 70px;
  justify-content: right;
  margin-right: 30px;
  align-items: center;
}

.claass {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
</style>
