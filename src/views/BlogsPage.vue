<template>
  <div class="class">
    <UserName />
    <div class="createe">
      <button class="create"  @click="router.push('create')">Создать запись</button>
    </div>
    <div v-for="item in table.slice().reverse()" :key="item.id" class="table">
      <MyBlogs 
        :item="item"
        @success="fetchData"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserName, MyBlogs } from '@/components';
import router from '@/router';
import { TableBlogs } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const table = ref<TableBlogs[]>([])
onMounted(() => {
  fetchData()
})

async function fetchData() {
  try {
    const data = {
      access_token: localStorage.getItem('token'),
      shift: 1,
      limit: 10,
    }

    const response = await axios.post('http://127.0.0.1:5000/blogs', data)
    table.value = response.data.blogs
  } finally {
    console.log('class');
  }
}
</script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.create {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.createe {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
